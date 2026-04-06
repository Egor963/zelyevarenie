import express from "express";
import cors from "cors";
import { existsSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";
import {
  addPlayer,
  castSpellBreakBuilt,
  castSpellSwap,
  castSpellTakeTable,
  castSpellTransformBuilt,
  craftRecipe,
  createEmptyGame,
  placeOnTable,
  RECIPES,
  scoreTrackMax,
  startGame,
} from "./game.js";
import type { GameState, PublicGameSnapshot } from "./types.js";

const PORT = Number(process.env.PORT) || 3001;
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

function publicSnapshot(game: GameState, forPlayerId: string | null): PublicGameSnapshot {
  const you = forPlayerId ? game.players.find((p) => p.id === forPlayerId) : undefined;
  const builtRecipes = game.builtRecipes.map((b) => {
    const owner = game.players.find((p) => p.id === b.ownerId);
    return {
      instanceId: b.instanceId,
      ownerId: b.ownerId,
      ownerName: owner?.name ?? "?",
      recipeDefId: b.recipeDefId,
      name: b.name,
      points: b.points,
      card: b.card,
      ingredients: b.ingredients,
    };
  });

  const curId = game.players[game.currentPlayerIndex]?.id ?? "";
  const cur = game.players[game.currentPlayerIndex];

  // Логирование для отладки
  const supremeElixir = RECIPES.find(r => r.id === "supreme_elixir");
  console.log('🎯 SERVER SNAPSHOT:', {
    totalRecipes: RECIPES.length,
    supremeElixir: supremeElixir ? {
      id: supremeElixir.id,
      name: supremeElixir.name,
      needsBuilt: supremeElixir.needsBuilt,
      needsBuiltLength: supremeElixir.needsBuilt?.length
    } : 'NOT FOUND'
  });

  return {
    phase: game.phase,
    hostId: game.hostId,
    players: game.players.map((p) => ({
      id: p.id,
      name: p.name,
      score: p.score,
      handCount: p.hand.length,
    })),
    table: game.table,
    builtRecipes,
    currentPlayerId: curId,
    deckRemaining: game.deck.length,
    mustPlayMainAction: game.phase === "playing" && !!cur && cur.hand.length > 0,
    recipeCatalog: RECIPES,
    winnerName: game.winnerName,
    scoreTrackMax: scoreTrackMax(game),
    yourHand: you?.hand,
  };
}

type Room = {
  game: GameState;
  socketToPlayer: Map<string, string>;
};

const rooms = new Map<string, Room>();

function randomRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)]!;
  return s;
}

function broadcastRoom(roomId: string, io: Server) {
  const room = rooms.get(roomId);
  if (!room) return;
  const { game, socketToPlayer } = room;
  for (const [socketId, playerId] of socketToPlayer) {
    const snap = publicSnapshot(game, playerId);
    io.to(socketId).emit("state", snap);
  }
}

app.get("/health", (_req, res) => res.send("ok"));

/** Собранный Vite: один хост и сайт, и Socket.io (продакшен / Render). */
const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDist = join(__dirname, "../../client/dist");
if (existsSync(clientDist)) {
  app.use(express.static(clientDist, { index: false }));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/socket.io")) return next();
    res.sendFile(join(clientDist, "index.html"));
  });
}

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: true },
});

io.on("connection", (socket) => {
  let joinedRoomId: string | null = null;
  let playerId: string | null = null;

  socket.on(
    "createRoom",
    (payload: { playerName: string }, ack?: (r: { ok: boolean; roomId?: string; error?: string }) => void) => {
      const name = (payload?.playerName ?? "").trim() || "Игрок";
      playerId = socket.id;
      let roomId = randomRoomCode();
      while (rooms.has(roomId)) roomId = randomRoomCode();

      const game = createEmptyGame(playerId, name);
      const room: Room = { game, socketToPlayer: new Map([[socket.id, playerId]]) };
      rooms.set(roomId, room);
      joinedRoomId = roomId;
      socket.join(roomId);
      socket.emit("state", publicSnapshot(game, playerId));
      ack?.({ ok: true, roomId });
    }
  );

  socket.on(
    "joinRoom",
    (
      payload: { roomId: string; playerName: string },
      ack?: (r: { ok: boolean; error?: string; roomId?: string }) => void
    ) => {
      console.log('🎯 JOIN ROOM REQUEST:', { playerId: socket.id, payload });
      
      const code = (payload?.roomId ?? "").trim().toUpperCase();
      const name = (payload?.playerName ?? "").trim() || "Игрок";
      const room = rooms.get(code);
      console.log('🎯 ROOM LOOKUP:', { code, roomExists: !!room, totalRooms: rooms.size });
      
      if (!room) {
        console.log('🎯 ROOM NOT FOUND - sending error');
        ack?.({ ok: false, error: "Комната не найдена" });
        return;
      }
      playerId = socket.id;
      const err = addPlayer(room.game, playerId, name);
      console.log('🎯 ADD PLAYER RESULT:', { error: err, gamePlayers: room.game.players.length });
      
      if (err) {
        console.log('🎯 ADD PLAYER FAILED - sending error');
        ack?.({ ok: false, error: err });
        return;
      }
      room.socketToPlayer.set(socket.id, playerId);
      joinedRoomId = code;
      socket.join(code);
      broadcastRoom(code, io);
      console.log('🎯 JOIN ROOM SUCCESS - broadcasting and sending ack');
      ack?.({ ok: true, roomId: code }); // ВАЖНО: возвращаем roomId
    }
  );

  socket.on("startGame", (ack?: (r: { ok: boolean; error?: string }) => void) => {
    if (!joinedRoomId || !playerId) return ack?.({ ok: false, error: "Не в комнате" });
    const room = rooms.get(joinedRoomId);
    if (!room) return ack?.({ ok: false, error: "Комната пропала" });
    const err = startGame(room.game, playerId);
    if (err) return ack?.({ ok: false, error: err });
    broadcastRoom(joinedRoomId, io);
    ack?.({ ok: true });
  });

  socket.on(
    "placeOnTable",
    (payload: { handIndex: number }, ack?: (r: { ok: boolean; error?: string }) => void) => {
      if (!joinedRoomId || !playerId) return ack?.({ ok: false, error: "Не в комнате" });
      const room = rooms.get(joinedRoomId);
      if (!room) return ack?.({ ok: false, error: "Комната пропала" });
      const err = placeOnTable(room.game, playerId, payload?.handIndex ?? -1);
      if (err) return ack?.({ ok: false, error: err });
      broadcastRoom(joinedRoomId, io);
      ack?.({ ok: true });
    }
  );

  socket.on(
    "craftRecipe",
    (
      payload: { handIndex: number; tableCardIds: string[]; builtInstanceIds: string[] },
      ack?: (r: { ok: boolean; error?: string }) => void
    ) => {
      console.log('🎯 CLIENT CRAFT REQUEST:', { playerId, payload });
      
      if (!joinedRoomId || !playerId) return ack?.({ ok: false, error: "Не в комнате" });
      const room = rooms.get(joinedRoomId);
      if (!room) return ack?.({ ok: false, error: "Комната пропала" });
      
      try {
        const err = craftRecipe(
          room.game,
          playerId,
          payload?.handIndex ?? -1,
          payload?.tableCardIds ?? [],
          payload?.builtInstanceIds ?? []
        );
        
        console.log('🎯 CRAFT RESULT:', { error: err, gameBuiltRecipes: room.game.builtRecipes.length });
        
        if (err) return ack?.({ ok: false, error: err });
        
        broadcastRoom(joinedRoomId, io);
        ack?.({ ok: true });
      } catch (error) {
        console.error('🎯 CRAFT ERROR:', error);
        ack?.({ ok: false, error: "Внутренняя ошибка сервера" });
      }
    }
  );

  socket.on(
    "castSpellTakeTable",
    (
      payload: { spellHandIndex: number; tableCardId: string },
      ack?: (r: { ok: boolean; error?: string }) => void
    ) => {
      if (!joinedRoomId || !playerId) return ack?.({ ok: false, error: "Не в комнате" });
      const room = rooms.get(joinedRoomId);
      if (!room) return ack?.({ ok: false, error: "Комната пропала" });
      const err = castSpellTakeTable(room.game, playerId, payload?.spellHandIndex ?? -1, payload?.tableCardId ?? "");
      if (err) return ack?.({ ok: false, error: err });
      broadcastRoom(joinedRoomId, io);
      ack?.({ ok: true });
    }
  );

  socket.on(
    "castSpellBreakBuilt",
    (
      payload: { spellHandIndex: number; builtInstanceId: string; chosenCardId?: string },
      ack?: (r: { ok: boolean; error?: string }) => void
    ) => {
      console.log('🎯 CLIENT BREAK BUILT REQUEST:', { playerId, payload });
      
      if (!joinedRoomId || !playerId) return ack?.({ ok: false, error: "Не в комнате" });
      const room = rooms.get(joinedRoomId);
      if (!room) return ack?.({ ok: false, error: "Комната пропала" });
      const err = castSpellBreakBuilt(
        room.game, 
        playerId, 
        payload?.spellHandIndex ?? -1, 
        payload?.builtInstanceId ?? "",
        payload?.chosenCardId
      );
      if (err) return ack?.({ ok: false, error: err });
      broadcastRoom(joinedRoomId, io);
      ack?.({ ok: true });
    }
  );

  socket.on(
    "castSpellSwap",
    (
      payload: { spellHandIndex: number; tableCardId: string; otherHandIndex: number },
      ack?: (r: { ok: boolean; error?: string }) => void
    ) => {
      if (!joinedRoomId || !playerId) return ack?.({ ok: false, error: "Не в комнате" });
      const room = rooms.get(joinedRoomId);
      if (!room) return ack?.({ ok: false, error: "Комната пропала" });
      const err = castSpellSwap(
        room.game,
        playerId,
        payload?.spellHandIndex ?? -1,
        payload?.tableCardId ?? "",
        payload?.otherHandIndex ?? -1
      );
      if (err) return ack?.({ ok: false, error: err });
      broadcastRoom(joinedRoomId, io);
      ack?.({ ok: true });
    }
  );

  socket.on(
    "castSpellTransformBuilt",
    (
      payload: { spellHandIndex: number; builtInstanceId: string; tableCardId: string },
      ack?: (r: { ok: boolean; error?: string }) => void
    ) => {
      if (!joinedRoomId || !playerId) return ack?.({ ok: false, error: "Не в комнате" });
      const room = rooms.get(joinedRoomId);
      if (!room) return ack?.({ ok: false, error: "Комната пропала" });
      const err = castSpellTransformBuilt(
        room.game, 
        playerId, 
        payload?.spellHandIndex ?? -1, 
        payload?.builtInstanceId ?? "",
        payload?.tableCardId ?? ""
      );
      if (err) return ack?.({ ok: false, error: err });
      broadcastRoom(joinedRoomId, io);
      ack?.({ ok: true });
    }
  );

  socket.on("disconnect", () => {
    if (!joinedRoomId) return;
    const room = rooms.get(joinedRoomId);
    if (!room) return;
    room.socketToPlayer.delete(socket.id);
    if (room.socketToPlayer.size === 0) rooms.delete(joinedRoomId);
    else broadcastRoom(joinedRoomId, io);
  });
});

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Сервер слушает порт ${PORT}`);
});

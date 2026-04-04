import { randomUUID } from "node:crypto";
import type { 
  ElementId, 
  GameCard, 
  CardFace, 
  SpellKind,
  GameState,
  PlayerState,
  BuiltRecipe
} from "./types.js";
import { getRecipeDef, RECIPES } from "./recipes.js";

const ELEMENTS: ElementId[] = [
  "огонь",
  "вода",
  "земля",
  "воздух",
  "свет",
  "тьма",
  "жизнь",
  "металл",
];

const START_HAND = 4;
const START_TABLE = 4;

export { RECIPES };

function randomElement(): ElementId {
  return ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)]!;
}

function makeCard(face: GameCard["face"], bottomElement: ElementId): GameCard {
  return { id: randomUUID(), bottomElement, face };
}

/** Колода: реальные 76 карточек из папки /client/public/cards/ */
export function makeDeck(): GameCard[] {
  const d: GameCard[] = [];
  
  // Реальные ID карточек из папки /client/public/cards/
  const cardIds = [
    'page01_card01', 'page01_card02', 'page01_card03', 'page01_card04', 'page01_card05', 'page01_card06', 'page01_card07', 'page01_card08', 'page01_card09',
    'page02_card01', 'page02_card02', 'page02_card03', 'page02_card04', 'page02_card05', 'page02_card06', 'page02_card07', 'page02_card08', 'page02_card09',
    'page03_card01', 'page03_card02', 'page03_card03', 'page03_card04', 'page03_card05', 'page03_card06', 'page03_card07', 'page03_card08', 'page03_card09',
    'page04_card01', 'page04_card02', 'page04_card03', 'page04_card04', 'page04_card05', 'page04_card06', 'page04_card07', 'page04_card08', 'page04_card09',
    'page05_card01', 'page05_card02', 'page05_card03', 'page05_card04', 'page05_card05', 'page05_card06', 'page05_card07', 'page05_card08', 'page05_card09',
    'page06_card01', 'page06_card02', 'page06_card03', 'page06_card04', 'page06_card05', 'page06_card06', 'page06_card07', 'page06_card08', 'page06_card09',
    'page07_card01', 'page07_card02', 'page07_card03', 'page07_card04', 'page07_card05', 'page07_card06', 'page07_card07', 'page07_card08', 'page07_card09',
    'page08_card01', 'page08_card02', 'page08_card03', 'page08_card04', 'page08_card05', 'page08_card06', 'page08_card07', 'page08_card08', 'page08_card09',
    'page09_card01', 'page09_card02', 'page09_card03', 'page09_card04'
  ];

  // Маппинг карточек на игровые данные
  const cardMappings: Record<string, { topType: 'recipe' | 'spell'; topContent: string; bottomElement: string; points?: number }> = {
    // Page 1
    'page01_card01': { topType: 'recipe', topContent: 'Туман', bottomElement: 'огонь', points: 3 },
    'page01_card02': { topType: 'recipe', topContent: 'Туман', bottomElement: 'вода', points: 3 },
    'page01_card03': { topType: 'recipe', topContent: 'Ил', bottomElement: 'земля', points: 3 },
    'page01_card04': { topType: 'recipe', topContent: 'Ил', bottomElement: 'вода', points: 3 },
    'page01_card05': { topType: 'recipe', topContent: 'Искра', bottomElement: 'металл', points: 4 },
    'page01_card06': { topType: 'recipe', topContent: 'Искра', bottomElement: 'огонь', points: 4 },
    'page01_card07': { topType: 'recipe', topContent: 'Рассвет', bottomElement: 'свет', points: 4 },
    'page01_card08': { topType: 'recipe', topContent: 'Рассвет', bottomElement: 'воздух', points: 4 },
    'page01_card09': { topType: 'spell', topContent: 'Взять со стола', bottomElement: 'тьма' },
    
    // Page 2
    'page02_card01': { topType: 'spell', topContent: 'Взять со стола', bottomElement: 'жизнь' },
    'page02_card02': { topType: 'spell', topContent: 'Взять со стола', bottomElement: 'металл' },
    'page02_card03': { topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'огонь' },
    'page02_card04': { topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'вода' },
    'page02_card05': { topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'земля' },
    'page02_card06': { topType: 'spell', topContent: 'Обмен', bottomElement: 'воздух' },
    'page02_card07': { topType: 'spell', topContent: 'Обмен', bottomElement: 'свет' },
    'page02_card08': { topType: 'spell', topContent: 'Обмен', bottomElement: 'тьма' },
    'page02_card09': { topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'тьма', points: 5 },
    
    // Page 3
    'page03_card01': { topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'жизнь', points: 5 },
    'page03_card02': { topType: 'recipe', topContent: 'Буря', bottomElement: 'воздух', points: 6 },
    'page03_card03': { topType: 'recipe', topContent: 'Буря', bottomElement: 'вода', points: 6 },
    'page03_card04': { topType: 'recipe', topContent: 'Буря', bottomElement: 'металл', points: 6 },
    'page03_card05': { topType: 'recipe', topContent: 'Квинтэссенция', bottomElement: 'огонь', points: 8 },
    'page03_card06': { topType: 'recipe', topContent: 'Квинтэссенция', bottomElement: 'вода', points: 8 },
    'page03_card07': { topType: 'recipe', topContent: 'Квинтэссенция', bottomElement: 'земля', points: 8 },
    'page03_card08': { topType: 'recipe', topContent: 'Квинтэссенция', bottomElement: 'воздух', points: 8 },
    'page03_card09': { topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'земля', points: 6 },
    
    // Page 4
    'page04_card01': { topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'огонь' },
    'page04_card02': { topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'вода' },
    'page04_card03': { topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'жизнь', points: 10 },
    'page04_card04': { topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'тьма' },
    'page04_card05': { topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'свет' },
    'page04_card06': { topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'металл' },
    'page04_card07': { topType: 'spell', topContent: 'Взять со стола', bottomElement: 'земля' },
    'page04_card08': { topType: 'spell', topContent: 'Взять со стола', bottomElement: 'воздух' },
    'page04_card09': { topType: 'spell', topContent: 'Взять со стола', bottomElement: 'свет' },
    
    // Page 5
    'page05_card01': { topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'жизнь' },
    'page05_card02': { topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'металл' },
    'page05_card03': { topType: 'spell', topContent: 'Обмен', bottomElement: 'огонь' },
    'page05_card04': { topType: 'spell', topContent: 'Обмен', bottomElement: 'вода' },
    'page05_card05': { topType: 'recipe', topContent: 'Туман', bottomElement: 'воздух' },
    'page05_card06': { topType: 'recipe', topContent: 'Туман', bottomElement: 'свет' },
    'page05_card07': { topType: 'recipe', topContent: 'Ил', bottomElement: 'тьма' },
    'page05_card08': { topType: 'recipe', topContent: 'Ил', bottomElement: 'жизнь' },
    'page05_card09': { topType: 'recipe', topContent: 'Искра', bottomElement: 'воздух' },
    
    // Page 6
    'page06_card01': { topType: 'recipe', topContent: 'Искра', bottomElement: 'свет' },
    'page06_card02': { topType: 'recipe', topContent: 'Искра', bottomElement: 'тьма' },
    'page06_card03': { topType: 'recipe', topContent: 'Рассвет', bottomElement: 'огонь' },
    'page06_card04': { topType: 'recipe', topContent: 'Рассвет', bottomElement: 'вода' },
    'page06_card05': { topType: 'recipe', topContent: 'Рассвет', bottomElement: 'земля' },
    'page06_card06': { topType: 'recipe', topContent: 'Рассвет', bottomElement: 'металл' },
    'page06_card07': { topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'огонь' },
    'page06_card08': { topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'вода' },
    'page06_card09': { topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'земля' },
    
    // Page 7
    'page07_card01': { topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'воздух' },
    'page07_card02': { topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'свет' },
    'page07_card03': { topType: 'recipe', topContent: 'Буря', bottomElement: 'огонь' },
    'page07_card04': { topType: 'recipe', topContent: 'Буря', bottomElement: 'земля' },
    'page07_card05': { topType: 'recipe', topContent: 'Буря', bottomElement: 'тьма' },
    'page07_card06': { topType: 'recipe', topContent: 'Буря', bottomElement: 'жизнь' },
    'page07_card07': { topType: 'recipe', topContent: 'Буря', bottomElement: 'свет' },
    'page07_card08': { topType: 'recipe', topContent: 'Буря', bottomElement: 'металл' },
    'page07_card09': { topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'воздух' },
    
    // Page 8
    'page08_card01': { topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'свет' },
    'page08_card02': { topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'тьма' },
    'page08_card03': { topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'жизнь' },
    'page08_card04': { topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'металл' },
    'page08_card05': { topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'огонь' },
    'page08_card06': { topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'вода' },
    'page08_card07': { topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'земля' },
    'page08_card08': { topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'воздух' },
    'page08_card09': { topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'тьма' },
    
    // Page 9
    'page09_card01': { topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'свет' },
    'page09_card02': { topType: 'spell', topContent: 'Обмен', bottomElement: 'жизнь' },
    'page09_card03': { topType: 'spell', topContent: 'Обмен', bottomElement: 'металл' },
    'page09_card04': { topType: 'spell', topContent: 'Обмен', bottomElement: 'земля' }
  };

  // Создаем карточки с реальными ID
  for (const cardId of cardIds) {
    const mapping = cardMappings[cardId];
    if (!mapping) {
      console.warn(`No mapping found for card: ${cardId}`);
      continue;
    }

    let face: CardFace;
    if (mapping.topType === 'recipe') {
      // Находим соответствующий рецепт
      const recipe = RECIPES.find(r => r.name === mapping.topContent);
      if (recipe) {
        face = { kind: 'recipe', defId: recipe.id };
      } else {
        face = { kind: 'recipe', defId: mapping.topContent.toLowerCase().replace(/\s+/g, '_') };
      }
    } else {
      // Заклинания
      let spell: SpellKind;
      switch (mapping.topContent) {
        case 'Взять со стола':
          spell = 'take_table';
          break;
        case 'Разобрать рецепт':
          spell = 'break_built';
          break;
        case 'Обмен':
          spell = 'swap_elements';
          break;
        default:
          spell = 'take_table';
      }
      face = { kind: 'spell', spell };
    }

    const gameCard: GameCard = {
      id: cardId, // Используем реальный ID из папки cards!
      bottomElement: mapping.bottomElement as ElementId,
      face
    };

    d.push(gameCard);
  }

  return d;
}

function pickBottomForRecipe(r: (typeof RECIPES)[number], i: number): ElementId {
  const keys = Object.keys(r.needs) as ElementId[];
  if (keys.length) return keys[i % keys.length]!;
  return randomElement();
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createEmptyGame(hostId: string, hostName: string): GameState {
  return {
    phase: "lobby",
    hostId,
    players: [{ id: hostId, name: hostName, hand: [], score: 0 }],
    deck: [],
    discard: [],
    table: [],
    builtRecipes: [],
    seenElements: new Set(),
    currentPlayerIndex: 0,
  };
}

export function addPlayer(game: GameState, id: string, name: string): string | null {
  if (game.phase !== "lobby") return "Игра уже началась";
  if (game.players.length >= 6) return "Максимум 6 игроков";
  if (game.players.some((p) => p.id === id)) return "Вы уже в комнате";
  game.players.push({ id, name, hand: [], score: 0 });
  return null;
}

function currentPlayer(game: GameState): PlayerState {
  return game.players[game.currentPlayerIndex]!;
}

export function scoreTrackMax(game: GameState): number {
  const scores = game.players.map((p) => p.score);
  const m = scores.length ? Math.max(...scores) : 0;
  return Math.max(36, m + 8, Math.ceil(m / 12) * 12);
}

export function startGame(game: GameState, requesterId: string): string | null {
  if (game.phase !== "lobby") return "Игра уже запущена";
  if (requesterId !== game.hostId) return "Только хост может начать";
  if (game.players.length < 2) return "Нужно минимум 2 игрока";

  const deck = shuffle(makeDeck());
  const table: GameCard[] = [];
  for (let i = 0; i < START_TABLE; i++) table.push(deck.pop()!);

  for (const p of game.players) {
    p.hand = [];
    p.score = 0;
    for (let i = 0; i < START_HAND; i++) p.hand.push(deck.pop()!);
  }

  game.deck = deck;
  game.discard = [];
  game.table = table;
  game.builtRecipes = [];
  game.seenElements = new Set();
  for (const c of table) game.seenElements.add(c.bottomElement);

  game.phase = "playing";
  game.currentPlayerIndex = Math.floor(Math.random() * game.players.length);
  game.winnerName = undefined;

  beginTurn(game);
  return null;
}

/** Добор до 5 и ожидание основного действия (выложить элемент или собрать рецепт). Заклинания не завершают ход. */
function beginTurn(game: GameState) {
  if (game.phase !== "playing") return;
  skipEmptyPlayers(game);
  if (game.phase !== "playing") return;
  const p = currentPlayer(game);
  while (p.hand.length < 5 && game.deck.length > 0) {
    p.hand.push(game.deck.pop()!);
  }
}

function finishMainAction(game: GameState) {
  checkEnd(game);
  if (game.phase === "playing") nextTurn(game);
}

function skipEmptyPlayers(game: GameState) {
  if (game.deck.length > 0) return;
  const n = game.players.length;
  let steps = 0;
  while (steps < n) {
    const p = currentPlayer(game);
    if (p.hand.length > 0) return;
    game.currentPlayerIndex = (game.currentPlayerIndex + 1) % n;
    steps++;
  }
  checkEnd(game);
}

function checkEnd(game: GameState) {
  if (game.phase !== "playing") return;
  if (game.deck.length > 0) return;
  if (!game.players.every((p) => p.hand.length === 0)) return;
  const sorted = [...game.players].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  const top = sorted[0]?.score ?? 0;
  const winners = sorted.filter((p) => p.score === top);
  game.phase = "ended";
  game.winnerName = winners.map((w) => w.name).join(" · ");
}

function nextTurn(game: GameState) {
  game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
  beginTurn(game);
  checkEnd(game);
}

/** Если рука опустела до основного действия — передаём ход (добор только в начале следующего хода). */
function afterSpell(game: GameState) {
  checkEnd(game);
  if (game.phase !== "playing") return;
  if (currentPlayer(game).hand.length === 0) nextTurn(game);
}

function applyHalfPointsToOwners(game: GameState, recipePoints: number, usedBuilt: BuiltRecipe[], actorId: string) {
  const bonus = Math.floor(recipePoints / 2);
  if (bonus <= 0) return;
  const owners = new Set<string>();
  for (const b of usedBuilt) {
    if (b.ownerId !== actorId) owners.add(b.ownerId);
  }
  for (const oid of owners) {
    const pl = game.players.find((p) => p.id === oid);
    if (pl) pl.score += bonus;
  }
}

export function placeOnTable(game: GameState, playerId: string, handIndex: number): string | null {
  if (game.phase !== "playing") return "Игра не идёт";
  const p = currentPlayer(game);
  if (p.id !== playerId) return "Не ваш ход";
  if (handIndex < 0 || handIndex >= p.hand.length) return "Нет такой карты";

  const [removed] = p.hand.splice(handIndex, 1);
  game.table.push(removed!);

  if (!game.seenElements.has(removed!.bottomElement)) {
    game.seenElements.add(removed!.bottomElement);
    p.score += 1;
  }

  finishMainAction(game);
  return null;
}

function validateTableSelection(
  table: GameCard[],
  tableCardIds: string[],
  needs: Partial<Record<ElementId, number>>
): GameCard[] | null {
  const byId = new Map(table.map((c) => [c.id, c] as const));
  const picked: GameCard[] = [];
  for (const id of tableCardIds) {
    const c = byId.get(id);
    if (!c) return null;
    picked.push(c);
  }
  const counts = new Map<ElementId, number>();
  for (const c of picked) counts.set(c.bottomElement, (counts.get(c.bottomElement) ?? 0) + 1);
  for (const [el, need] of Object.entries(needs) as [ElementId, number][]) {
    if ((counts.get(el) ?? 0) !== need) return null;
  }
  if (picked.length !== Object.values(needs).reduce((a, b) => a + b, 0)) return null;
  return picked;
}

function validateBuiltSelection(
  built: BuiltRecipe[],
  selectedIds: string[],
  needsBuilt: { recipeDefId: string; count: number }[]
): BuiltRecipe[] | null {
  const selected = selectedIds.map((id) => built.find((b) => b.instanceId === id));
  if (selected.some((x) => !x)) return null;
  const needFlat = needsBuilt.flatMap((n) => Array.from({ length: n.count }, () => n.recipeDefId)).sort();
  const got = selected.map((b) => b!.recipeDefId).sort();
  if (needFlat.length !== got.length) return null;
  for (let i = 0; i < got.length; i++) if (got[i] !== needFlat[i]) return null;
  return selected as BuiltRecipe[];
}

export function craftRecipe(
  game: GameState,
  playerId: string,
  handIndex: number,
  tableCardIds: string[],
  builtInstanceIds: string[]
): string | null {
  if (game.phase !== "playing") return "Игра не идёт";
  const p = currentPlayer(game);
  if (p.id !== playerId) return "Не ваш ход";
  if (handIndex < 0 || handIndex >= p.hand.length) return "Нет такой карты";

  const handCard = p.hand[handIndex]!;
  if (handCard.face.kind !== "recipe") return "Это не карта рецепта";

  const def = getRecipeDef(handCard.face.defId);
  if (!def) return "Неизвестный рецепт";

  const needsBuilt = def.needsBuilt ?? [];
  const elementalPick = validateTableSelection(game.table, tableCardIds, def.needs);
  if (!elementalPick) return "Неверный набор карт со стола";

  let usedBuilt: BuiltRecipe[] = [];
  if (needsBuilt.length) {
    const v = validateBuiltSelection(game.builtRecipes, builtInstanceIds, needsBuilt);
    if (!v) return "Неверный набор собранных рецептов";
    usedBuilt = v;
  } else if (builtInstanceIds.length) {
    return "Этот рецепт не требует собранных карт";
  }

  const isComplex = needsBuilt.length > 0;
  const removeTableIds = new Set(elementalPick.map((c) => c.id));
  game.table = game.table.filter((c) => !removeTableIds.has(c.id));

  const removeBuiltIds = new Set(usedBuilt.map((b) => b.instanceId));
  game.builtRecipes = game.builtRecipes.filter((b) => !removeBuiltIds.has(b.instanceId));

  if (isComplex) {
    for (const c of elementalPick) game.table.push(c);
    for (const b of usedBuilt) for (const ing of b.ingredients) game.table.push(ing);
  }

  p.hand.splice(handIndex, 1);

  const instanceId = randomUUID();
  const newBuilt: BuiltRecipe = {
    instanceId,
    ownerId: p.id,
    card: handCard,
    recipeDefId: def.id,
    points: def.points,
    name: def.name,
    ingredients: isComplex ? [] : [...elementalPick],
  };
  game.builtRecipes.push(newBuilt);

  p.score += def.points;
  applyHalfPointsToOwners(game, def.points, usedBuilt, p.id);

  finishMainAction(game);
  return null;
}

export function castSpellTakeTable(
  game: GameState,
  playerId: string,
  spellHandIndex: number,
  tableCardId: string
): string | null {
  if (game.phase !== "playing") return "Игра не идёт";
  const p = currentPlayer(game);
  if (p.id !== playerId) return "Не ваш ход";
  const sc = p.hand[spellHandIndex];
  if (!sc || sc.face.kind !== "spell" || sc.face.spell !== "take_table") return "Нужна карта «Взять со стола»";
  const idx = game.table.findIndex((c) => c.id === tableCardId);
  if (idx < 0) return "На столе нет этой карты";

  const [fromTable] = game.table.splice(idx, 1);
  p.hand.splice(spellHandIndex, 1);
  game.discard.push(sc);
  p.hand.push(fromTable!);

  afterSpell(game);
  return null;
}

export function castSpellBreakBuilt(
  game: GameState,
  playerId: string,
  spellHandIndex: number,
  builtInstanceId: string
): string | null {
  if (game.phase !== "playing") return "Игра не идёт";
  const p = currentPlayer(game);
  if (p.id !== playerId) return "Не ваш ход";
  const sc = p.hand[spellHandIndex];
  if (!sc || sc.face.kind !== "spell" || sc.face.spell !== "break_built") return "Нужна карта «Разобрать рецепт»";

  const bi = game.builtRecipes.find((b) => b.instanceId === builtInstanceId);
  if (!bi) return "Нет такого рецепта";
  if (bi.ownerId !== playerId) return "Можно разобрать только свой рецепт";

  p.hand.splice(spellHandIndex, 1);
  game.discard.push(sc);
  game.builtRecipes = game.builtRecipes.filter((b) => b.instanceId !== builtInstanceId);
  for (const ing of bi.ingredients) game.table.push(ing);

  afterSpell(game);
  return null;
}

export function castSpellSwap(
  game: GameState,
  playerId: string,
  spellHandIndex: number,
  tableCardId: string,
  otherHandIndex: number
): string | null {
  if (game.phase !== "playing") return "Игра не идёт";
  const p = currentPlayer(game);
  if (p.id !== playerId) return "Не ваш ход";
  const sc = p.hand[spellHandIndex];
  if (!sc || sc.face.kind !== "spell" || sc.face.spell !== "swap_elements") return "Нужна карта «Обмен»";
  if (otherHandIndex === spellHandIndex) return "Выберите другую карту в руке";
  const hc = p.hand[otherHandIndex];
  if (!hc) return "Нет такой карты в руке";

  const ti = game.table.findIndex((c) => c.id === tableCardId);
  if (ti < 0) return "На столе нет этой карты";

  const tableCard = game.table[ti]!;
  p.hand[otherHandIndex] = tableCard;
  game.table[ti] = hc;
  p.hand.splice(spellHandIndex, 1);
  game.discard.push(sc);

  afterSpell(game);
  return null;
}

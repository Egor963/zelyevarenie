import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import type {
  ElementId,
  GameCard,
  PublicBuiltRecipe,
  PublicGameSnapshot,
  PublicPlayer,
  RecipeDef,
  SpellKind,
} from "./types";
import { getCardById, CARDS } from "./data/cards";

function socketUrl() {
  const fixed = import.meta.env.VITE_SOCKET_URL;
  if (fixed) return fixed;
  if (import.meta.env.DEV) {
    if (typeof window !== "undefined") {
      return `${window.location.protocol}//${window.location.hostname}:3001`;
    }
    return "http://localhost:3001";
  }
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

function spellTitle(kind: SpellKind): string {
  switch (kind) {
    case "take_table":
      return "Взять со стола";
    case "break_built":
      return "Разобрать свой рецепт";
    case "swap_elements":
      return "Обмен с рукой";
    default:
      return kind;
  }
}

function recipeByCatalog(catalog: RecipeDef[], defId: string): RecipeDef | undefined {
  return catalog.find((r) => r.id === defId);
}

function ElementBadge({ el }: { el: ElementId }) {
  return <span className={`element-chip ${el}`}>{el}</span>;
}

function ScoreTrack({ players, max }: { players: PublicPlayer[]; max: number }) {
  const m = Math.max(1, max);
  return (
    <div className="score-track">
      {players.map((p) => (
        <div key={p.id} className="score-lane">
          <span className="score-name" title={p.name}>
            {p.name}
          </span>
          <div className="score-rail-wrap">
            <div className="score-rail" />
            <div
              className="score-token"
              style={{ left: `${Math.min(100, (p.score / m) * 100)}%` }}
              title={`${p.score} очков`}
            />
            <div className="score-end-labels">
              <span>0</span>
              <span>{m}</span>
            </div>
          </div>
          <span className="score-now" title="Текущие очки">
            {p.score}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const socketRef = useRef<Socket | null>(null);
  const [snap, setSnap] = useState<PublicGameSnapshot | null>(null);
  const [playerName, setPlayerName] = useState(() => {
    try {
      return localStorage.getItem("zelye_name") ?? "";
    } catch {
      return "";
    }
  });
  const [joinCode, setJoinCode] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);

  const [craftHandIndex, setCraftHandIndex] = useState<number | null>(null);
  const [craftTableIds, setCraftTableIds] = useState<string[]>([]);
  const [craftBuiltIds, setCraftBuiltIds] = useState<string[]>([]);

  const [spellTakeIdx, setSpellTakeIdx] = useState<number | null>(null);
  const [spellBreakIdx, setSpellBreakIdx] = useState<number | null>(null);
  const [spellSwap, setSpellSwap] = useState<{ spellIdx: number; tableId: string | null } | null>(null);

  const clearModes = useCallback(() => {
    setCraftHandIndex(null);
    setCraftTableIds([]);
    setCraftBuiltIds([]);
    setSpellTakeIdx(null);
    setSpellBreakIdx(null);
    setSpellSwap(null);
  }, []);

  useEffect(() => {
    const s = io(socketUrl(), { transports: ["websocket", "polling"] });
    socketRef.current = s;
    if (s.connected) setSocketConnected(true);
    s.on("connect", () => {
      setSocketConnected(true);
      setError(null);
    });
    s.on("disconnect", () => setSocketConnected(false));
    s.on("state", (payload: PublicGameSnapshot) => {
      setSnap(payload);
      setError(null);
    });
    s.on("connect_error", () => {
      setSocketConnected(false);
      setError("Нет связи с сервером. Запустите сервер: в папке проекта выполните npm run dev (порт 3001).");
    });
    return () => {
      s.disconnect();
      socketRef.current = null;
    };
  }, []);

  const persistName = useCallback(() => {
    try {
      localStorage.setItem("zelye_name", playerName.trim());
    } catch {
      /* ignore */
    }
  }, [playerName]);

  const createRoom = () => {
    persistName();
    const name = playerName.trim() || "Игрок";
    socketRef.current?.emit("createRoom", { playerName: name }, (r: { ok: boolean; roomId?: string; error?: string }) => {
      if (!r.ok) setError(r.error ?? "Ошибка");
      else if (r.roomId) setRoomId(r.roomId);
    });
  };

  const joinRoom = () => {
    persistName();
    const name = playerName.trim() || "Игрок";
    const code = joinCode.trim().toUpperCase();
    socketRef.current?.emit("joinRoom", { roomId: code, playerName: name }, (r: { ok: boolean; error?: string }) => {
      if (!r.ok) setError(r.error ?? "Не удалось войти");
      else setRoomId(code);
    });
  };

  const startGame = () => {
    socketRef.current?.emit("startGame", (r: { ok: boolean; error?: string }) => {
      if (!r.ok) setError(r.error ?? "Ошибка");
    });
  };

  const place = (handIndex: number) => {
    clearModes();
    console.log('Placing card at index:', handIndex);
    socketRef.current?.emit("placeOnTable", { handIndex }, (r: { ok: boolean; error?: string }) => {
      if (!r.ok) setError(r.error ?? "Ошибка");
      else console.log('Card placed successfully');
    });
  };

  const submitCraft = () => {
    console.log('🎯 SUBMIT CRAFT START:', { craftHandIndex, craftDef });
    
    if (craftHandIndex === null) return;
    
    // Автоматическая проверка и сбор нужных элементов со стола
    if (craftDef) {
      console.log('🎯 CRAFT DEF FOUND:', craftDef);
      
      const neededElements = Object.entries(craftDef.needs);
      const tableElements = snap?.table || [];
      const availableElements: Record<string, number> = {};
      
      // Считаем доступные элементы на столе
      tableElements.forEach(card => {
        console.log('🎯 TABLE CARD:', card);
        if (card.face.kind === 'element') {
          const elementCard = card.face as { kind: 'element'; element: string };
          availableElements[elementCard.element] = (availableElements[elementCard.element] || 0) + 1;
        }
      });
      
      console.log('🎯 AVAILABLE ELEMENTS:', availableElements);
      console.log('🎯 NEEDED ELEMENTS:', neededElements);
      
      // Проверяем достаточно ли элементов
      const missingElements: string[] = [];
      neededElements.forEach(([element, count]) => {
        if ((availableElements[element] || 0) < count) {
          missingElements.push(element);
        }
      });
      
      if (missingElements.length > 0) {
        console.log('🎯 MISSING ELEMENTS:', missingElements);
        setError(`Недостаточно элементов на столе: ${missingElements.join(', ')}`);
        return;
      }
      
      // Автоматически собираем нужные элементы
      const autoSelectedTableIds: string[] = [];
      neededElements.forEach(([element, count]) => {
        let collected = 0;
        tableElements.forEach(card => {
          if (card.face.kind === 'element') {
            const elementCard = card.face as { kind: 'element'; element: string };
            if (elementCard.element === element && collected < count) {
              autoSelectedTableIds.push(card.id);
              collected++;
            }
          }
        });
      });
      
      console.log('🎯 AUTO SELECTED IDS:', autoSelectedTableIds);
      console.log('🎯 EMITTING CRAFT REQUEST:', { handIndex: craftHandIndex, tableCardIds: autoSelectedTableIds, builtInstanceIds: craftBuiltIds });
      
      socketRef.current?.emit(
        "craftRecipe",
        { handIndex: craftHandIndex, tableCardIds: autoSelectedTableIds, builtInstanceIds: craftBuiltIds },
        (r: { ok: boolean; error?: string }) => {
          console.log('🎯 CRAFT RESPONSE:', r);
          if (!r.ok) setError(r.error ?? "Ошибка");
          else {
            console.log('Craft successful');
            clearModes();
          }
        }
      );
    } else {
      console.log('🎯 NO CRAFT DEF FOUND!');
      setError('Рецепт не найден');
    }
  };

  const onTableClick = (cardId: string) => {
    if (craftHandIndex !== null && snap) {
      setCraftTableIds((prev) => (prev.includes(cardId) ? prev.filter((x) => x !== cardId) : [...prev, cardId]));
      return;
    }
    if (spellTakeIdx !== null) {
      socketRef.current?.emit(
        "castSpellTakeTable",
        { spellHandIndex: spellTakeIdx, tableCardId: cardId },
        (r: { ok: boolean; error?: string }) => {
          if (!r.ok) setError(r.error ?? "Ошибка");
          else setSpellTakeIdx(null);
        }
      );
      return;
    }
    if (spellSwap && spellSwap.tableId === null) {
      setSpellSwap({ ...spellSwap, tableId: cardId });
    }
  };

  const toggleBuiltForCraft = (b: PublicBuiltRecipe) => {
    if (craftHandIndex === null) return;
    setCraftBuiltIds((prev) =>
      prev.includes(b.instanceId) ? prev.filter((x) => x !== b.instanceId) : [...prev, b.instanceId]
    );
  };

  const showLobby = !snap || snap.phase === "lobby";
  const showGame = snap && (snap.phase === "playing" || snap.phase === "ended");

  const myId = socketRef.current?.id;
  const isHost = !!snap && myId === snap.hostId;
  const myTurn = !!snap && snap.phase === "playing" && snap.currentPlayerId === myId;
  const canAct = !!snap && myTurn && snap.mustPlayMainAction;

  const craftDef =
    craftHandIndex !== null && snap?.yourHand
      ? recipeByCatalog(
          snap.recipeCatalog,
          snap.yourHand[craftHandIndex]?.face.kind === "recipe" ? snap.yourHand[craftHandIndex]!.face.defId : ""
        )
      : undefined;

  return (
    <div>
      <header style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ margin: 0 }}>Зельеварение</h1>
        <p className="tagline">
          {showLobby ? (
            <>
              Онлайн-стол для друзей. Подключитесь к серверу, создайте комнату или войдите по коду. В терминале в папке
              игры должно быть запущено <code style={{ color: "var(--accent)" }}>npm run dev</code>.
            </>
          ) : (
            <>
              Конец партии: колода пуста и у всех пустые руки — побеждает набравший больше очков. Сложные рецепты
              возвращают ингредиенты на стол; за чужие собранные рецепты их авторам — половина очков нового рецепта.
              Заклинания не завершают ход.
            </>
          )}
        </p>
      </header>

      {showLobby && (
        <section className="panel">
          <h2 style={{ marginTop: 0 }}>Лобби</h2>
          {!socketConnected && (
            <p className="tagline" style={{ marginTop: 0 }}>
              Подключение к серверу… Если долго так — проверьте, что запущен сервер (порт 3001).
            </p>
          )}
          {socketConnected && !snap && (
            <p className="hint" style={{ marginTop: 0 }}>
              Создайте комнату или введите шестибуквенный код и нажмите «Войти».
            </p>
          )}
          <div className="row" style={{ marginBottom: "0.75rem" }}>
            <label>
              Имя:{" "}
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Как вас звать"
                maxLength={32}
              />
            </label>
          </div>
          {!roomId ? (
            <div className="row">
              <button type="button" className="primary" onClick={createRoom} disabled={!socketConnected}>
                Создать комнату
              </button>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Код комнаты"
                maxLength={6}
                style={{ maxWidth: 140, textTransform: "uppercase", letterSpacing: "0.1em" }}
              />
              <button type="button" onClick={joinRoom} disabled={!socketConnected}>
                Войти
              </button>
            </div>
          ) : (
            <p>
              Код комнаты: <code className="room">{roomId}</code>
            </p>
          )}
          {snap && (
            <ul className="players-list" style={{ marginTop: "1rem" }}>
              {snap.players.map((p) => (
                <li key={p.id}>
                  <span>
                    {p.name}
                    {p.id === snap.hostId ? " (хост)" : ""}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {snap && isHost && (
            <button type="button" className="primary" style={{ marginTop: "1rem" }} onClick={startGame} disabled={snap.players.length < 2}>
              Начать игру (от 2 игроков)
            </button>
          )}
        </section>
      )}

      {showGame && snap && (
        <>
          <section className="panel">
            <h2 style={{ marginTop: 0 }}>Очки</h2>
            <ScoreTrack players={snap.players} max={snap.scoreTrackMax} />
            <p className="hint" style={{ marginBottom: 0 }}>
              В колоде: {snap.deckRemaining}. Ходит:{" "}
              <strong>{snap.players.find((p) => p.id === snap.currentPlayerId)?.name ?? "—"}</strong>
            </p>
          </section>

          <section className="panel">
            <h2 style={{ marginTop: 0 }}>Шкаф элементов</h2>
            {(craftHandIndex !== null || spellTakeIdx !== null || spellSwap?.tableId === null) && canAct && (
              <p className="hint">
                {craftHandIndex !== null && "Выберите карты стола для рецепта (клик включает/снимает)."}
                {spellTakeIdx !== null && "Кликните элемент, чтобы забрать его в руку."}
                {spellSwap && spellSwap.tableId === null && "Кликните карту стола для обмена."}
              </p>
            )}
            <div className="table-grid">
              {snap.table.map((c) => {
                const sel = craftTableIds.includes(c.id);
                const click = canAct && (craftHandIndex !== null || spellTakeIdx !== null || (spellSwap && !spellSwap.tableId));
                const cardData = getCardById(c.id);
                
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`table-card-btn ${sel ? "selected" : ""}`}
                    disabled={!click}
                    onClick={() => onTableClick(c.id)}
                    style={{ 
                      padding: '4px',
                      border: sel ? '2px solid #3498db' : '1px solid #ddd',
                      borderRadius: '8px',
                      background: 'white',
                      cursor: click ? 'pointer' : 'not-allowed'
                    }}
                  >
                    {cardData ? (
                      <img 
                        src={cardData.image} 
                        alt={`${cardData.topContent} - ${cardData.bottomElement}`}
                        style={{ 
                          width: '80px', 
                          height: '112px', 
                          objectFit: 'contain',
                          borderRadius: '4px'
                        }}
                        onError={(e) => {
                          // Если изображение не загрузилось, показываем элемент
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    {/* Запасной вариант - элемент если картинка не загрузилась */}
                    <div className="element-fallback" style={{ fontSize: '10px', display: 'none' }}>
                      <ElementBadge el={c.bottomElement} />
                    </div>
                  </button>
                );
              })}
              {snap.table.length === 0 && <span style={{ color: "var(--muted)" }}>пусто</span>}
            </div>
          </section>

          <section className="panel">
            <h2 style={{ marginTop: 0 }}>Собранные рецепты</h2>
            {spellBreakIdx !== null && canAct && (
              <p className="hint">Кликните свой рецепт, чтобы разобрать (ингредиенты вернутся на стол).</p>
            )}
            {snap.builtRecipes.length === 0 && <span style={{ color: "var(--muted)" }}>пока нет</span>}
            {snap.builtRecipes.map((b) => {
              const mine = b.ownerId === myId;
              const breakMode = spellBreakIdx !== null && canAct && mine;
              return (
                <div key={b.instanceId} className="built-row">
                  <strong>{b.name}</strong>
                  <span>{b.points} очк.</span>
                  <span style={{ color: "var(--muted)" }}>{b.ownerName}</span>
                  {breakMode && (
                    <button
                      type="button"
                      className="primary"
                      onClick={() => {
                        socketRef.current?.emit(
                          "castSpellBreakBuilt",
                          { spellHandIndex: spellBreakIdx, builtInstanceId: b.instanceId },
                          (r: { ok: boolean; error?: string }) => {
                            if (!r.ok) setError(r.error ?? "Ошибка");
                            else setSpellBreakIdx(null);
                          }
                        );
                      }}
                    >
                      Разобрать
                    </button>
                  )}
                  {craftHandIndex !== null && craftDef?.needsBuilt?.length ? (
                    <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <input
                        type="checkbox"
                        checked={craftBuiltIds.includes(b.instanceId)}
                        onChange={() => toggleBuiltForCraft(b)}
                      />
                      использовать
                    </label>
                  ) : null}
                </div>
              );
            })}
          </section>

          <section className="panel">
            <h2 style={{ marginTop: 0 }}>Ваша рука</h2>
            {spellSwap?.tableId && canAct && (
              <p className="hint">Выберите карту в руке, которую отдадите на стол взамен.</p>
            )}
            {snap.yourHand && snap.yourHand.length > 0 ? (
              <div className="hand-row">
                {snap.yourHand.map((c, i) => (
                  <HandCardBlock
                    key={c.id}
                    card={c}
                    index={i}
                    catalog={snap.recipeCatalog}
                    canAct={canAct}
                    craftHandIndex={craftHandIndex}
                    spellSwap={spellSwap}
                    onPlace={() => place(i)}
                    onStartCraft={() => {
                      clearModes();
                      if (c.face.kind !== "recipe") return;
                      setCraftHandIndex(i);
                      setCraftTableIds([]);
                      setCraftBuiltIds([]);
                    }}
                    onSpellTake={() => {
                      clearModes();
                      setSpellTakeIdx(i);
                    }}
                    onSpellBreak={() => {
                      clearModes();
                      setSpellBreakIdx(i);
                    }}
                    onSpellSwapStart={() => {
                      clearModes();
                      setSpellSwap({ spellIdx: i, tableId: null });
                    }}
                    onSpellSwapPickHand={() => {
                      if (!spellSwap?.tableId) return;
                      socketRef.current?.emit(
                        "castSpellSwap",
                        { spellHandIndex: spellSwap.spellIdx, tableCardId: spellSwap.tableId, otherHandIndex: i },
                        (r: { ok: boolean; error?: string }) => {
                          if (!r.ok) setError(r.error ?? "Ошибка");
                          else setSpellSwap(null);
                        }
                      );
                    }}
                  />
                ))}
              </div>
            ) : (
              <span style={{ color: "var(--muted)" }}>—</span>
            )}

            {craftHandIndex !== null && craftDef && (
              <div className="craft-bar">
                <div>
                  <strong>{craftDef.name}</strong> — {craftDef.points} очк. Нужно со стола:{" "}
                  {Object.entries(craftDef.needs).map(([el, n]) => (
                    <span key={el} style={{ marginRight: 6 }}>
                      <ElementBadge el={el as ElementId} />×{n}
                    </span>
                  ))}
                  {craftDef.needsBuilt?.map((nb, j) => (
                    <span key={j} style={{ marginRight: 6 }}>
                      собранный «{recipeByCatalog(snap.recipeCatalog, nb.recipeDefId)?.name ?? nb.recipeDefId}»×{nb.count}
                    </span>
                  ))}
                </div>
                <p className="hint">Выбрано карт стола: {craftTableIds.length}. Собранных: {craftBuiltIds.length}.</p>
                <div className="row">
                  <button type="button" className="primary" onClick={submitCraft}>
                    Собрать рецепт
                  </button>
                  <button type="button" className="ghost" onClick={clearModes}>
                    Отмена
                  </button>
                </div>
              </div>
            )}

            {(spellTakeIdx !== null || spellBreakIdx !== null || spellSwap) && (
              <div className="row" style={{ marginTop: "0.75rem" }}>
                <button type="button" className="ghost" onClick={clearModes}>
                  Отменить заклинание
                </button>
              </div>
            )}

            {canAct && (
              <p className="hint" style={{ marginTop: "0.75rem", marginBottom: 0 }}>
                «На стол» — выложить карту низом (элемент). Новый тип элемента на столе даёт +1 очко. После выложенного
                элемента или сборки рецепта ход переходит; заклинания можно цепочкой до основного действия.
              </p>
            )}
          </section>

          <section className="panel">
            <h2 style={{ marginTop: 0 }}>Справка по рецептам</h2>
            <div style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
              {snap.recipeCatalog.map((r) => (
                <div key={r.id} className="built-row">
                  <span>
                    <strong style={{ color: "var(--text)" }}>{r.name}</strong> — {r.points} очк.
                  </span>
                  <span>
                    {Object.entries(r.needs).map(([el, n]) => (
                      <span key={el} style={{ marginRight: 6 }}>
                        <ElementBadge el={el as ElementId} />×{n}
                      </span>
                    ))}
                    {r.needsBuilt?.map((nb, j) => (
                      <span key={j} style={{ marginLeft: 6 }}>
                        + собр. «{recipeByCatalog(snap.recipeCatalog, nb.recipeDefId)?.name ?? nb.recipeDefId}»×{nb.count}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {snap?.phase === "ended" && (
        <section className="panel">
          <h2 style={{ marginTop: 0 }}>Игра окончена</h2>
          <p>
            Победитель (или ничья): <strong>{snap.winnerName}</strong>
          </p>
        </section>
      )}

      {error && <p className="err">{error}</p>}

      <footer style={{ marginTop: "2rem", color: "var(--muted)", fontSize: "0.85rem" }}>
        Сервер: {socketUrl()}
      </footer>
    </div>
  );
}

function HandCardBlock({
  card,
  index,
  catalog,
  canAct,
  craftHandIndex,
  spellSwap,
  onPlace,
  onStartCraft,
  onSpellTake,
  onSpellBreak,
  onSpellSwapStart,
  onSpellSwapPickHand,
}: {
  card: GameCard;
  index: number;
  catalog: RecipeDef[];
  canAct: boolean;
  craftHandIndex: number | null;
  spellSwap: { spellIdx: number; tableId: string | null } | null;
  onPlace: () => void;
  onStartCraft: () => void;
  onSpellTake: () => void;
  onSpellBreak: () => void;
  onSpellSwapStart: () => void;
  onSpellSwapPickHand: () => void;
}) {
  const busyCraft = craftHandIndex !== null;
  const showSwapHand = spellSwap?.tableId && spellSwap.spellIdx !== index;

  return (
    <div className="hand-card">
      {/* Пытаемся показать реальное изображение карточки */}
      {(() => {
        const cardData = getCardById(card.id);
        if (cardData) {
          return (
            <div className="card-image-container">
              <img 
                src={cardData.image} 
                alt={`${cardData.topContent} - ${cardData.bottomElement}`}
                style={{ 
                  width: '100%', 
                  height: '180px', // Увеличиваем высоту
                  objectFit: 'contain', // Меняем на contain чтобы видеть всю карточку
                  borderRadius: '8px',
                  marginBottom: '8px',
                  border: '1px solid #ddd'
                }}
                onError={(e) => {
                  // Если изображение не загрузилось, показываем текст
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          );
        }
        // Запасной вариант - текстовое отображение
        return null;
      })()}
      
      {/* Сохраняем оригинальное текстовое отображение как запасной вариант */}
      <div className="card-text-content" style={{ display: 'none' }}>
        {card.face.kind === "recipe" ? (
          <>
            <div className="face-line">Рецепт</div>
            <div className="face-title">{recipeByCatalog(catalog, card.face.defId)?.name ?? card.face.defId}</div>
            <div className="face-line">
              Цена: {recipeByCatalog(catalog, card.face.defId)?.points ?? "?"} очк.
            </div>
          </>
        ) : (
          <>
            <div className="face-line">Заклинание</div>
            <div className="face-title">{spellTitle(card.face.spell)}</div>
          </>
        )}
        <div className="face-line">
          Низ (элемент): <ElementBadge el={card.bottomElement} />
        </div>
      </div>
      <div className="row" style={{ flexWrap: "wrap", marginTop: 4 }}>
        <button type="button" disabled={!canAct || busyCraft || !!spellSwap} onClick={onPlace}>
          На стол
        </button>
        {card.face.kind === "recipe" && (
          <button type="button" disabled={!canAct || !!spellSwap} onClick={onStartCraft}>
            Готовить
          </button>
        )}
        {card.face.kind === "spell" && card.face.spell === "take_table" && (
          <button type="button" disabled={!canAct || busyCraft} onClick={onSpellTake}>
            Играть
          </button>
        )}
        {card.face.kind === "spell" && card.face.spell === "break_built" && (
          <button type="button" disabled={!canAct || busyCraft} onClick={onSpellBreak}>
            Играть
          </button>
        )}
        {card.face.kind === "spell" && card.face.spell === "swap_elements" && (
          <button type="button" disabled={!canAct || busyCraft} onClick={onSpellSwapStart}>
            Играть
          </button>
        )}
        {showSwapHand && (
          <button type="button" className="primary" onClick={onSpellSwapPickHand}>
            Отдать эту
          </button>
        )}
      </div>
    </div>
  );
}

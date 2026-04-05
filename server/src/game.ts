import { randomUUID } from "crypto";
import type { 
  GameCard, 
  CardFace, 
  SpellKind,
  GameState,
  PlayerState,
  BuiltRecipe
} from "./types.js";
import { getRecipeDef, RECIPES } from "./recipes.js";
import * as fs from "fs";
import type { ElementId } from "./types.js";

const ELEMENTS: ElementId[] = [
  "волны эфира",
  "камень крови",
  "корень мандрагоры",
  "родниковая вода",
  "белладонна",
  "крыло летучей мыши",
  "глаз змеи",
  "огненный свет",
  "кристалл воздуха",
  "астральная энергия",
  "энергия мысли",
  "мушрумы",
  "порошок судьбы",
  "порошок контроля",
  "порошок истины",
  "порошок бестелесности",
  "эманация власти",
  "зуб дракона",
  "раствор оберег",
  "раствор вечности",
  "эликсир забвения",
  "эликсир мудрости",
  "эликсир верности",
  "эликсир невидимости",
  "эликсир силы",
  "эликсир огня",
  "эликсир вечной молодости",
  "эликсир повелителя растений",
  "эликсир полета",
  "телепатическое снадобье",
  "любовное зелье",
  "цветок папоротника"
];

const START_HAND = 8; // 8 карточек в руке как в настольной игре
const START_TABLE = 8; // 8 карточек на столе (в шкафу)

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
  
  // Реальные ID карточек из папки /client/public/cards// Список всех ID карточек (переименованы в числовой формат)
  const cardIds = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
    '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
    '71', '72', '73', '74', '75', '76'
  ];

  // Базовые маппинги карточек
  const cardMappings: Record<string, { topType: 'recipe' | 'spell'; topContent: string; bottomElement: string; points?: number }> = {
    "1": { topType: "recipe", topContent: "Любовное зелье", bottomElement: "кристалл воздуха", points: 2 },
    "2": { topType: "recipe", topContent: "Зелье вечного сна", bottomElement: "огненный свет", points: 2 },
    "3": { topType: "recipe", topContent: "Эликсир невидимости", bottomElement: "астральная энергия", points: 2 },
    "4": { topType: "recipe", topContent: "Эликсир силы", bottomElement: "энергия мысли", points: 2 },
    "5": { topType: "recipe", topContent: "Исидас мортум", bottomElement: "глаз змеи", points: 2 },
    "6": { topType: "recipe", topContent: "Эликсир огня", bottomElement: "волны эфира", points: 2 },
    "7": { topType: "recipe", topContent: "Настой прорицания", bottomElement: "камень крови", points: 2 },
    "8": { topType: "recipe", topContent: "Телепатическое снадобье", bottomElement: "волны эфира", points: 3 },
    "9": { topType: "spell", topContent: "Взять со стола", bottomElement: "волны эфира", points: 0 },
    "10": { topType: "spell", topContent: "Взять со стола", bottomElement: "волны эфира", points: 0 },
    "11": { topType: "spell", topContent: "Взять со стола", bottomElement: "волны эфира", points: 0 },
    "12": { topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
    "13": { topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
    "14": { topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
    "15": { topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
    "16": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "17": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "18": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "19": { topType: "recipe", topContent: "Порошок судьбы", bottomElement: "белладонна", points: 2 },
    "20": { topType: "recipe", topContent: "Порошок контроля", bottomElement: "крыло летучей мыши", points: 2 },
    "21": { topType: "recipe", topContent: "Порошок истины", bottomElement: "огненный свет", points: 2 },
    "22": { topType: "recipe", topContent: "Порошок бестелесности", bottomElement: "астральная энергия", points: 2 },
    "23": { topType: "recipe", topContent: "Эманация власти", bottomElement: "зуб дракона", points: 2 },
    "24": { topType: "recipe", topContent: "Раствор оберег", bottomElement: "родниковая вода", points: 2 },
    "25": { topType: "recipe", topContent: "Раствор вечности", bottomElement: "корень мандрагоры", points: 2 },
    "26": { topType: "recipe", topContent: "Эликсир забвения", bottomElement: "камень крови", points: 2 },
    "27": { topType: "recipe", topContent: "Эликсир мудрости", bottomElement: "мушрумы", points: 2 },
    "28": { topType: "recipe", topContent: "Эликсир верности", bottomElement: "белладонна", points: 2 },
    "29": { topType: "recipe", topContent: "Эликсир невидимости", bottomElement: "крыло летучей мыши", points: 2 },
    "30": { topType: "recipe", topContent: "Эликсир силы", bottomElement: "глаз змеи", points: 2 },
    "31": { topType: "recipe", topContent: "Эликсир огня", bottomElement: "волны эфира", points: 2 },
    "32": { topType: "recipe", topContent: "Эликсир вечной молодости", bottomElement: "корень мандрагоры", points: 2 },
    "33": { topType: "recipe", topContent: "Эликсир повелителя растений", bottomElement: "родниковая вода", points: 2 },
    "34": { topType: "recipe", topContent: "Эликсир полета", bottomElement: "кристалл воздуха", points: 2 },
    "35": { topType: "recipe", topContent: "Телепатическое снадобье", bottomElement: "волны эфира", points: 3 },
    "36": { topType: "recipe", topContent: "Любовное зелье", bottomElement: "камень крови", points: 2 },
    "37": { topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
    "38": { topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
    "39": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "40": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "41": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "42": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "43": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "44": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "45": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "46": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "47": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "48": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "49": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "50": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "51": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "52": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "53": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "54": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "55": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "56": { topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
    "57": { topType: "recipe", topContent: "Великий эликсир могущества", bottomElement: "волны эфира", points: 5 },
    "58": { topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 5 },
    "59": { topType: "recipe", topContent: "Великий эликсир вечной любви", bottomElement: "огненный свет", points: 5 },
    "60": { topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 5 },
    "61": { topType: "recipe", topContent: "Талисман палантриум", bottomElement: "кристалл воздуха", points: 5 },
    "62": { topType: "recipe", topContent: "Талисман телепортации", bottomElement: "камень крови", points: 5 },
    "63": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
    "64": { topType: "recipe", topContent: "Талисман повелителя растений", bottomElement: "корень мандрагоры", points: 5 },
    "65": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
    "66": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
    "67": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
    "68": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
    "69": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
    "70": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
    "71": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
    "72": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
    "73": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
    "74": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
    "75": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
    "76": { topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 }
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
      // Прямое сопоставление названий карточек с рецептами
      let recipeId: string;
      
      switch (mapping.topContent) {
        case 'Любовное зелье': recipeId = 'love_potion'; break;
        case 'Зелье вечного сна': recipeId = 'sleep_potion'; break;
        case 'Эликсир невидимости': recipeId = 'invisibility_elixir'; break;
        case 'Эликсир силы': recipeId = 'strength_elixir'; break;
        case 'Исидас мортум': recipeId = 'isidas_mortum'; break;
        case 'Эликсир огня': recipeId = 'fire_elixir'; break;
        case 'Раствор вечности': recipeId = 'eternity_solution'; break;
        case 'Эликсир вечной молодости': recipeId = 'eternal_youth_elixir'; break;
        case 'Эликсир верности': recipeId = 'loyalty_elixir'; break;
        case 'Эликсир знания': recipeId = 'knowledge_elixir'; break;
        case 'Эликсир тайного зрения': recipeId = 'secret_vision_elixir'; break;
        case 'Раствор-оберег': recipeId = 'protection_solution'; break;
        case 'Эликсир мудрости': recipeId = 'wisdom_elixir'; break;
        case 'Эликсир забвения': recipeId = 'oblivion_elixir'; break;
        case 'Зелье полиглотум': recipeId = 'polyglotum_potion'; break;
        case 'Эманация власти': recipeId = 'power_emanation'; break;
        case 'Настой прорицания': recipeId = 'divination_tincture'; break;
        case 'Эликсир повелителя растений': recipeId = 'plants_master_elixir'; break;
        case 'Телепатическое снадобье': recipeId = 'telepathic_potion'; break;
        case 'Порошок контроля': recipeId = 'control_powder'; break;
        case 'Порошок истины': recipeId = 'truth_powder'; break;
        case 'Порошок бестелесности': recipeId = 'incorporeal_powder'; break;
        case 'Порошок судьбы': recipeId = 'fate_powder'; break;
        case 'Великий эликсир предзнаменования': recipeId = 'great_omen_elixir'; break;
        case 'Великий эликсир возрождения': recipeId = 'great_resurrection_elixir'; break;
        case 'Великий эликсир прозрения': recipeId = 'great_clairvoyance_elixir'; break;
        case 'Великий эликсир защиты': recipeId = 'great_protection_elixir'; break;
        case 'Великий эликсир исчезновения': recipeId = 'great_disappearance_elixir'; break;
        case 'Великий эликсир безвременья': recipeId = 'great_timeless_elixir'; break;
        case 'Великий эликсир могущества': recipeId = 'great_power_elixir'; break;
        case 'Великий эликсир вечной любви': recipeId = 'great_love_elixir'; break;
        case 'Талисман скрытого знания': recipeId = 'knowledge_talisman'; break;
        case 'Талисман палантриум': recipeId = 'palantir_talisman'; break;
        case 'Единорог': recipeId = 'unicorn'; break;
        case 'Талисман телепортации': recipeId = 'teleport_talisman'; break;
        case 'Талисман повелителя зверей': recipeId = 'beasts_master_talisman'; break;
        case 'Грифон': recipeId = 'griffin'; break;
        case 'Незримый страж': recipeId = 'invisible_guardian'; break;
        case 'Дракон': recipeId = 'dragon'; break;
        case 'Огненная саламандра': recipeId = 'fire_salamander'; break;
        case 'Баньши': recipeId = 'banshee'; break;
        case 'Василиск': recipeId = 'basilisk'; break;
        case 'Верховный эликсир': recipeId = 'supreme_elixir'; break;
        case 'Великий талисман магии': recipeId = 'great_magic_talisman'; break;
        case 'Авокадо кадавр': recipeId = 'avocado_cadaver'; break;
        default: recipeId = mapping.topContent.toLowerCase().replace(/\s+/g, '_'); break;
      }
      
      face = { kind: 'recipe', defId: recipeId };
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
  while (p.hand.length < 8 && game.deck.length > 0) { // Дозабор до 8 карточек
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
  const card = removed!;
  
  // Проверяем есть ли уже такой элемент на столе
  const elementAlreadyOnTable = game.table.some(c => c.bottomElement === card.bottomElement);
  
  console.log(`Placing card: ${card.id}, element: ${card.bottomElement}, alreadyOnTable: ${elementAlreadyOnTable}`);
  
  game.table.push(card);

  // Начисляем +1 очко только если такого элемента еще нет на столе
  if (!elementAlreadyOnTable) {
    p.score += 1;
    console.log(`Added 1 point to player ${p.id}, new score: ${p.score}`);
  } else {
    console.log(`No points added - element already on table`);
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

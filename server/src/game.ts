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

  // Базовые маппинги карточек - ТОЛЬКО заклинания как spell, все остальные как recipe
  const cardMappings: Record<string, { topType: 'recipe' | 'spell'; topContent: string; bottomElement: string; points?: number }> = {
    "1": { topType: "recipe", topContent: "любовное зелье", bottomElement: "кристалл воздуха", points: 2 },
    "2": { topType: "recipe", topContent: "зелье вечного сна", bottomElement: "огненный свет", points: 2 },
    "3": { topType: "recipe", topContent: "эликсир невидимости", bottomElement: "астральная энергия", points: 2 },
    "4": { topType: "recipe", topContent: "эликсир силы", bottomElement: "энергия мысли", points: 2 },
    "5": { topType: "recipe", topContent: "исидас мортум", bottomElement: "глаз змеи", points: 2 },
    "6": { topType: "recipe", topContent: "эликсир огня", bottomElement: "квинтэссенция воли", points: 2 },
    "7": { topType: "recipe", topContent: "раствор вечности", bottomElement: "корень мандрагоры", points: 2 },
    "8": { topType: "recipe", topContent: "эликсир вечной молодости", bottomElement: "зуб дракона", points: 2 },
    "9": { topType: "recipe", topContent: "эликсир верности", bottomElement: "мушрумы", points: 2 },
    "10": { topType: "recipe", topContent: "любовное зелье", bottomElement: "кристалл воздуха", points: 2 },
    "11": { topType: "recipe", topContent: "зелье вечного сна", bottomElement: "огненный свет", points: 2 },
    "12": { topType: "recipe", topContent: "эликсир невидимости", bottomElement: "астральная энергия", points: 2 },
    "13": { topType: "recipe", topContent: "эликсир силы", bottomElement: "энергия мысли", points: 2 },
    "14": { topType: "recipe", topContent: "исидас мортум", bottomElement: "глаз змеи", points: 2 },
    "15": { topType: "recipe", topContent: "эликсир огня", bottomElement: "квинтэссенция воли", points: 2 },
    "16": { topType: "recipe", topContent: "раствор вечности", bottomElement: "корень мандрагоры", points: 2 },
    "17": { topType: "recipe", topContent: "эликсир вечной молодости", bottomElement: "зуб дракона", points: 2 },
    "18": { topType: "recipe", topContent: "эликсир верности", bottomElement: "мушрумы", points: 2 },
    "19": { topType: "recipe", topContent: "эликсир знания", bottomElement: "родниковая вода", points: 2 },
    "20": { topType: "recipe", topContent: "эликсир тайного зрения", bottomElement: "крыло летучей мыши", points: 2 },
    "21": { topType: "recipe", topContent: "раствор-оберег", bottomElement: "перо феникса", points: 2 },
    "22": { topType: "recipe", topContent: "эликсир мудрости", bottomElement: "астральная энергия", points: 3 },
    "23": { topType: "recipe", topContent: "эликсир забвения", bottomElement: "цветок папоротника", points: 2 },
    "24": { topType: "recipe", topContent: "зелье полиглотум", bottomElement: "белладонна", points: 2 },
    "25": { topType: "recipe", topContent: "эманация власти", bottomElement: "волны эфира", points: 2 },
    "26": { topType: "recipe", topContent: "настой прорицания", bottomElement: "камень крови", points: 2 },
    "27": { topType: "recipe", topContent: "эликсир повелителя растений", bottomElement: "энергия мысли", points: 3 },
    "28": { topType: "recipe", topContent: "эликсир знания", bottomElement: "родниковая вода", points: 2 },
    "29": { topType: "recipe", topContent: "эликсир тайного зрения", bottomElement: "крыло летучей мыши", points: 2 },
    "30": { topType: "recipe", topContent: "раствор-оберег", bottomElement: "перо феникса", points: 2 },
    "31": { topType: "recipe", topContent: "эликсир мудрости", bottomElement: "квинтэссенция воли", points: 3 },
    "32": { topType: "recipe", topContent: "эликсир забвения", bottomElement: "цветок папоротника", points: 2 },
    "33": { topType: "recipe", topContent: "зелье полиглотум", bottomElement: "белладонна", points: 2 },
    "34": { topType: "recipe", topContent: "эманация власти", bottomElement: "волны эфира", points: 2 },
    "35": { topType: "recipe", topContent: "настой прорицания", bottomElement: "камень крови", points: 2 },
    "36": { topType: "recipe", topContent: "эликсир повелителя растений", bottomElement: "волны эфира", points: 3 },
    "37": { topType: "spell", topContent: "заклятие трансформы", bottomElement: "крыло летучей мыши", points: 0 },
    "38": { topType: "spell", topContent: "заклятие познания", bottomElement: "белладонна", points: 0 },
    "39": { topType: "spell", topContent: "заклятие познания", bottomElement: "мушрумы", points: 0 },
    "40": { topType: "spell", topContent: "заклятие разрушения", bottomElement: "цветок папоротника", points: 0 },
    "41": { topType: "spell", topContent: "заклятие разрушения", bottomElement: "глаз змеи", points: 0 },
    "42": { topType: "spell", topContent: "заклятие трансформы", bottomElement: "корень мандрагоры", points: 0 },
    "43": { topType: "recipe", topContent: "эликсир мудрости", bottomElement: "квинтэссенция воли", points: 3 },
    "44": { topType: "recipe", topContent: "эликсир повелителя растений", bottomElement: "волны эфира", points: 3 },
    "45": { topType: "recipe", topContent: "телепатическое снадобье", bottomElement: "астральная энергия", points: 3 },
    "46": { topType: "recipe", topContent: "порошок контроля", bottomElement: "цветок папоротника", points: 4 },
    "47": { topType: "recipe", topContent: "порошок истины", bottomElement: "мушрумы", points: 4 },
    "48": { topType: "recipe", topContent: "эликсир полета", bottomElement: "энергия мысли", points: 3 },
    "49": { topType: "recipe", topContent: "великий эликсир предзнаменования", bottomElement: "родниковая вода", points: 6 },
    "50": { topType: "recipe", topContent: "порошок бестелесности", bottomElement: "корень мандрагоры", points: 4 },
    "51": { topType: "recipe", topContent: "порошок судьбы", bottomElement: "белладонна", points: 4 },
    "52": { topType: "recipe", topContent: "великий эликсир возрождения", bottomElement: "крыло летучей мыши", points: 6 },
    "53": { topType: "recipe", topContent: "великий эликсир прозрения", bottomElement: "кристалл воздуха", points: 6 },
    "54": { topType: "recipe", topContent: "великий эликсир защиты", bottomElement: "глаз змеи", points: 6 },
    "55": { topType: "recipe", topContent: "великий эликсир исчезновения", bottomElement: "зуб дракона", points: 6 },
    "56": { topType: "recipe", topContent: "великий эликсир безвременья", bottomElement: "камень крови", points: 6 },
    "57": { topType: "recipe", topContent: "великий эликсир могущества", bottomElement: "перо феникса", points: 6 },
    "58": { topType: "recipe", topContent: "талисман скрытого знания", bottomElement: "огненный свет", points: 8 },
    "59": { topType: "recipe", topContent: "талисман палантриум", bottomElement: "кристалл воздуха", points: 8 },
    "60": { topType: "recipe", topContent: "великий эликсир вечной любви", bottomElement: "огненный свет", points: 6 },
    "61": { topType: "recipe", topContent: "единорог", bottomElement: "белладонна", points: 8 },
    "62": { topType: "recipe", topContent: "талисман телепортации", bottomElement: "камень крови", points: 8 },
    "63": { topType: "recipe", topContent: "талисман повелителя зверей", bottomElement: "родниковая вода", points: 8 },
    "64": { topType: "recipe", topContent: "грифон", bottomElement: "мушрумы", points: 8 },
    "65": { topType: "recipe", topContent: "незримый страж", bottomElement: "крыло летучей мыши", points: 8 },
    "66": { topType: "recipe", topContent: "дракон", bottomElement: "глаз змеи", points: 8 },
    "67": { topType: "recipe", topContent: "огненная саламандра", bottomElement: "перо феникса", points: 8 },
    "68": { topType: "recipe", topContent: "баньши", bottomElement: "зуб дракона", points: 8 },
    "69": { topType: "recipe", topContent: "василиск", bottomElement: "корень мандрагоры", points: 8 },
    "70": { topType: "recipe", topContent: "верховный эликсир", bottomElement: "", points: 10 },
    "71": { topType: "recipe", topContent: "великий талисман магии", bottomElement: "", points: 10 },
    "72": { topType: "recipe", topContent: "авокадо кадавр", bottomElement: "цветок папоротника", points: 8 },
    "73": { topType: "recipe", topContent: "эликсир полета", bottomElement: "квинтэссенция воли", points: 3 },
    "74": { topType: "recipe", topContent: "телепатическое снадобье", bottomElement: "волны эфира", points: 3 },
    "75": { topType: "recipe", topContent: "телепатическое снадобье", bottomElement: "волны эфира", points: 3 },
    "76": { topType: "recipe", topContent: "эликсир полета", bottomElement: "квинтэссенция воли", points: 3 }
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
        case 'любовное зелье': recipeId = 'love_potion'; break;
        case 'зелье вечного сна': recipeId = 'sleep_potion'; break;
        case 'эликсир невидимости': recipeId = 'invisibility_elixir'; break;
        case 'эликсир силы': recipeId = 'strength_elixir'; break;
        case 'исидас мортум': recipeId = 'isidas_mortum'; break;
        case 'эликсир огня': recipeId = 'fire_elixir'; break;
        case 'раствор вечности': recipeId = 'eternity_solution'; break;
        case 'эликсир вечной молодости': recipeId = 'eternal_youth_elixir'; break;
        case 'эликсир верности': recipeId = 'loyalty_elixir'; break;
        case 'эликсир знания': recipeId = 'knowledge_elixir'; break;
        case 'эликсир тайного зрения': recipeId = 'secret_vision_elixir'; break;
        case 'раствор-оберег': recipeId = 'protection_solution'; break;
        case 'эликсир мудрости': recipeId = 'wisdom_elixir'; break;
        case 'эликсир забвения': recipeId = 'oblivion_elixir'; break;
        case 'зелье полиглотум': recipeId = 'polyglotum_potion'; break;
        case 'эманация власти': recipeId = 'power_emanation'; break;
        case 'настой прорицания': recipeId = 'divination_tincture'; break;
        case 'эликсир повелителя растений': recipeId = 'plants_master_elixir'; break;
        case 'телепатическое снадобье': recipeId = 'telepathic_potion'; break;
        case 'порошок контроля': recipeId = 'control_powder'; break;
        case 'порошок истины': recipeId = 'truth_powder'; break;
        case 'порошок бестелесности': recipeId = 'incorporeal_powder'; break;
        case 'порошок судьбы': recipeId = 'fate_powder'; break;
        case 'великий эликсир предзнаменования': recipeId = 'great_omen_elixir'; break;
        case 'великий эликсир возрождения': recipeId = 'great_resurrection_elixir'; break;
        case 'великий эликсир прозрения': recipeId = 'great_clairvoyance_elixir'; break;
        case 'великий эликсир защиты': recipeId = 'great_protection_elixir'; break;
        case 'великий эликсир исчезновения': recipeId = 'great_disappearance_elixir'; break;
        case 'великий эликсир безвременья': recipeId = 'great_timeless_elixir'; break;
        case 'великий эликсир могущества': recipeId = 'great_power_elixir'; break;
        case 'великий эликсир вечной любви': recipeId = 'great_love_elixir'; break;
        case 'талисман скрытого знания': recipeId = 'knowledge_talisman'; break;
        case 'талисман палантриум': recipeId = 'palantir_talisman'; break;
        case 'единорог': recipeId = 'unicorn'; break;
        case 'талисман телепортации': recipeId = 'teleport_talisman'; break;
        case 'талисман повелителя зверей': recipeId = 'beasts_master_talisman'; break;
        case 'грифон': recipeId = 'griffin'; break;
        case 'незримый страж': recipeId = 'invisible_guardian'; break;
        case 'дракон': recipeId = 'dragon'; break;
        case 'огненная саламандра': recipeId = 'fire_salamander'; break;
        case 'баньши': recipeId = 'banshee'; break;
        case 'василиск': recipeId = 'basilisk'; break;
        case 'верховный эликсир': recipeId = 'supreme_elixir'; break;
        case 'великий талисман магии': recipeId = 'great_magic_talisman'; break;
        case 'авокадо кадавр': recipeId = 'avocado_cadaver'; break;
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
        case 'заклятие разрушения':
          spell = 'break_built';
          break;
        case 'Обмен':
          spell = 'swap_elements';
          break;
        case 'заклятие трансформы':
          spell = 'transform_built';
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
  return Math.max(300, m + 8, Math.ceil(m / 12) * 12);
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
  const log = `🎯 NEXT TURN START: currentPlayerIndex=${game.currentPlayerIndex}, players=${game.players.map(p => ({ id: p.id, name: p.name }))}`;
  console.log(log);
  
  // Записываем в файл логов
  fs.appendFileSync('server.log', log + '\n');
  
  game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
  
  const log2 = `🎯 NEXT TURN AFTER INDEX CHANGE: currentPlayerIndex=${game.currentPlayerIndex}`;
  console.log(log2);
  fs.appendFileSync('server.log', log2 + '\n');
  
  beginTurn(game);
  checkEnd(game);
  
  const log3 = `🎯 NEXT TURN END: currentPlayerIndex=${game.currentPlayerIndex}`;
  console.log(log3);
  fs.appendFileSync('server.log', log3 + '\n');
}

/** Если рука опустела до основного действия — передаём ход (добор только в начале следующего хода). */
function afterSpell(game: GameState, isKnowledgeSpell: boolean = false) {
  checkEnd(game);
  if (game.phase !== "playing") return;
  // После заклятия познания НЕ передаем ход сразу - игрок должен сделать ход
  if (isKnowledgeSpell) {
    console.log('🎯 KNOWLEDGE SPELL USED - player gets extra turn');
    return; // НЕ передаем ход
  }
  // После других заклятий всегда передаем ход, даже если в руке есть карты
  nextTurn(game);
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
  console.log('🎯 CRAFT RECIPE START:', { playerId, handIndex, tableCardIds, builtInstanceIds });
  
  if (game.phase !== "playing") return "Игра не идёт";
  const p = currentPlayer(game);
  if (p.id !== playerId) return "Не ваш ход";
  if (handIndex < 0 || handIndex >= p.hand.length) return "Нет такой карты";

  const handCard = p.hand[handIndex]!;
  console.log('🎯 HAND CARD:', handCard);
  
  if (handCard.face.kind !== "recipe") return "Это не карта рецепта";

  const def = getRecipeDef(handCard.face.defId);
  console.log('🎯 RECIPE DEF:', def);
  
  if (!def) return "Неизвестный рецепт";

  const needsBuilt = def.needsBuilt ?? [];
  console.log('🎯 NEEDS BUILT:', needsBuilt);
  
  let elementalPick: GameCard[] = [];
  // Если рецепт требует собранные рецепты - игнорируем элементы со стола
  if (needsBuilt.length > 0) {
    console.log('🎯 RECIPE USES BUILT RECIPES ONLY - IGNORING TABLE ELEMENTS');
  } else {
    // Проверяем элементы со стола только если нет needsBuilt
    const pick = validateTableSelection(game.table, tableCardIds, def.needs);
    console.log('🎯 ELEMENTAL PICK:', pick);
    
    if (!pick) return "Неверный набор карт со стола";
    elementalPick = pick;
  }

  let usedBuilt: BuiltRecipe[] = [];
  if (needsBuilt.length) {
    const v = validateBuiltSelection(game.builtRecipes, builtInstanceIds, needsBuilt);
    console.log('🎯 USED BUILT:', v);
    
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
    console.log('🎯 COMPLEX RECIPE: returning ingredients to table');
    // Возвращаем ингредиенты использованных собранных рецептов на стол
    for (const b of usedBuilt) {
      console.log('🎯 RETURNING INGREDIENTS FROM:', b.name);
      for (const ing of b.ingredients) {
        console.log('🎯 RETURNING INGREDIENT:', ing.id, ing.bottomElement);
        game.table.push(ing);
      }
    }
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
  console.log('🎯 CRAFT RECIPE SUCCESS!');
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
  
  // Проверяем это заклятие познания по элементу на карте
  const isKnowledgeSpell = sc.bottomElement === 'белладонна' || sc.bottomElement === 'мушрумы';
  console.log('🎯 SPELL TYPE:', { element: sc.bottomElement, isKnowledgeSpell });
  
  // Для заклятия познания карта уходит в шкаф, для других - в сброс
  if (isKnowledgeSpell) {
    game.table.push(sc); // Заклятие познания уходит в шкаф
  } else {
    game.discard.push(sc); // Другие заклятия уходят в сброс
  }
  
  p.hand.push(fromTable!);

  afterSpell(game, isKnowledgeSpell);
  return null;
}

export function castSpellBreakBuilt(
  game: GameState,
  playerId: string,
  spellHandIndex: number,
  builtInstanceId: string,
  chosenCardId?: string
): string | null {
  console.log('🎯 BREAK BUILT START:', { playerId, builtInstanceId, chosenCardId });
  
  if (game.phase !== "playing") return "Игра не идёт";
  const p = currentPlayer(game);
  if (p.id !== playerId) return "Не ваш ход";
  const sc = p.hand[spellHandIndex];
  if (!sc || sc.face.kind !== "spell" || sc.face.spell !== "break_built") return "Нужна карта «Разобрать рецепт»";

  const bi = game.builtRecipes.find((b) => b.instanceId === builtInstanceId);
  if (!bi) return "Нет такого рецепта";
  if (bi.ownerId !== playerId) return "Можно разобрать только свой рецепт";

  console.log('🎯 BREAK BUILT RECIPE:', { name: bi.name, ingredients: bi.ingredients });

  p.hand.splice(spellHandIndex, 1);
  game.discard.push(sc);
  game.builtRecipes = game.builtRecipes.filter((b) => b.instanceId !== builtInstanceId);

  // Если выбрана конкретная карточка - забираем ее себе (без очков)
  if (chosenCardId) {
    const chosenCard = bi.ingredients.find((ing) => ing.id === chosenCardId);
    if (chosenCard) {
      console.log('🎯 BREAK BUILT CHOSEN CARD:', chosenCard);
      
      // Создаем новый "рецепт" из одной карточки
      const newBuiltRecipe: BuiltRecipe = {
        instanceId: `built-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ownerId: playerId,
        card: chosenCard,
        recipeDefId: `single_card_${chosenCard.bottomElement}`,
        points: 0, // Без очков
        name: `Карточка: ${chosenCard.bottomElement}`,
        ingredients: [chosenCard] // Сохраняем как ингредиент
      };
      
      game.builtRecipes.push(newBuiltRecipe);
      console.log('🎯 BREAK BUILT NEW RECIPE ADDED:', newBuiltRecipe);
      
      // Остальные карты возвращаем на стол
      const otherCards = bi.ingredients.filter((ing) => ing.id !== chosenCardId);
      for (const card of otherCards) game.table.push(card);
      
      console.log('🎯 BREAK BUILT RETURNED TO TABLE:', otherCards.length);
    } else {
      // Если карта не найдена - возвращаем все
      for (const ing of bi.ingredients) game.table.push(ing);
    }
  } else {
    // Если карта не выбрана - возвращаем все
    for (const ing of bi.ingredients) game.table.push(ing);
  }

  afterSpell(game);
  console.log('🎯 BREAK BUILT SUCCESS');
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

export function castSpellTransformBuilt(
  game: GameState,
  playerId: string,
  spellHandIndex: number,
  builtInstanceId: string,
  tableCardId: string
): string | null {
  if (game.phase !== "playing") return "Игра не идёт";
  const p = currentPlayer(game);
  if (p.id !== playerId) return "Не ваш ход";
  const sc = p.hand[spellHandIndex];
  if (!sc || sc.face.kind !== "spell" || sc.face.spell !== "transform_built") return "Нужна карта «Заклятие трансформы»";
  
  // Находим свой собранный рецепт
  const builtRecipe = game.builtRecipes.find(br => br.instanceId === builtInstanceId && br.ownerId === playerId);
  if (!builtRecipe) return "Можно трансформировать только свои собранные рецепты";
  
  // Находим карту на столе
  const tableIdx = game.table.findIndex((c) => c.id === tableCardId);
  if (tableIdx < 0) return "На столе нет этой карты";
  const tableCard = game.table[tableIdx]!;
  
  console.log('🎯 TRANSFORM BUILT:', { 
    builtRecipe: builtRecipe.recipeDefId, 
    tableCard: tableCard.bottomElement,
    player: playerId 
  });
  
  // Удаляем заклятие из руки
  p.hand.splice(spellHandIndex, 1);
  game.discard.push(sc); // Заклятие уходит в сброс
  
  // Удаляем собранный рецепт из собранных
  game.builtRecipes = game.builtRecipes.filter(br => br.instanceId !== builtInstanceId);
  
  // Разбираем рецепт и кладем все карты в шкаф
  // Карта самого рецепта
  game.table.push(builtRecipe.card);
  // Ингредиенты рецепта
  for (const ingredient of builtRecipe.ingredients) {
    game.table.push(ingredient);
  }
  
  // Карта со стола становится собранным рецептом (не дает баллов!)
  const newBuiltRecipe: BuiltRecipe = {
    instanceId: `built_${Date.now()}_${playerId}`,
    recipeDefId: "transformed_card", // Специальный ID для трансформированных карт
    ownerId: playerId,
    card: tableCard, // Карта со стола становится картой рецепта
    points: 0, // НЕ дает баллов!
    name: "Трансформированная карта", // Имя для отображения
    ingredients: [] // Пустые ингредиенты для трансформированных карт
  };
  
  game.builtRecipes.push(newBuiltRecipe);
  
  console.log('🎯 TRANSFORM COMPLETE:', { 
    newBuilt: newBuiltRecipe,
    tableNowHas: game.table.length 
  });
  
  // После трансформы игрок делает дополнительный ход как в познании
  afterSpell(game, true); // Дополнительный ход как у заклятия познания
  return null;
}

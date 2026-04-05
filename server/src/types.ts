export type ElementId =
  // Базовые элементы
  | "волны эфира"
  | "камень крови"
  | "корень мандрагоры"
  | "родниковая вода"
  | "белладонна"
  | "крыло летучей мыши"
  | "глаз змеи"
  | "огненный свет"
  | "кристалл воздуха"
  | "астральная энергия"
  | "энергия мысли"
  | "мушрумы"
  | "цветок папоротника"
  | "перо феникса"
  | "зуб дракона"
  | "квинтэссенция воли"
  // Простые зелья (могут быть ингредиентами)
  | "любовное зелье"
  | "зелье вечного сна"
  | "эликсир невидимости"
  | "эликсир силы"
  | "исидас мортум"
  | "эликсир огня"
  | "раствор вечности"
  | "эликсир вечной молодости"
  | "эликсир верности"
  | "эликсир знания"
  | "эликсир тайного зрения"
  | "раствор-оберег"
  | "эликсир мудрости"
  | "эликсир забвения"
  | "зелье полиглотум"
  | "эманация власти"
  | "настой прорицания"
  | "эликсир повелителя растений"
  | "телепатическое снадобье"
  // Общие категории
  | "любой великий эликсир"
  | "любой талисман"
  | "порошок судьбы"
  | "порошок контроля"
  | "порошок истины"
  | "порошок бестелесности"
  | "эманация власти"
  | "зуб дракона"
  | "раствор оберег"
  | "раствор вечности"
  | "эликсир забвения"
  | "эликсир мудрости"
  | "эликсир верности"
  | "эликсир невидимости"
  | "эликсир силы"
  | "эликсир огня"
  | "эликсир вечной молодости"
  | "эликсир повелителя растений"
  | "эликсир полета"
  | "телепатическое снадобье"
  | "любовное зелье"
  | "цветок папоротника";

/** Три базовых заклинания в духе «Практикума». */
export type SpellKind = "take_table" | "break_built" | "swap_elements";

export type CardFace =
  | { kind: "recipe"; defId: string }
  | { kind: "spell"; spell: SpellKind };

/** Карта как в оригинале: вверху рецепт или заклинание, внизу элемент (кладётся в шкаф). */
export interface GameCard {
  id: string;
  bottomElement: ElementId;
  face: CardFace;
}

export interface NeedsBuiltEntry {
  recipeDefId: string;
  count: number;
}

export interface RecipeDef {
  id: string;
  name: string;
  needs: Partial<Record<ElementId, number>>;
  /** Сколько уже собранных рецептов данного типа нужно (как компоненты). */
  needsBuilt?: NeedsBuiltEntry[];
  points: number;
}

export interface BuiltRecipe {
  instanceId: string;
  ownerId: string;
  card: GameCard;
  recipeDefId: string;
  points: number;
  name: string;
  /** Ингредиенты со стола, ушедшие под этот рецепт (для разборки). */
  ingredients: GameCard[];
}

export interface PlayerState {
  id: string;
  name: string;
  hand: GameCard[];
  score: number;
}

export type GamePhase = "lobby" | "playing" | "ended";

export interface GameState {
  phase: GamePhase;
  hostId: string;
  players: PlayerState[];
  deck: GameCard[];
  discard: GameCard[];
  table: GameCard[];
  builtRecipes: BuiltRecipe[];
  seenElements: Set<ElementId>;
  currentPlayerIndex: number;
  winnerName?: string;
}

export interface PublicPlayer {
  id: string;
  name: string;
  score: number;
  handCount: number;
}

export interface PublicBuiltRecipe {
  instanceId: string;
  ownerId: string;
  ownerName: string;
  recipeDefId: string;
  name: string;
  points: number;
}

export interface PublicGameSnapshot {
  phase: GamePhase;
  hostId: string;
  players: PublicPlayer[];
  table: GameCard[];
  builtRecipes: PublicBuiltRecipe[];
  currentPlayerId: string;
  deckRemaining: number;
  /** После добора в начале хода нужно сыграть заклинание и/или завершить ход выложением элемента или сборкой рецепта. */
  mustPlayMainAction: boolean;
  recipeCatalog: RecipeDef[];
  winnerName?: string;
  /** Максимум на треке очков (динамический). */
  scoreTrackMax: number;
  yourHand?: GameCard[];
}

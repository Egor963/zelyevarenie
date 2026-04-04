export type ElementId =
  | "огонь"
  | "вода"
  | "земля"
  | "воздух"
  | "свет"
  | "тьма"
  | "жизнь"
  | "металл";

export type SpellKind = "take_table" | "break_built" | "swap_elements";

export type CardFace =
  | { kind: "recipe"; defId: string }
  | { kind: "spell"; spell: SpellKind };

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
  needsBuilt?: NeedsBuiltEntry[];
  points: number;
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
  phase: "lobby" | "playing" | "ended";
  hostId: string;
  players: PublicPlayer[];
  table: GameCard[];
  builtRecipes: PublicBuiltRecipe[];
  currentPlayerId: string;
  deckRemaining: number;
  mustPlayMainAction: boolean;
  recipeCatalog: RecipeDef[];
  winnerName?: string;
  scoreTrackMax: number;
  yourHand?: GameCard[];
}

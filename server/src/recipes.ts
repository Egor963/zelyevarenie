import type { RecipeDef } from "./types.js";

/** Каталог рецептов (свои названия; механика как в оригинале: элементы + чужие собранные рецепты). */
export const RECIPES: RecipeDef[] = [
  {
    id: "plant_master",
    name: "повелитель растений",
    needs: { "волны эфира": 2 },
    points: 3,
  },
  {
    id: "belladonna",
    name: "белладонна",
    needs: { "волны эфира": 2 },
    points: 3,
  },
  {
    id: "fire_master",
    name: "повелитель огня",
    needs: { "волны эфира": 2 },
    points: 4,
  },
  {
    id: "light_master",
    name: "повелитель света",
    needs: { "волны эфира": 2 },
    points: 4,
  },
  {
    id: "darkness_master",
    name: "повелитель тьмы",
    needs: { "волны эфира": 2 },
    points: 5,
  },
  {
    id: "elements_master",
    name: "повелитель стихий",
    needs: { "волны эфира": 3 },
    points: 6,
  },
  {
    id: "will_quintessence",
    name: "квинтэссенция воли",
    needs: { "волны эфира": 4 },
    points: 8,
  },
  {
    id: "time_master",
    name: "повелитель времени",
    needs: { "волны эфира": 7 },
    points: 6,
  },
  {
    id: "mind_master",
    name: "повелитель разума",
    needs: { "волны эфира": 4 },
    points: 10,
    needsBuilt: [
      { recipeDefId: "darkness_master", count: 1 },
      { recipeDefId: "time_master", count: 1 },
    ],
  },
];

export function getRecipeDef(id: string): RecipeDef | undefined {
  return RECIPES.find((r) => r.id === id);
}

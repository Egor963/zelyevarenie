import type { RecipeDef } from "./types.js";

/** Каталог рецептов (свои названия; механика как в оригинале: элементы + чужие собранные рецепты). */
export const RECIPES: RecipeDef[] = [
  {
    id: "mist",
    name: "Туман",
    needs: { огонь: 1, вода: 1 },
    points: 3,
  },
  {
    id: "mud",
    name: "Ил",
    needs: { земля: 1, вода: 1 },
    points: 3,
  },
  {
    id: "spark",
    name: "Искра",
    needs: { металл: 1, огонь: 1 },
    points: 4,
  },
  {
    id: "dawn",
    name: "Рассвет",
    needs: { свет: 1, воздух: 1 },
    points: 4,
  },
  {
    id: "shadow_life",
    name: "Тенежизнь",
    needs: { тьма: 1, жизнь: 1 },
    points: 5,
  },
  {
    id: "storm",
    name: "Буря",
    needs: { воздух: 1, вода: 1, металл: 1 },
    points: 6,
  },
  {
    id: "philosophy",
    name: "Квинтэссенция",
    needs: { огонь: 1, вода: 1, земля: 1, воздух: 1 },
    points: 8,
  },
  {
    id: "elixir_greater",
    name: "Сильный эликсир",
    needs: { земля: 1 },
    needsBuilt: [{ recipeDefId: "mist", count: 1 }],
    points: 6,
  },
  {
    id: "arcane_bind",
    name: "Чародейская связь",
    needs: { жизнь: 1 },
    needsBuilt: [{ recipeDefId: "mud", count: 1 }, { recipeDefId: "spark", count: 1 }],
    points: 10,
  },
];

export function getRecipeDef(id: string): RecipeDef | undefined {
  return RECIPES.find((r) => r.id === id);
}

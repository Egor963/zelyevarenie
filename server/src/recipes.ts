import type { RecipeDef } from "./types.js";

/** Каталог рецептов (свои названия; механика как в оригинале: элементы + чужие собранные рецепты). */
export const RECIPES: RecipeDef[] = [
  {
    id: "mist",
    name: "Туман",
    needs: { "огненный свет": 1, "кристалл воды": 1 },
    points: 3,
  },
  {
    id: "mud",
    name: "Ил",
    needs: { "кристалл земли": 1, "кристалл воды": 1 },
    points: 3,
  },
  {
    id: "spark",
    name: "Искра",
    needs: { "кристалл металла": 1, "огненный свет": 1 },
    points: 4,
  },
  {
    id: "dawn",
    name: "Рассвет",
    needs: { "кристалл света": 1, "кристалл воздуха": 1 },
    points: 4,
  },
  {
    id: "shadow_life",
    name: "Тенежизнь",
    needs: { "кристалл тьмы": 1, "кристалл жизни": 1 },
    points: 5,
  },
  {
    id: "storm",
    name: "Буря",
    needs: { "кристалл воздуха": 1, "кристалл воды": 1, "кристалл металла": 1 },
    points: 6,
  },
  {
    id: "quintessence",
    name: "Квинтэссенция",
    needs: { "огненный свет": 1, "кристалл воды": 1, "кристалл земли": 1, "кристалл воздуха": 1 },
    points: 8,
  },
  {
    id: "strong_potion",
    name: "Сильный эликсир",
    needs: { "кристалл земли": 1, "огненный свет": 1, "кристалл воды": 1, "кристалл металла": 1, "кристалл света": 1, "кристалл тьмы": 1, "кристалл жизни": 1 },
    points: 6,
  },
  {
    id: "mage_link",
    name: "Чародейская связь",
    needs: { "кристалл жизни": 1, "кристалл тьмы": 1, "кристалл света": 1, "кристалл металла": 1 },
    points: 10,
    needsBuilt: [
      { recipeDefId: "shadow_life", count: 1 },
      { recipeDefId: "strong_potion", count: 1 },
    ],
  },
];

export function getRecipeDef(id: string): RecipeDef | undefined {
  return RECIPES.find((r) => r.id === id);
}

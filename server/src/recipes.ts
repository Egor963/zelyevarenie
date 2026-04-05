import type { RecipeDef } from "./types.js";

/** Каталог рецептов на основе данных из Word файла */
export const RECIPES: RecipeDef[] = [
  // Маленькие зелья (2 очка)
  {
    id: "love_potion",
    name: "Любовное зелье",
    needs: { "камень крови": 1, "корень мандрагоры": 1 },
    points: 2,
  },
  {
    id: "sleep_potion",
    name: "Зелье вечного сна",
    needs: { "родниковая вода": 1, "белладонна": 1 },
    points: 2,
  },
  {
    id: "invisibility_elixir",
    name: "Эликсир невидимости",
    needs: { "энергия мысли": 1, "кристалл воздуха": 1 },
    points: 2,
  },
  {
    id: "strength_elixir",
    name: "Эликсир силы",
    needs: { "астральная энергия": 1, "камень крови": 1 },
    points: 2,
  },
  {
    id: "isidas_mortum",
    name: "Исидас мортум",
    needs: { "крыло летучей мыши": 1, "энергия мысли": 1 },
    points: 2,
  },
  {
    id: "fire_elixir",
    name: "Эликсир огня",
    needs: { "волны эфира": 1, "огненный свет": 1 },
    points: 2,
  },
  {
    id: "divination_tincture",
    name: "Настой прорицания",
    needs: { "кристалл воздуха": 1, "мушрумы": 1 },
    points: 2,
  },
  
  // Порошки (2 очка)
  {
    id: "fate_powder",
    name: "Порошок судьбы",
    needs: { "белладонна": 1, "крыло летучей мыши": 1 },
    points: 2,
  },
  {
    id: "control_powder",
    name: "Порошок контроля",
    needs: { "глаз змеи": 1, "огненный свет": 1 },
    points: 2,
  },
  {
    id: "truth_powder",
    name: "Порошок истины",
    needs: { "огненный свет": 1, "астральная энергия": 1 },
    points: 2,
  },
  {
    id: "incorporeal_powder",
    name: "Порошок бестелесности",
    needs: { "астральная энергия": 1, "крыло летучей мыши": 1 },
    points: 2,
  },
  {
    id: "power_emanation",
    name: "Эманация власти",
    needs: { "зуб дракона": 1, "мушрумы": 1 },
    points: 2,
  },
  {
    id: "protection_solution",
    name: "Раствор оберег",
    needs: { "родниковая вода": 1, "корень мандрагоры": 1 },
    points: 2,
  },
  {
    id: "eternity_solution",
    name: "Раствор вечности",
    needs: { "корень мандрагоры": 1, "кристалл воздуха": 1 },
    points: 2,
  },
  
  // Эликсиры (2 очка)
  {
    id: "oblivion_elixir",
    name: "Эликсир забвения",
    needs: { "камень крови": 1, "мушрумы": 1 },
    points: 2,
  },
  {
    id: "wisdom_elixir",
    name: "Эликсир мудрости",
    needs: { "мушрумы": 1, "белладонна": 1 },
    points: 2,
  },
  {
    id: "loyalty_elixir",
    name: "Эликсир верности",
    needs: { "белладонна": 1, "крыло летучей мыши": 1 },
    points: 2,
  },
  {
    id: "invisibility_elixir2",
    name: "Эликсир невидимости",
    needs: { "крыло летучей мыши": 1, "глаз змеи": 1 },
    points: 2,
  },
  {
    id: "strength_elixir2",
    name: "Эликсир силы",
    needs: { "глаз змеи": 1, "волны эфира": 1 },
    points: 2,
  },
  {
    id: "fire_elixir2",
    name: "Эликсир огня",
    needs: { "волны эфира": 1, "огненный свет": 1 },
    points: 2,
  },
  {
    id: "eternal_youth_elixir",
    name: "Эликсир вечной молодости",
    needs: { "корень мандрагоры": 1, "родниковая вода": 1 },
    points: 2,
  },
  {
    id: "plants_master_elixir",
    name: "Эликсир повелителя растений",
    needs: { "родниковая вода": 1, "корень мандрагоры": 1 },
    points: 2,
  },
  {
    id: "flight_elixir",
    name: "Эликсир полета",
    needs: { "корень мандрагоры": 1, "астральная энергия": 1, "кристалл воздуха": 1 },
    points: 2,
  },
  
  // Телепатическое снадобье (3 очка)
  {
    id: "telepathic_potion",
    name: "Телепатическое снадобье",
    needs: { "камень крови": 1, "энергия мысли": 1, "мушрумы": 1 },
    points: 3,
  },
  
  // Великие зелья (5 очков) - требуют базовые элементы
  {
    id: "great_power_elixir",
    name: "Великий эликсир могущества",
    needs: { "энергия мысли": 1, "астральная энергия": 1 },
    points: 5,
    needsBuilt: [
      { recipeDefId: "strength_elixir", count: 1 },
      { recipeDefId: "invisibility_elixir", count: 1 }
    ]
  },
  {
    id: "great_timeless_elixir",
    name: "Великий эликсир безвременья",
    needs: { "родниковая вода": 1, "белладонна": 1 },
    points: 5,
    needsBuilt: [
      { recipeDefId: "oblivion_elixir", count: 1 },
      { recipeDefId: "sleep_potion", count: 1 }
    ]
  },
  {
    id: "great_love_elixir",
    name: "Великий эликсир вечной любви",
    needs: { "камень крови": 1, "корень мандрагоры": 1 },
    points: 5,
    needsBuilt: [
      { recipeDefId: "love_potion", count: 1 },
      { recipeDefId: "loyalty_elixir", count: 1 }
    ]
  },
  
  // Талисманы (5 очков)
  {
    id: "knowledge_talisman",
    name: "Талисман скрытого знания",
    needs: { "мушрумы": 1, "камень крови": 1 },
    points: 5,
    needsBuilt: [
      { recipeDefId: "oblivion_elixir", count: 1 },
      { recipeDefId: "wisdom_elixir", count: 1 }
    ]
  },
  {
    id: "palantir_talisman",
    name: "Талисман палантриум",
    needs: { "белладонна": 1, "крыло летучей мыши": 1 },
    points: 5,
    needsBuilt: [
      { recipeDefId: "loyalty_elixir", count: 1 },
      { recipeDefId: "telepathic_potion", count: 1 }
    ]
  },
  {
    id: "teleport_talisman",
    name: "Талисман телепортации",
    needs: { "родниковая вода": 1, "корень мандрагоры": 1 },
    points: 5,
    needsBuilt: [
      { recipeDefId: "protection_solution", count: 1 },
      { recipeDefId: "flight_elixir", count: 1 }
    ]
  },
  {
    id: "beasts_master_talisman",
    name: "Талисман повелителя зверей",
    needs: { "мушрумы": 1, "родниковая вода": 1 },
    points: 5,
    needsBuilt: [
      { recipeDefId: "polyglotum_potion", count: 1 },
      { recipeDefId: "plants_master_elixir", count: 1 }
    ]
  }
];

export function getRecipeDef(id: string): RecipeDef | undefined {
  return RECIPES.find((r) => r.id === id);
}

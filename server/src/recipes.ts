import type { RecipeDef } from "./types.js";

/** Точные рецепты из JSONL данных */
export const RECIPES: RecipeDef[] = [
  // Маленькие зелья (2 очка)
  {
    id: "love_potion",
    name: "любовное зелье",
    needs: { "камень крови": 1, "корень мандрагоры": 1 },
    points: 2,
  },
  {
    id: "sleep_potion",
    name: "зелье вечного сна",
    needs: { "родниковая вода": 1, "белладонна": 1 },
    points: 2,
  },
  {
    id: "invisibility_elixir",
    name: "эликсир невидимости",
    needs: { "энергия мысли": 1, "кристалл воздуха": 1 },
    points: 2,
  },
  {
    id: "strength_elixir",
    name: "эликсир силы",
    needs: { "астральная энергия": 1, "камень крови": 1 },
    points: 2,
  },
  {
    id: "isidas_mortum",
    name: "исидас мортум",
    needs: { "крыло летучей мыши": 1, "энергия мысли": 1 },
    points: 2,
  },
  {
    id: "fire_elixir",
    name: "эликсир огня",
    needs: { "волны эфира": 1, "огненный свет": 1 },
    points: 2,
  },
  {
    id: "eternity_solution",
    name: "раствор вечности",
    needs: { "мушрумы": 1, "перо феникса": 1 },
    points: 2,
  },
  {
    id: "eternal_youth_elixir",
    name: "эликсир вечной молодости",
    needs: { "перо феникса": 1, "волны эфира": 1 },
    points: 2,
  },
  {
    id: "loyalty_elixir",
    name: "эликсир верности",
    needs: { "корень мандрагоры": 1, "зуб дракона": 1 },
    points: 2,
  },
  {
    id: "knowledge_elixir",
    name: "эликсир знания",
    needs: { "огненный свет": 1, "цветок папоротника": 1 },
    points: 2,
  },
  {
    id: "secret_vision_elixir",
    name: "эликсир тайного зрения",
    needs: { "глаз змеи": 1, "астральная энергия": 1 },
    points: 2,
  },
  {
    id: "protection_solution",
    name: "раствор-оберег",
    needs: { "зуб дракона": 1, "квинтэссенция воли": 1 },
    points: 2,
  },
  {
    id: "wisdom_elixir",
    name: "эликсир мудрости",
    needs: { "волны эфира": 1, "родниковая вода": 1, "цветок папоротника": 1 },
    points: 3,
  },
  {
    id: "oblivion_elixir",
    name: "эликсир забвения",
    needs: { "белладонна": 1, "крыло летучей мыши": 1 },
    points: 2,
  },
  {
    id: "polyglotum_potion",
    name: "зелье полиглотум",
    needs: { "цветок папоротника": 1, "глаз змеи": 1 },
    points: 2,
  },
  {
    id: "power_emanation",
    name: "эманация власти",
    needs: { "квинтэссенция воли": 1, "родниковая вода": 1 },
    points: 2,
  },
  {
    id: "divination_tincture",
    name: "настой прорицания",
    needs: { "кристалл воздуха": 1, "мушрумы": 1 },
    points: 2,
  },
  {
    id: "plants_master_elixir",
    name: "эликсир повелителя растений",
    needs: { "белладонна": 1, "огненный свет": 1, "квинтэссенция воли": 1 },
    points: 3,
  },
  {
    id: "telepathic_potion",
    name: "телепатическое снадобье",
    needs: { "камень крови": 1, "энергия мысли": 1, "мушрумы": 1 },
    points: 3,
  },
  
  // Великие зелья (4-6 очков)
  {
    id: "control_powder",
    name: "порошок контроля",
    needs: { "любовное зелье": 1, "зуб дракона": 1 },
    points: 4,
    needsBuilt: [
      { recipeDefId: "love_potion", count: 1 }
    ]
  },
  {
    id: "truth_powder",
    name: "порошок истины",
    needs: { "эликсир знания": 1, "глаз змеи": 1 },
    points: 4,
    needsBuilt: [
      { recipeDefId: "knowledge_elixir", count: 1 }
    ]
  },
  {
    id: "incorporeal_powder",
    name: "порошок бестелесности",
    needs: { "зелье вечного сна": 1, "крыло летучей мыши": 1 },
    points: 4,
    needsBuilt: [
      { recipeDefId: "sleep_potion", count: 1 }
    ]
  },
  {
    id: "fate_powder",
    name: "порошок судьбы",
    needs: { "настой прорицания": 1, "перо феникса": 1 },
    points: 4,
    needsBuilt: [
      { recipeDefId: "divination_tincture", count: 1 }
    ]
  },
  
  // Великие эликсиры (6 очков)
  {
    id: "great_omen_elixir",
    name: "великий эликсир предзнаменования",
    needs: { "раствор вечности": 1, "настой прорицания": 1 },
    points: 6,
    needsBuilt: [
      { recipeDefId: "eternity_solution", count: 1 },
      { recipeDefId: "divination_tincture", count: 1 }
    ]
  },
  {
    id: "great_resurrection_elixir",
    name: "великий эликсир возрождения",
    needs: { "эликсир огня": 1, "эликсир вечной молодости": 1 },
    points: 6,
    needsBuilt: [
      { recipeDefId: "fire_elixir", count: 1 },
      { recipeDefId: "eternal_youth_elixir", count: 1 }
    ]
  },
  {
    id: "great_clairvoyance_elixir",
    name: "великий эликсир прозрения",
    needs: { "эликсир знания": 1, "зелье полиглотум": 1 },
    points: 6,
    needsBuilt: [
      { recipeDefId: "knowledge_elixir", count: 1 },
      { recipeDefId: "polyglotum_potion", count: 1 }
    ]
  },
  {
    id: "great_protection_elixir",
    name: "великий эликсир защиты",
    needs: { "эманация власти": 1, "раствор-оберег": 1 },
    points: 6,
    needsBuilt: [
      { recipeDefId: "power_emanation", count: 1 },
      { recipeDefId: "protection_solution", count: 1 }
    ]
  },
  {
    id: "great_disappearance_elixir",
    name: "великий эликсир исчезновения",
    needs: { "эликсир невидимости": 1, "исидас мортум": 1 },
    points: 6,
    needsBuilt: [
      { recipeDefId: "invisibility_elixir", count: 1 },
      { recipeDefId: "isidas_mortum", count: 1 }
    ]
  },
  {
    id: "great_timeless_elixir",
    name: "великий эликсир безвременья",
    needs: { "эликсир забвения": 1, "зелье вечного сна": 1 },
    points: 6,
    needsBuilt: [
      { recipeDefId: "oblivion_elixir", count: 1 },
      { recipeDefId: "sleep_potion", count: 1 }
    ]
  },
  {
    id: "great_power_elixir",
    name: "великий эликсир могущества",
    needs: { "эликсир силы": 1, "эликсир тайного зрения": 1 },
    points: 6,
    needsBuilt: [
      { recipeDefId: "strength_elixir", count: 1 },
      { recipeDefId: "secret_vision_elixir", count: 1 }
    ]
  },
  {
    id: "great_love_elixir",
    name: "великий эликсир вечной любви",
    needs: { "любовное зелье": 1, "эликсир верности": 1 },
    points: 6,
    needsBuilt: [
      { recipeDefId: "love_potion", count: 1 },
      { recipeDefId: "loyalty_elixir", count: 1 }
    ]
  },
  
  // Талисманы (8 очков)
  {
    id: "knowledge_talisman",
    name: "талисман скрытого знания",
    needs: { "эликсир забвения": 1, "эликсир мудрости": 1 },
    points: 8,
    needsBuilt: [
      { recipeDefId: "oblivion_elixir", count: 1 },
      { recipeDefId: "wisdom_elixir", count: 1 }
    ]
  },
  {
    id: "palantir_talisman",
    name: "талисман палантриум",
    needs: { "эликсир верности": 1, "телепатическое снадобье": 1 },
    points: 8,
    needsBuilt: [
      { recipeDefId: "loyalty_elixir", count: 1 },
      { recipeDefId: "telepathic_potion", count: 1 }
    ]
  },
  {
    id: "unicorn",
    name: "единорог",
    needs: { "раствор-оберег": 1, "эликсир мудрости": 1 },
    points: 8,
    needsBuilt: [
      { recipeDefId: "protection_solution", count: 1 },
      { recipeDefId: "wisdom_elixir", count: 1 }
    ]
  },
  {
    id: "teleport_talisman",
    name: "талисман телепортации",
    needs: { "раствор вечности": 1, "эликсир полета": 1 },
    points: 8,
    needsBuilt: [
      { recipeDefId: "eternity_solution", count: 1 },
      { recipeDefId: "flight_elixir", count: 1 }
    ]
  },
  {
    id: "beasts_master_talisman",
    name: "талисман повелителя зверей",
    needs: { "зелье полиглотум": 1, "эликсир повелителя растений": 1 },
    points: 8,
    needsBuilt: [
      { recipeDefId: "polyglotum_potion", count: 1 },
      { recipeDefId: "plants_master_elixir", count: 1 }
    ]
  },
  {
    id: "griffin",
    name: "грифон",
    needs: { "исидас мортум": 1, "эликсир полета": 1 },
    points: 8,
    needsBuilt: [
      { recipeDefId: "isidas_mortum", count: 1 },
      { recipeDefId: "flight_elixir", count: 1 }
    ]
  },
  {
    id: "invisible_guardian",
    name: "незримый страж",
    needs: { "порошок судьбы": 1, "эликсир невидимости": 1 },
    points: 8,
    needsBuilt: [
      { recipeDefId: "fate_powder", count: 1 },
      { recipeDefId: "invisibility_elixir", count: 1 }
    ]
  },
  {
    id: "dragon",
    name: "дракон",
    needs: { "порошок контроля": 1, "эликсир силы": 1 },
    points: 8,
    needsBuilt: [
      { recipeDefId: "control_powder", count: 1 },
      { recipeDefId: "strength_elixir", count: 1 }
    ]
  },
  {
    id: "fire_salamander",
    name: "огненная саламандра",
    needs: { "порошок истины": 1, "эликсир огня": 1 },
    points: 8,
    needsBuilt: [
      { recipeDefId: "truth_powder", count: 1 },
      { recipeDefId: "fire_elixir", count: 1 }
    ]
  },
  {
    id: "banshee",
    name: "баньши",
    needs: { "порошок бестелесности": 1, "эманация власти": 1 },
    points: 8,
    needsBuilt: [
      { recipeDefId: "incorporeal_powder", count: 1 },
      { recipeDefId: "power_emanation", count: 1 }
    ]
  },
  {
    id: "basilisk",
    name: "василиск",
    needs: { "эликсир тайного зрения": 1, "телепатическое снадобье": 1 },
    points: 8,
    needsBuilt: [
      { recipeDefId: "secret_vision_elixir", count: 1 },
      { recipeDefId: "telepathic_potion", count: 1 }
    ]
  },
  
  // Ультимативные (10 очков)
  // Верховный эликсир - для клиента
  {
    id: "supreme_elixir",
    name: "верховный эликсир",
    needs: {},
    points: 10
  },
  
  {
    id: "great_magic_talisman",
    name: "великий талисман магии",
    needs: { "любой талисман": 2 },
    points: 10,
    needsBuilt: [
      { recipeDefId: "knowledge_talisman", count: 1 },
      { recipeDefId: "palantir_talisman", count: 1 },
      { recipeDefId: "teleport_talisman", count: 1 },
      { recipeDefId: "beasts_master_talisman", count: 1 }
    ]
  },
  {
    id: "avocado_cadaver",
    name: "авокадо кадавр",
    needs: { "эликсир вечной молодости": 1, "эликсир повелителя растений": 1 },
    points: 8,
    needsBuilt: [
      { recipeDefId: "eternal_youth_elixir", count: 1 },
      { recipeDefId: "plants_master_elixir", count: 1 }
    ]
  }
];

export function getRecipeDef(id: string): RecipeDef | undefined {
  return RECIPES.find((r) => r.id === id);
}

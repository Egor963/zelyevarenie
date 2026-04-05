/**
 * Маппинг всех 76 карточек игры
 */

export interface CardData {
  id: string;
  image: string;
  topType: 'recipe' | 'spell';
  topContent: string;
  bottomElement: string;
  points?: number;
}

// Карточки с данными из Word файла
export const CARDS: CardData[] = [
  // Карточка 1 - Любовное зелье
  { id: "1", image: "/cards/1.png", topType: "recipe", topContent: "Любовное зелье", bottomElement: "кристалл воздуха", points: 2 },
  
  // Карточка 2 - Зелье вечного сна
  { id: "2", image: "/cards/2.png", topType: "recipe", topContent: "Зелье вечного сна", bottomElement: "огненный свет", points: 2 },
  
  // Карточка 3 - Эликсир невидимости
  { id: "3", image: "/cards/3.png", topType: "recipe", topContent: "Эликсир невидимости", bottomElement: "астральная энергия", points: 2 },
  
  // Карточка 4 - Эликсир силы
  { id: "4", image: "/cards/4.png", topType: "recipe", topContent: "Эликсир силы", bottomElement: "энергия мысли", points: 2 },
  
  // Карточка 5 - Исидас мортум
  { id: "5", image: "/cards/5.png", topType: "recipe", topContent: "Исидас мортум", bottomElement: "глаз змеи", points: 2 },
  
  // Карточка 6 - Эликсир огня
  { id: "6", image: "/cards/6.png", topType: "recipe", topContent: "Эликсир огня", bottomElement: "волны эфира", points: 2 },
  
  // Карточка 7 - Настой прорицания
  { id: "7", image: "/cards/7.png", topType: "recipe", topContent: "Настой прорицания", bottomElement: "камень крови", points: 2 },
  
  // Карточка 8 - Телепатическое снадобье
  { id: "8", image: "/cards/8.png", topType: "recipe", topContent: "Телепатическое снадобье", bottomElement: "волны эфира", points: 3 },
  
  // Карточка 9 - Заклинание: Взять со стола
  { id: "9", image: "/cards/9.png", topType: "spell", topContent: "Взять со стола", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 10 - Заклинание: Взять со стола
  { id: "10", image: "/cards/10.png", topType: "spell", topContent: "Взять со стола", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 11 - Заклинание: Взять со стола
  { id: "11", image: "/cards/11.png", topType: "spell", topContent: "Взять со стола", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 12 - Заклинание: Разобрать рецепт
  { id: "12", image: "/cards/12.png", topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 13 - Заклинание: Разобрать рецепт
  { id: "13", image: "/cards/13.png", topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 14 - Заклинание: Разобрать рецепт
  { id: "14", image: "/cards/14.png", topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 15 - Заклинание: Разобрать рецепт
  { id: "15", image: "/cards/15.png", topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 16 - Заклинание: Обмен
  { id: "16", image: "/cards/16.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 17 - Заклинание: Обмен
  { id: "17", image: "/cards/17.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 18 - Заклинание: Обмен
  { id: "18", image: "/cards/18.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 19 - Порошок судьбы
  { id: "19", image: "/cards/19.png", topType: "recipe", topContent: "Порошок судьбы", bottomElement: "белладонна", points: 2 },
  
  // Карточка 20 - Порошок контроля
  { id: "20", image: "/cards/20.png", topType: "recipe", topContent: "Порошок контроля", bottomElement: "крыло летучей мыши", points: 2 },
  
  // Карточка 21 - Порошок истины
  { id: "21", image: "/cards/21.png", topType: "recipe", topContent: "Порошок истины", bottomElement: "огненный свет", points: 2 },
  
  // Карточка 22 - Порошок бестелесности
  { id: "22", image: "/cards/22.png", topType: "recipe", topContent: "Порошок бестелесности", bottomElement: "астральная энергия", points: 2 },
  
  // Карточка 23 - Эманация власти
  { id: "23", image: "/cards/23.png", topType: "recipe", topContent: "Эманация власти", bottomElement: "зуб дракона", points: 2 },
  
  // Карточка 24 - Раствор оберег
  { id: "24", image: "/cards/24.png", topType: "recipe", topContent: "Раствор оберег", bottomElement: "родниковая вода", points: 2 },
  
  // Карточка 25 - Раствор вечности
  { id: "25", image: "/cards/25.png", topType: "recipe", topContent: "Раствор вечности", bottomElement: "корень мандрагоры", points: 2 },
  
  // Карточка 26 - Эликсир забвения
  { id: "26", image: "/cards/26.png", topType: "recipe", topContent: "Эликсир забвения", bottomElement: "камень крови", points: 2 },
  
  // Карточка 27 - Эликсир мудрости
  { id: "27", image: "/cards/27.png", topType: "recipe", topContent: "Эликсир мудрости", bottomElement: "мушрумы", points: 2 },
  
  // Карточка 28 - Эликсир верности
  { id: "28", image: "/cards/28.png", topType: "recipe", topContent: "Эликсир верности", bottomElement: "белладонна", points: 2 },
  
  // Карточка 29 - Эликсир невидимости
  { id: "29", image: "/cards/29.png", topType: "recipe", topContent: "Эликсир невидимости", bottomElement: "крыло летучей мыши", points: 2 },
  
  // Карточка 30 - Эликсир силы
  { id: "30", image: "/cards/30.png", topType: "recipe", topContent: "Эликсир силы", bottomElement: "глаз змеи", points: 2 },
  
  // Карточка 31 - Эликсир огня
  { id: "31", image: "/cards/31.png", topType: "recipe", topContent: "Эликсир огня", bottomElement: "волны эфира", points: 2 },
  
  // Карточка 32 - Эликсир вечной молодости
  { id: "32", image: "/cards/32.png", topType: "recipe", topContent: "Эликсир вечной молодости", bottomElement: "корень мандрагоры", points: 2 },
  
  // Карточка 33 - Эликсир повелителя растений
  { id: "33", image: "/cards/33.png", topType: "recipe", topContent: "Эликсир повелителя растений", bottomElement: "родниковая вода", points: 2 },
  
  // Карточка 34 - Эликсир полета
  { id: "34", image: "/cards/34.png", topType: "recipe", topContent: "Эликсир полета", bottomElement: "кристалл воздуха", points: 2 },
  
  // Карточка 35 - Телепатическое снадобье
  { id: "35", image: "/cards/35.png", topType: "recipe", topContent: "Телепатическое снадобье", bottomElement: "волны эфира", points: 3 },
  
  // Карточка 36 - Любовное зелье
  { id: "36", image: "/cards/36.png", topType: "recipe", topContent: "Любовное зелье", bottomElement: "камень крови", points: 2 },
  
  // Карточка 37 - Заклинание: Разобрать рецепт
  { id: "37", image: "/cards/37.png", topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 38 - Заклинание: Разобрать рецепт
  { id: "38", image: "/cards/38.png", topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 39 - Заклинание: Обмен
  { id: "39", image: "/cards/39.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 40 - Заклинание: Обмен
  { id: "40", image: "/cards/40.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 41 - Заклинание: Обмен
  { id: "41", image: "/cards/41.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 42 - Заклинание: Обмен
  { id: "42", image: "/cards/42.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 43 - Заклинание: Обмен
  { id: "43", image: "/cards/43.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 44 - Заклинание: Обмен
  { id: "44", image: "/cards/44.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 45 - Заклинание: Обмен
  { id: "45", image: "/cards/45.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 46 - Заклинание: Обмен
  { id: "46", image: "/cards/46.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 47 - Заклинание: Обмен
  { id: "47", image: "/cards/47.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 48 - Заклинание: Обмен
  { id: "48", image: "/cards/48.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 49 - Заклинание: Обмен
  { id: "49", image: "/cards/49.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 50 - Заклинание: Обмен
  { id: "50", image: "/cards/50.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 51 - Заклинание: Обмен
  { id: "51", image: "/cards/51.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 52 - Заклинание: Обмен
  { id: "52", image: "/cards/52.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 53 - Заклинание: Обмен
  { id: "53", image: "/cards/53.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 54 - Заклинание: Обмен
  { id: "54", image: "/cards/54.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 55 - Заклинание: Обмен
  { id: "55", image: "/cards/55.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 56 - Заклинание: Обмен
  { id: "56", image: "/cards/56.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 57 - Великий эликсир могущества
  { id: "57", image: "/cards/57.png", topType: "recipe", topContent: "Великий эликсир могущества", bottomElement: "волны эфира", points: 5 },
  
  // Карточка 58 - Великий эликсир безвременья
  { id: "58", image: "/cards/58.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 5 },
  
  // Карточка 59 - Великий эликсир вечной любви
  { id: "59", image: "/cards/59.png", topType: "recipe", topContent: "Великий эликсир вечной любви", bottomElement: "огненный свет", points: 5 },
  
  // Карточка 60 - Талисман скрытого знания
  { id: "60", image: "/cards/60.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 5 },
  
  // Карточка 61 - Талисман палантриум
  { id: "61", image: "/cards/61.png", topType: "recipe", topContent: "Талисман палантриум", bottomElement: "кристалл воздуха", points: 5 },
  
  // Карточка 62 - Талисман телепортации
  { id: "62", image: "/cards/62.png", topType: "recipe", topContent: "Талисман телепортации", bottomElement: "камень крови", points: 5 },
  
  // Карточка 63 - Талисман повелителя зверей
  { id: "63", image: "/cards/63.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
  
  // Карточка 64 - Талисман повелителя растений
  { id: "64", image: "/cards/64.png", topType: "recipe", topContent: "Талисман повелителя растений", bottomElement: "корень мандрагоры", points: 5 },
  
  // Карточка 65 - Талисман повелителя зверей
  { id: "65", image: "/cards/65.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
  
  // Карточка 66 - Талисман повелителя зверей
  { id: "66", image: "/cards/66.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
  
  // Карточка 67 - Талисман повелителя зверей
  { id: "67", image: "/cards/67.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
  
  // Карточка 68 - Талисман повелителя зверей
  { id: "68", image: "/cards/68.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
  
  // Карточка 69 - Талисман повелителя зверей
  { id: "69", image: "/cards/69.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
  
  // Карточка 70 - Талисман повелителя зверей
  { id: "70", image: "/cards/70.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
  
  // Карточка 71 - Талисман повелителя зверей
  { id: "71", image: "/cards/71.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
  
  // Карточка 72 - Талисман повелителя зверей
  { id: "72", image: "/cards/72.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
  
  // Карточка 73 - Талисман повелителя зверей
  { id: "73", image: "/cards/73.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
  
  // Карточка 74 - Талисман повелителя зверей
  { id: "74", image: "/cards/74.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
  
  // Карточка 75 - Талисман повелителя зверей
  { id: "75", image: "/cards/75.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 },
  
  // Карточка 76 - Талисман повелителя зверей
  { id: "76", image: "/cards/76.png", topType: "recipe", topContent: "Талисман повелителя зверей", bottomElement: "родниковая вода", points: 5 }
];

/**
 * Получить карточку по ID
 */
export function getCardById(id: string): CardData | undefined {
  return CARDS.find(card => card.id === id);
}

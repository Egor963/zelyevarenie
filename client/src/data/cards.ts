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
  // Карточка 1
  { id: "1", image: "/cards/1.png", topType: "recipe", topContent: "", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 2
  { id: "2", image: "/cards/2.png", topType: "recipe", topContent: "Настой прорицания", bottomElement: "камень крови", points: 0 },
  
  // Карточка 3
  { id: "3", image: "/cards/3.png", topType: "recipe", topContent: "Эликсир полета", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 4
  { id: "4", image: "/cards/4.png", topType: "recipe", topContent: "Порошок судьбы", bottomElement: "белладонна", points: 0 },
  
  // Карточка 5
  { id: "5", image: "/cards/5.png", topType: "recipe", topContent: "", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 6
  { id: "6", image: "/cards/6.png", topType: "recipe", topContent: "Великий эликсир могущества", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 7
  { id: "7", image: "/cards/7.png", topType: "recipe", topContent: "Великий эликсир могущества", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 8
  { id: "8", image: "/cards/8.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 9
  { id: "9", image: "/cards/9.png", topType: "spell", topContent: "Взять со стола", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 10
  { id: "10", image: "/cards/10.png", topType: "spell", topContent: "Взять со стола", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 11
  { id: "11", image: "/cards/11.png", topType: "spell", topContent: "Взять со стола", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 12
  { id: "12", image: "/cards/12.png", topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 13
  { id: "13", image: "/cards/13.png", topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 14
  { id: "14", image: "/cards/14.png", topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 15
  { id: "15", image: "/cards/15.png", topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 16
  { id: "16", image: "/cards/16.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 17
  { id: "17", image: "/cards/17.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 18
  { id: "18", image: "/cards/18.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 19
  { id: "19", image: "/cards/19.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 20
  { id: "20", image: "/cards/20.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 21
  { id: "21", image: "/cards/21.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 22
  { id: "22", image: "/cards/22.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 23
  { id: "23", image: "/cards/23.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 24
  { id: "24", image: "/cards/24.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 25
  { id: "25", image: "/cards/25.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 26
  { id: "26", image: "/cards/26.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 27
  { id: "27", image: "/cards/27.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 28
  { id: "28", image: "/cards/28.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 29
  { id: "29", image: "/cards/29.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 30
  { id: "30", image: "/cards/30.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 31
  { id: "31", image: "/cards/31.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 32
  { id: "32", image: "/cards/32.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 33
  { id: "33", image: "/cards/33.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 34
  { id: "34", image: "/cards/34.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 35
  { id: "35", image: "/cards/35.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 36
  { id: "36", image: "/cards/36.png", topType: "recipe", topContent: "Великий эликсир безвременья", bottomElement: "камень крови", points: 0 },
  
  // Карточка 37
  { id: "37", image: "/cards/37.png", topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 38
  { id: "38", image: "/cards/38.png", topType: "spell", topContent: "Разобрать рецепт", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 39
  { id: "39", image: "/cards/39.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 40
  { id: "40", image: "/cards/40.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 41
  { id: "41", image: "/cards/41.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 42
  { id: "42", image: "/cards/42.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 43
  { id: "43", image: "/cards/43.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 44
  { id: "44", image: "/cards/44.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 45
  { id: "45", image: "/cards/45.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 46
  { id: "46", image: "/cards/46.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 47
  { id: "47", image: "/cards/47.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 48
  { id: "48", image: "/cards/48.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 49
  { id: "49", image: "/cards/49.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 50
  { id: "50", image: "/cards/50.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 51
  { id: "51", image: "/cards/51.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 52
  { id: "52", image: "/cards/52.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 53
  { id: "53", image: "/cards/53.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 54
  { id: "54", image: "/cards/54.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 55
  { id: "55", image: "/cards/55.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 56
  { id: "56", image: "/cards/56.png", topType: "spell", topContent: "Обмен", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 57
  { id: "57", image: "/cards/57.png", topType: "recipe", topContent: "Великий эликсир могущества", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 58
  { id: "58", image: "/cards/58.png", topType: "recipe", topContent: "Великий эликсир могущества", bottomElement: "волны эфира", points: 0 },
  
  // Карточка 59
  { id: "59", image: "/cards/59.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 60
  { id: "60", image: "/cards/60.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 61
  { id: "61", image: "/cards/61.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 62
  { id: "62", image: "/cards/62.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 63
  { id: "63", image: "/cards/63.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 64
  { id: "64", image: "/cards/64.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 65
  { id: "65", image: "/cards/65.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 66
  { id: "66", image: "/cards/66.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 67
  { id: "67", image: "/cards/67.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 68
  { id: "68", image: "/cards/68.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 69
  { id: "69", image: "/cards/69.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 70
  { id: "70", image: "/cards/70.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 71
  { id: "71", image: "/cards/71.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 72
  { id: "72", image: "/cards/72.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 73
  { id: "73", image: "/cards/73.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 74
  { id: "74", image: "/cards/74.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 75
  { id: "75", image: "/cards/75.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 },
  
  // Карточка 76
  { id: "76", image: "/cards/76.png", topType: "recipe", topContent: "Талисман скрытого знания", bottomElement: "огненный свет", points: 0 }
];

/**
 * Получить карточку по ID
 */
export function getCardById(id: string): CardData | undefined {
  return CARDS.find(card => card.id === id);
}

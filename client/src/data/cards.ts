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

// Маппинг карточек по страницам и позициям
export const CARDS: CardData[] = [
  // Page 1 (cards 01-09)
  { id: 'page01_card01', image: '/cards/page01_card01.png', topType: 'recipe', topContent: 'Туман', bottomElement: 'огонь', points: 3 },
  { id: 'page01_card02', image: '/cards/page01_card02.png', topType: 'recipe', topContent: 'Туман', bottomElement: 'вода', points: 3 },
  { id: 'page01_card03', image: '/cards/page01_card03.png', topType: 'recipe', topContent: 'Ил', bottomElement: 'земля', points: 3 },
  { id: 'page01_card04', image: '/cards/page01_card04.png', topType: 'recipe', topContent: 'Ил', bottomElement: 'вода', points: 3 },
  { id: 'page01_card05', image: '/cards/page01_card05.png', topType: 'recipe', topContent: 'Искра', bottomElement: 'металл', points: 4 },
  { id: 'page01_card06', image: '/cards/page01_card06.png', topType: 'recipe', topContent: 'Искра', bottomElement: 'огонь', points: 4 },
  { id: 'page01_card07', image: '/cards/page01_card07.png', topType: 'recipe', topContent: 'Рассвет', bottomElement: 'свет', points: 4 },
  { id: 'page01_card08', image: '/cards/page01_card08.png', topType: 'recipe', topContent: 'Рассвет', bottomElement: 'воздух', points: 4 },
  { id: 'page01_card09', image: '/cards/page01_card09.png', topType: 'spell', topContent: 'Взять со стола', bottomElement: 'тьма' },

  // Page 2 (cards 01-09)
  { id: 'page02_card01', image: '/cards/page02_card01.png', topType: 'spell', topContent: 'Взять со стола', bottomElement: 'жизнь' },
  { id: 'page02_card02', image: '/cards/page02_card02.png', topType: 'spell', topContent: 'Взять со стола', bottomElement: 'металл' },
  { id: 'page02_card03', image: '/cards/page02_card03.png', topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'огонь' },
  { id: 'page02_card04', image: '/cards/page02_card04.png', topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'вода' },
  { id: 'page02_card05', image: '/cards/page02_card05.png', topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'земля' },
  { id: 'page02_card06', image: '/cards/page02_card06.png', topType: 'spell', topContent: 'Обмен', bottomElement: 'воздух' },
  { id: 'page02_card07', image: '/cards/page02_card07.png', topType: 'spell', topContent: 'Обмен', bottomElement: 'свет' },
  { id: 'page02_card08', image: '/cards/page02_card08.png', topType: 'spell', topContent: 'Обмен', bottomElement: 'тьма' },
  { id: 'page02_card09', image: '/cards/page02_card09.png', topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'тьма', points: 5 },

  // Page 3 (cards 01-09)
  { id: 'page03_card01', image: '/cards/page03_card01.png', topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'жизнь', points: 5 },
  { id: 'page03_card02', image: '/cards/page03_card02.png', topType: 'recipe', topContent: 'Буря', bottomElement: 'воздух', points: 6 },
  { id: 'page03_card03', image: '/cards/page03_card03.png', topType: 'recipe', topContent: 'Буря', bottomElement: 'вода', points: 6 },
  { id: 'page03_card04', image: '/cards/page03_card04.png', topType: 'recipe', topContent: 'Буря', bottomElement: 'металл', points: 6 },
  { id: 'page03_card05', image: '/cards/page03_card05.png', topType: 'recipe', topContent: 'Квинтэссенция', bottomElement: 'огонь', points: 8 },
  { id: 'page03_card06', image: '/cards/page03_card06.png', topType: 'recipe', topContent: 'Квинтэссенция', bottomElement: 'вода', points: 8 },
  { id: 'page03_card07', image: '/cards/page03_card07.png', topType: 'recipe', topContent: 'Квинтэссенция', bottomElement: 'земля', points: 8 },
  { id: 'page03_card08', image: '/cards/page03_card08.png', topType: 'recipe', topContent: 'Квинтэссенция', bottomElement: 'воздух', points: 8 },
  { id: 'page03_card09', image: '/cards/page03_card09.png', topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'земля', points: 6 },

  // Page 4 (cards 01-09)
  { id: 'page04_card01', image: '/cards/page04_card01.png', topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'огонь' },
  { id: 'page04_card02', image: '/cards/page04_card02.png', topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'вода' },
  { id: 'page04_card03', image: '/cards/page04_card03.png', topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'жизнь', points: 10 },
  { id: 'page04_card04', image: '/cards/page04_card04.png', topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'тьма' },
  { id: 'page04_card05', image: '/cards/page04_card05.png', topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'свет' },
  { id: 'page04_card06', image: '/cards/page04_card06.png', topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'металл' },
  { id: 'page04_card07', image: '/cards/page04_card07.png', topType: 'spell', topContent: 'Взять со стола', bottomElement: 'земля' },
  { id: 'page04_card08', image: '/cards/page04_card08.png', topType: 'spell', topContent: 'Взять со стола', bottomElement: 'воздух' },
  { id: 'page04_card09', image: '/cards/page04_card09.png', topType: 'spell', topContent: 'Взять со стола', bottomElement: 'свет' },

  // Page 5 (cards 01-09)
  { id: 'page05_card01', image: '/cards/page05_card01.png', topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'жизнь' },
  { id: 'page05_card02', image: '/cards/page05_card02.png', topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'металл' },
  { id: 'page05_card03', image: '/cards/page05_card03.png', topType: 'spell', topContent: 'Обмен', bottomElement: 'огонь' },
  { id: 'page05_card04', image: '/cards/page05_card04.png', topType: 'spell', topContent: 'Обмен', bottomElement: 'вода' },
  { id: 'page05_card05', image: '/cards/page05_card05.png', topType: 'recipe', topContent: 'Туман', bottomElement: 'воздух' },
  { id: 'page05_card06', image: '/cards/page05_card06.png', topType: 'recipe', topContent: 'Туман', bottomElement: 'свет' },
  { id: 'page05_card07', image: '/cards/page05_card07.png', topType: 'recipe', topContent: 'Ил', bottomElement: 'тьма' },
  { id: 'page05_card08', image: '/cards/page05_card08.png', topType: 'recipe', topContent: 'Ил', bottomElement: 'жизнь' },
  { id: 'page05_card09', image: '/cards/page05_card09.png', topType: 'recipe', topContent: 'Искра', bottomElement: 'воздух' },

  // Page 6 (cards 01-09)
  { id: 'page06_card01', image: '/cards/page06_card01.png', topType: 'recipe', topContent: 'Искра', bottomElement: 'свет' },
  { id: 'page06_card02', image: '/cards/page06_card02.png', topType: 'recipe', topContent: 'Искра', bottomElement: 'тьма' },
  { id: 'page06_card03', image: '/cards/page06_card03.png', topType: 'recipe', topContent: 'Рассвет', bottomElement: 'огонь' },
  { id: 'page06_card04', image: '/cards/page06_card04.png', topType: 'recipe', topContent: 'Рассвет', bottomElement: 'вода' },
  { id: 'page06_card05', image: '/cards/page06_card05.png', topType: 'recipe', topContent: 'Рассвет', bottomElement: 'земля' },
  { id: 'page06_card06', image: '/cards/page06_card06.png', topType: 'recipe', topContent: 'Рассвет', bottomElement: 'металл' },
  { id: 'page06_card07', image: '/cards/page06_card07.png', topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'огонь' },
  { id: 'page06_card08', image: '/cards/page06_card08.png', topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'вода' },
  { id: 'page06_card09', image: '/cards/page06_card09.png', topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'земля' },

  // Page 7 (cards 01-09)
  { id: 'page07_card01', image: '/cards/page07_card01.png', topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'воздух' },
  { id: 'page07_card02', image: '/cards/page07_card02.png', topType: 'recipe', topContent: 'Тенежизнь', bottomElement: 'свет' },
  { id: 'page07_card03', image: '/cards/page07_card03.png', topType: 'recipe', topContent: 'Буря', bottomElement: 'огонь' },
  { id: 'page07_card04', image: '/cards/page07_card04.png', topType: 'recipe', topContent: 'Буря', bottomElement: 'земля' },
  { id: 'page07_card05', image: '/cards/page07_card05.png', topType: 'recipe', topContent: 'Буря', bottomElement: 'тьма' },
  { id: 'page07_card06', image: '/cards/page07_card06.png', topType: 'recipe', topContent: 'Буря', bottomElement: 'жизнь' },
  { id: 'page07_card07', image: '/cards/page07_card07.png', topType: 'recipe', topContent: 'Буря', bottomElement: 'свет' },
  { id: 'page07_card08', image: '/cards/page07_card08.png', topType: 'recipe', topContent: 'Буря', bottomElement: 'металл' },
  { id: 'page07_card09', image: '/cards/page07_card09.png', topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'воздух' },

  // Page 8 (cards 01-09)
  { id: 'page08_card01', image: '/cards/page08_card01.png', topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'свет' },
  { id: 'page08_card02', image: '/cards/page08_card02.png', topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'тьма' },
  { id: 'page08_card03', image: '/cards/page08_card03.png', topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'жизнь' },
  { id: 'page08_card04', image: '/cards/page08_card04.png', topType: 'recipe', topContent: 'Сильный эликсир', bottomElement: 'металл' },
  { id: 'page08_card05', image: '/cards/page08_card05.png', topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'огонь' },
  { id: 'page08_card06', image: '/cards/page08_card06.png', topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'вода' },
  { id: 'page08_card07', image: '/cards/page08_card07.png', topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'земля' },
  { id: 'page08_card08', image: '/cards/page08_card08.png', topType: 'recipe', topContent: 'Чародейская связь', bottomElement: 'воздух' },
  { id: 'page08_card09', image: '/cards/page08_card09.png', topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'тьма' },

  // Page 9 (cards 01-04)
  { id: 'page09_card01', image: '/cards/page09_card01.png', topType: 'spell', topContent: 'Разобрать рецепт', bottomElement: 'свет' },
  { id: 'page09_card02', image: '/cards/page09_card02.png', topType: 'spell', topContent: 'Обмен', bottomElement: 'жизнь' },
  { id: 'page09_card03', image: '/cards/page09_card03.png', topType: 'spell', topContent: 'Обмен', bottomElement: 'металл' },
  { id: 'page09_card04', image: '/cards/page09_card04.png', topType: 'spell', topContent: 'Обмен', bottomElement: 'земля' }
];

/**
 * Получить карточку по ID
 */
export function getCardById(id: string): CardData | undefined {
  return CARDS.find(card => card.id === id);
}

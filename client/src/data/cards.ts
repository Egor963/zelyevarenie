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

// Временный маппинг - будет заполнен когда ты пришлешь данные
export const CARDS: CardData[] = [];

/**
 * Получить карточку по ID
 */
export function getCardById(id: string): CardData | undefined {
  return CARDS.find(card => card.id === id);
}

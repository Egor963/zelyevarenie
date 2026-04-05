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

// Загружаем карточки из обработанного Word файла
import * as fs from 'fs';
import type { CardData } from './types';

const clientCards: CardData[] = JSON.parse(fs.readFileSync('../../client-cards.json', 'utf8'));

export const CARDS = clientCards;

/**
 * Получить карточку по ID
 */
export function getCardById(id: string): CardData | undefined {
  return CARDS.find(card => card.id === id);
}

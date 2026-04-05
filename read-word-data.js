#!/usr/bin/env node

/**
 * Скрипт для чтения данных из Word файла и создания маппингов
 */

const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

// Имя файла с данными
const WORD_FILE = 'Номер карточки таблица.docx';

async function readWordFile() {
  try {
    // Проверяем существует ли файл
    if (!fs.existsSync(WORD_FILE)) {
      console.error(`❌ Файл ${WORD_FILE} не найден!`);
      return null;
    }

    console.log(`📄 Читаю файл: ${WORD_FILE}`);
    
    // Читаем файл с помощью mammoth
    const result = await mammoth.extractRawText({path: WORD_FILE});
    
    if (result.value) {
      console.log('✅ Текст извлечен успешно!');
      console.log(`📊 Длина текста: ${result.value.length} символов`);
      return result.value;
    } else {
      console.error('❌ Не удалось извлечь текст из файла');
      if (result.messages.length > 0) {
        console.error('Сообщения об ошибках:', result.messages);
      }
      return null;
    }
  } catch (error) {
    console.error('❌ Ошибка при чтении файла:', error.message);
    return null;
  }
}

function parseCardData(text) {
  if (!text) return null;
  
  const cards = {};
  const lines = text.split('\n');
  
  console.log('\n🔍 Анализ строк:');
  
  let currentCard = null;
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Пропускаем пустые строки и заголовки
    if (!line || line.includes('Номер карточки') || line.includes('Количество очков') || 
        line.includes('Название карточки') || line.includes('Элементы из которых состоит') || 
        line.includes('Элемент снизу')) {
      i++;
      continue;
    }
    
    // Ищем номер карточки (цифра в отдельной строке)
    const cardNumber = parseInt(line);
    if (!isNaN(cardNumber) && cardNumber > 0 && cardNumber <= 76) {
      // Сохраняем предыдущую карточку если есть
      if (currentCard && currentCard.number) {
        cards[currentCard.number] = currentCard;
        console.log(`✅ Карточка ${currentCard.number}: ${currentCard.name}`);
      }
      
      // Начинаем новую карточку
      currentCard = {
        number: cardNumber,
        name: '',
        points: 0,
        elements: '',
        bottomElement: ''
      };
      
      console.log(`🎴 Найдена карточка №${cardNumber}`);
      i++;
      continue;
    }
    
    // Обрабатываем данные для текущей карточки
    if (currentCard) {
      // Ищем очки (цифра от 1 до 10)
      const points = parseInt(line);
      if (!isNaN(points) && points >= 1 && points <= 10) {
        currentCard.points = points;
        console.log(`   📊 Очки: ${points}`);
        i++;
        continue;
      }
      
      // Ищем название (текст без цифр и специальных символов, но не пустой)
      if (line.length > 2 && !/\d/.test(line) && !line.includes('+') && 
          line !== currentCard.name && currentCard.name === '') {
        currentCard.name = line;
        console.log(`   🏷️ Название: ${line}`);
        i++;
        continue;
      }
      
      // Ищем элементы (содержит + или специальные слова)
      if ((line.includes('+') || line.includes('кристалл') || line.includes('энергия') || 
          line.includes('камень') || line.includes('корень') || 
          line.includes('родниковая') || line.includes('белладонна') ||
          line.includes('крыло') || line.includes('глаз') ||
          line.includes('волны') || line.includes('огненный') ||
          line.includes('астральная') || line.includes('порошок') ||
          line.includes('эликсир') || line.includes('раствор') ||
          line.includes('зуб') || line.includes('эманация')) &&
          !line.includes(currentCard.name)) {
        if (!currentCard.elements) {
          currentCard.elements = line;
          console.log(`   🧪 Элементы: ${line}`);
        } else if (!currentCard.bottomElement) {
          // Если элементы уже есть, это скорее всего элемент снизу
          currentCard.bottomElement = line;
          console.log(`   🔽 Элемент снизу: ${line}`);
        }
        i++;
        continue;
      }
    }
    
    i++;
  }
  
  // Сохраняем последнюю карточку
  if (currentCard && currentCard.number) {
    cards[currentCard.number] = currentCard;
    console.log(`✅ Карточка ${currentCard.number}: ${currentCard.name}`);
  }
  
  console.log(`\n📊 Всего обработано карточек: ${Object.keys(cards).length}`);
  return cards;
}

function updateMappings(cards) {
  if (!cards || Object.keys(cards).length === 0) {
    console.error('❌ Нет данных для обновления маппингов');
    return;
  }
  
  console.log(`🔄 Обновляю маппинги для ${Object.keys(cards).length} карточек...`);
  
  // Создаем маппинг для сервера
  const serverMappings = {};
  const clientCards = [];
  
  Object.values(cards).forEach(card => {
    serverMappings[card.number] = {
      topType: 'recipe',
      topContent: card.name,
      bottomElement: card.bottomElement || 'волны эфира',
      points: card.points
    };
    
    clientCards.push({
      id: card.number.toString(),
      image: `/cards/${card.number}.png`,
      topType: 'recipe',
      topContent: card.name,
      bottomElement: card.bottomElement || 'волны эфира',
      points: card.points
    });
  });
  
  // Сохраняем маппинги
  try {
    fs.writeFileSync('server-mappings.json', JSON.stringify(serverMappings, null, 2));
    fs.writeFileSync('client-cards.json', JSON.stringify(clientCards, null, 2));
    
    console.log('✅ Маппинги сохранены:');
    console.log('   - server-mappings.json (для сервера)');
    console.log('   - client-cards.json (для клиента)');
    
    return { serverMappings, clientCards };
  } catch (error) {
    console.error('❌ Ошибка сохранения маппингов:', error.message);
    return null;
  }
}

// Основной процесс
async function main() {
  console.log('🎯 Обработка данных из Word файла');
  console.log('=====================================');

  const text = await readWordFile();
  if (text) {
    console.log('\n📝 Извлеченный текст:');
    console.log(text.substring(0, 500) + '...');
    
    const cards = parseCardData(text);
    if (cards) {
      updateMappings(cards);
    }
  }
}

// Запуск
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { readWordFile, parseCardData, updateMappings };

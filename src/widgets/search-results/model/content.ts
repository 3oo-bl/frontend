import type { SearchFilterGroup, SearchProduct } from './types';

const galaxySpecs = [
  'Экран: 6.9", AMOLED (LTPO), 3120x1440, 120 Гц',
  'Камера: 4 модуля, 200 МП + 50 МП + 10 МП',
  'Видео: fullHD 60 к/с, 4K, стабилизация, замедленная съемка',
  'Память: 256 ГБ, UFS 4.0',
  'CPU/GPU: Snapdragon 8 Elite (Adreno 830)',
  'ОЗУ: 12 ГБ, LPDDR5X',
  'Аккумулятор: 5000 мАч',
  'Корпус: стекло, 218 г, толщина 8.2 мм',
];

const storageOptions = [
  { id: '256', label: '256 ГБ', isActive: true },
  { id: '512', label: '512 ГБ' },
  { id: '1tb', label: '1 ТБ' },
];

const marketplaceOffers = [
  { marketplace: 'Ozon', price: '89 800 руб', href: '#' },
  { marketplace: 'Яндекс.Маркет', price: '89 800 руб', href: '#' },
  { marketplace: 'Wildberries', price: '89 800 руб', href: '#' },
  { marketplace: 'AliExpress', price: '89 800 руб', href: '#' },
];

export const searchProducts: SearchProduct[] = Array.from({ length: 6 }, (_, index) => ({
  id: `galaxy-s25-ultra-${index + 1}`,
  title: 'Samsung Galaxy S25 Ultra',
  storageLabel: '256 ГБ',
  specs: galaxySpecs,
  storageOptions,
  offers: marketplaceOffers,
  priceRange: {
    from: '89 800',
    to: '109 843',
  },
}));

export const filterGroups: SearchFilterGroup[] = [
  {
    title: 'Количество отзывов',
    options: [
      { label: 'Пользовательские ПК', count: 15 },
      { label: 'MSI ALL-IN-ONE PCS', count: 45 },
      { label: 'HP/COMPAQ PCs', count: 1 },
    ],
  },
  {
    title: 'Цена',
    options: [
      { label: '$0.00 - $1,000.00', count: 19 },
      { label: '$1,000.00 - $2,000.00', count: 21 },
      { label: '$2,000.00 - $3,000.00', count: 9 },
      { label: '$3,000.00 - $4,000.00', count: 6 },
      { label: '$4,000.00 - $5,000.00', count: 3 },
      { label: '$5,000.00 - $6,000.00', count: 1 },
      { label: '$6,000.00 - $7,000.00', count: 1 },
      { label: '$7,000.00 And Above', count: 1 },
    ],
  },
  {
    title: 'Цвет',
    options: [
      { label: 'Белый', swatch: 'white' },
      { label: 'Зеленый', swatch: 'green' },
    ],
  },
];
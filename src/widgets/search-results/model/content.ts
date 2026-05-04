import type { SearchFilterGroup } from './types';

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

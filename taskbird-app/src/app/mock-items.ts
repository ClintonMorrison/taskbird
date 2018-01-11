import { Item } from './item';

export const ITEMS: Item[] = [
  {
    id: 1,
    type: 'task',
    title: 'Buy groceries',
    description: 'I need eggs and milk',
    done: false
  },
  {
    id: 2,
    type: 'event',
    title: 'Tacos with Francisco',
    description: 'At La Haciendas',
    done: false
  },
  {
    id: 3,
    type: 'reminder',
    title: 'Redploy Task Bird today',
    description: 'Assuming v2 is ready',
    done: false
  }
];

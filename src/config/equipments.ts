import type { Equipment } from '../types/equipment'

export const EQUIPMENTS: Equipment[] = [
  {
    id: 'chunnin-jacket',
    name: 'Colete Chunnin',
    type: 'armor',
    stats: { vida: 10, chakra: 12},
  },

  {
    id: 'bandana',
    name: 'Bandana',
    type: 'accessory',
    stats: { vida: 5, chakra: 3 },
  },
  {
    id: 'akatsuki-hat',
    name: 'Chapéu de Akatsuki',
    type: 'accessory',
    stats: { vida: 10, chakra: 10 },
  },
  {
    id: 'kage-hat',
    name: 'Chapéu de Kage',
    type: 'accessory',
    stats: { vida: 50, chakra: 50 },
  },
]

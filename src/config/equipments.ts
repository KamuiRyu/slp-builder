import type { Equipment } from '../types/equipment'

export const EQUIPMENTS: Equipment[] = [
  {
    id: 'chunnin-jacket',
    name: 'Colete Chunnin',
    type: 'armor',
    stats: { vida: 100, chakra: 120},
  },

  {
    id: 'bandana',
    name: 'Bandana',
    type: 'accessory',
    stats: { vida: 50, chakra: 30 },
  },
  {
    id: 'akatsuki-hat',
    name: 'Chapéu de Akatsuki',
    type: 'accessory',
    stats: { vida: 100, chakra: 100 },
  },
  {
    id: 'kage-hat',
    name: 'Chapéu de Kage',
    type: 'accessory',
    stats: { vida: 500, chakra: 500 },
  },
]

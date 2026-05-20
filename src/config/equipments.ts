import type { Equipment } from '../types/equipment'

export const EQUIPMENTS: Equipment[] = [
  {
    id: 'kunai-balanced',
    name: 'Kunai Balanceada',
    type: 'weapon',
    stats: { taijutsu: 20 },
  },
  {
    id: 'chakra-blade',
    name: 'Lâmina de Chakra',
    type: 'weapon',
    stats: { kenjutsu: 25 },
  },
  {
    id: 'flak-jacket',
    name: 'Colete Shinobi',
    type: 'armor',
    stats: { vida: 120 },
  },
  {
    id: 'chakra-cloak',
    name: 'Manto de Chakra',
    type: 'armor',
    stats: { chakra: 120 },
  },
  {
    id: 'focus-seal',
    name: 'Selo de Foco',
    type: 'accessory',
    stats: { ninjutsu: 20, genjutsu: 15 },
  },
  {
    id: 'wind-bell',
    name: 'Sino de Vento',
    type: 'accessory',
    stats: { chakra: 60 },
  },
  {
    id: 'smoke-bomb',
    name: 'Bomba de Fumaça',
    type: 'ninjaTool',
    stats: { genjutsu: 15 },
  },
  {
    id: 'paper-bomb',
    name: 'Papel Bomba',
    type: 'ninjaTool',
    stats: { ninjutsu: 15 },
  },
]

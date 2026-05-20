import type { NinjaRank } from '../types/rank'

export const NINJA_RANKS: NinjaRank[] = [
  {
    id: 'genin',
    name: 'Genin',
    maxAttributePoints: 125,
    maxTrainableAttributePoints: 65,
    baseStats: {
      vida: 650,
      chakra: 650,
      taijutsu: 0,
      ninjutsu: 0,
      genjutsu: 0,
      kenjutsu: 0,
    },
  },
  {
    id: 'chunnin',
    name: 'Chunnin',
    maxAttributePoints: 250,
    maxTrainableAttributePoints: 125,
    baseStats: {
      vida: 900,
      chakra: 900,
      taijutsu: 0,
      ninjutsu: 0,
      genjutsu: 0,
      kenjutsu: 0,
    },
  },
]

import type { Equipment } from '../types/equipment'

export const EQUIPMENTS: Equipment[] = [
  /*{
    id: 'katana',
    name: 'Katana',
    type: 'weapon',
    stats: { kenjutsu: 8 },
    exclusiveSkills: [
      {
        id: 'katana-iaigiri',
        name: 'Iaigiri',
        description: 'Saca a lâmina em um corte veloz para atravessar a guarda do alvo.',
        baseDamage: 80,
        scalingAttribute: 'kenjutsu',
        scalingPercent: 0.4,
        imageSrc: '/images/elementals/unknown.png',
        effects: [
          {
            type: 'debuff',
            name: 'Corte preciso',
            description: 'Pressiona a defesa inimiga e cria abertura para o próximo golpe.',
            duration: '2s',
          },
        ],
      },
    ],
  },
  {
    id: 'kunai',
    name: 'Kunai',
    type: 'weapon',
    stats: { taijutsu: 4, kenjutsu: 4 },
    exclusiveSkills: [
      {
        id: 'kunai-arremesso-duplo',
        name: 'Arremesso Duplo',
        description: 'Arremessa duas kunais em sequência para finalizar inimigos em fuga.',
        baseDamage: 45,
        scalingAttribute: 'taijutsu',
        scalingPercent: 0.4,
        imageSrc: '/images/elementals/unknown.png',
      },
    ],
  },*/
  {
    id: 'chunnin-jacket',
    name: 'Colete Chunnin',
    imageSrc: '/images/equipments/chunnin-jacket.png',
    type: 'armor',
    stats: { vida: 10, chakra: 12},
  },

  {
    id: 'bandana',
    name: 'Bandana',
    imageSrc: '/images/equipments/bandana.png',
    type: 'accessory',
    stats: { vida: 5, chakra: 3 },
  },
  {
    id: 'akatsuki-hat',
    name: 'Chapéu de Akatsuki',
    imageSrc: '/images/equipments/akatsuki-hat.png',
    type: 'accessory',
    stats: { vida: 10, chakra: 10 },
  },
  {
    id: 'kage-hat',
    name: 'Chapéu de Kage',
    imageSrc: '/images/equipments/kage-hat.png',
    type: 'accessory',
    stats: { vida: 50, chakra: 50 },
  },
]

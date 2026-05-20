import type { BuffSkill, ElementalSkill, LineageSkill } from '../types/skill'

export const LINEAGE_SKILLS: Record<string, LineageSkill[]> = {
  uchiha: [
    {
      id: 'sharingan-feint',
      name: 'Finta Sharingan',
      description: 'Contra-ataque ilusório que abre janela para reposicionamento.',
      baseDamage: 50,
      scalingAttribute: 'genjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Desorientação',
          description: 'Reduz a precisão do alvo por uma curta duração.',
          duration: '4s',
        },
      ],
    },
    {
      id: 'phoenix-combo',
      name: 'Combo da Fênix',
      description: 'Sequência rápida de golpes que pressiona alvos isolados.',
      baseDamage: 100,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
    },
    {
      id: 'susanoo-cut',
      name: 'Corte Susanoo',
      description: 'Ataque pesado de lâmina espiritual com alto impacto.',
      baseDamage: 150,
      scalingAttribute: 'kenjutsu',
      scalingPercent: 0.4,
    },
  ],
  hyuga: [
    {
      id: 'gentle-palm',
      name: 'Palma Gentil',
      description: 'Golpe preciso que interrompe o fluxo de chakra inimigo.',
      baseDamage: 50,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Bloqueio de chakra',
          description: 'Reduz a recuperação de chakra do alvo.',
          duration: '5s',
        },
      ],
    },
    {
      id: 'lotus-gates',
      name: 'Portões do Lótus',
      description: 'Liberação corporal progressiva com bônus por nível ativo.',
      baseDamage: 0,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'buff',
          name: 'Portões internos',
          description: 'Aumenta atributos físicos enquanto ativo.',
          levels: [
            {
              level: 1,
              label: '1º Portão',
              description: '+10 Taijutsu e +5 mobilidade.',
              stats: { taijutsu: 10 },
            },
            {
              level: 2,
              label: '2º Portão',
              description: '+20 Taijutsu e +10 mobilidade.',
              stats: { taijutsu: 20 },
            },
            {
              level: 3,
              label: '3º Portão',
              description: '+35 Taijutsu, +15 mobilidade e desgaste gradual.',
              stats: { taijutsu: 35, vida: -50 },
            },
          ],
        },
        {
          type: 'debuff',
          name: 'Exaustão',
          description: 'Após o término, reduz defesa temporariamente.',
          duration: '6s',
        },
      ],
    },
    {
      id: 'chakra-needle',
      name: 'Agulha de Chakra',
      description: 'Disparo concentrado que perfura a defesa de chakra.',
      baseDamage: 100,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
    },
    {
      id: 'eight-trigrams',
      name: 'Oito Trigramas',
      description: 'Combinação de golpes sucessivos em área curta.',
      baseDamage: 150,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
    },
  ],
  senju: [
    {
      id: 'root-bind',
      name: 'Raízes Aprisionadoras',
      description: 'Prende o alvo no lugar para preparar o próximo jutsu.',
      baseDamage: 50,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Imobilização',
          description: 'Reduz deslocamento do alvo.',
          duration: '3s',
        },
      ],
    },
    {
      id: 'forest-crush',
      name: 'Esmagamento da Floresta',
      description: 'Pressão de madeira que causa dano consistente.',
      baseDamage: 100,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
    },
    {
      id: 'heavenly-fist',
      name: 'Punho Celestial',
      description: 'Golpe ascendente com grande potencial de finalização.',
      baseDamage: 150,
      scalingAttribute: 'taijutsu',
      scalingPercent: 0.4,
    },
  ],
}

export const ELEMENTAL_SKILLS: Record<string, ElementalSkill[]> = {
  fire: [
    {
      id: 'fire-spark',
      name: 'Centelha Katon',
      description: 'Chama rápida de baixo custo para iniciar pressão.',
      imageSrc: '/images/elementals/katon-1.png',
      baseDamage: 40,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.2,
    },
    {
      id: 'fireball',
      name: 'Grande Bola de Fogo',
      description: 'Projétil frontal de fogo com bom alcance.',
      imageSrc: '/images/elementals/katon-2.png',
      baseDamage: 80,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
    },
    {
      id: 'dragon-flame',
      name: 'Chama do Dragão',
      description: 'Explosão flamejante concentrada em alvo único.',
      imageSrc: '/images/elementals/katon-3.png',
      baseDamage: 120,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.6,
      effects: [
        {
          type: 'debuff',
          name: 'Queimadura',
          description: 'Aplica dano periódico por fogo.',
          duration: '5s',
        },
      ],
    },
    {
      id: 'inferno-seal',
      name: 'Selo Infernal',
      description: 'Selo ofensivo que amplifica dano elemental.',
      imageSrc: '/images/elementals/katon-4.png',
      baseDamage: 200,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.8,
    },
  ],
  water: [
    {
      id: 'water-needle',
      name: 'Agulha Suiton',
      description: 'Projétil fino de água para poke seguro.',
      imageSrc: '/images/elementals/suiton-1.png',
      baseDamage: 40,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.2,
    },
    {
      id: 'water-prison',
      name: 'Prisão de Água',
      description: 'Cápsula de água que limita ações do alvo.',
      imageSrc: '/images/elementals/suiton-2.png',
      baseDamage: 80,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
      effects: [
        {
          type: 'debuff',
          name: 'Confinamento',
          description: 'Reduz movimento e dificulta fuga.',
          duration: '4s',
        },
      ],
    },
    {
      id: 'water-dragon',
      name: 'Dragão Aquático',
      description: 'Invocação de água com dano alto em linha.',
      imageSrc: '/images/elementals/suiton-3.png',
      baseDamage: 120,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.6,
    },
    {
      id: 'tidal-burst',
      name: 'Ruptura da Maré',
      description: 'Impacto de água que empurra e abre espaço.',
      imageSrc: '/images/elementals/suiton-4.png',
      baseDamage: 200,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.8,
    },
  ],
  lightning: [
    {
      id: 'static-touch',
      name: 'Toque Estático',
      description: 'Contato elétrico rápido para punir aproximações.',
      imageSrc: '/images/elementals/raiton-1.png',
      baseDamage: 40,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.2,
    },
    {
      id: 'chidori-line',
      name: 'Linha Chidori',
      description: 'Avanço elétrico direto com alto poder de entrada.',
      imageSrc: '/images/elementals/raiton-2.png',
      baseDamage: 80,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.4,
    },
    {
      id: 'thunder-clap',
      name: 'Trovão Cortante',
      description: 'Corte relâmpago que pressiona defesa baixa.',
      imageSrc: '/images/elementals/raiton-3.png',
      baseDamage: 120,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.6,
      effects: [
        {
          type: 'debuff',
          name: 'Choque',
          description: 'Reduz reação e velocidade por curto período.',
          duration: '3s',
        },
      ],
    },
    {
      id: 'kirin-mark',
      name: 'Marca Kirin',
      description: 'Marca elétrica de alto impacto para finalização.',
      imageSrc: '/images/elementals/raiton-4.png',
      baseDamage: 200,
      scalingAttribute: 'ninjutsu',
      scalingPercent: 0.8,
    },
  ],
}

export const BUFF_SKILLS: BuffSkill[] = [
  {
    id: 'chakra-flow',
    name: 'Fluxo de Chakra',
    imageSrc: '/images/elementals/unknown.png',
    description: '+10% de consistência em combos de ninjutsu.',
    effects: [
      {
        type: 'buff',
        name: 'Fluxo estável',
        description: 'Aumenta Ninjutsu em percentual.',
        percentStats: { ninjutsu: 10 },
      },
    ],
  },
  {
    id: 'iron-will',
    name: 'Vontade de Ferro',
    imageSrc: '/images/elementals/unknown.png',
    description: 'Mais sobrevivência em trocas longas.',
    effects: [
      {
        type: 'buff',
        name: 'Resistência',
        description: 'Aumenta sustentação em combate prolongado.',
        levels: [
          {
            level: 1,
            label: 'Foco',
            description: '+5% Vida.',
            percentStats: { vida: 5 },
          },
          {
            level: 2,
            label: 'Determinação',
            description: '+12% Vida.',
            percentStats: { vida: 12 },
          },
        ],
      },
    ],
  },
  {
    id: 'silent-step',
    name: 'Passo Silencioso',
    imageSrc: '/images/elementals/unknown.png',
    description: 'Melhor abertura para controle e genjutsu.',
    effects: [
      {
        type: 'buff',
        name: 'Abertura furtiva',
        description: 'Aumenta controle e genjutsu.',
        stats: { genjutsu: 12 },
      },
    ],
  },
]

export const LINEAGE_BUFF_SKILLS: Record<string, BuffSkill[]> = {
  uchiha: [
    {
      id: 'sharingan-focus',
      name: 'Foco Sharingan',
      imageSrc: '/images/elementals/unknown.png',
      description: 'Refina percepção e controle de genjutsu.',
      effects: [
        {
          type: 'buff',
          name: 'Leitura de movimento',
          description: 'Aumenta Genjutsu em percentual.',
          percentStats: { genjutsu: 10 },
        },
      ],
    },
  ],
  hyuga: [
    {
      id: 'byakugan-focus',
      name: 'Foco Byakugan',
      imageSrc: '/images/elementals/unknown.png',
      description: 'Aprimora precisão e pressão de Taijutsu.',
      effects: [
        {
          type: 'buff',
          name: 'Visão dos tenketsu',
          description: 'Aumenta Taijutsu em valor fixo.',
          stats: { taijutsu: 12 },
        },
      ],
    },
    {
      id: 'lotus-gates',
      name: 'Portões do Lótus',
      imageSrc: '/images/elementals/unknown.png',
      description: 'Liberação progressiva que aumenta o poder físico.',
      effects: [
        {
          type: 'buff',
          name: 'Portões internos',
          description: 'Escolha o nível ativo para aplicar os bônus.',
          levels: [
            {
              level: 1,
              label: '1º Portão',
              description: '+10 Taijutsu.',
              stats: { taijutsu: 10 },
            },
            {
              level: 2,
              label: '2º Portão',
              description: '+20 Taijutsu.',
              stats: { taijutsu: 20 },
            },
            {
              level: 3,
              label: '3º Portão',
              description: '+35 Taijutsu e -50 Vida.',
              stats: { taijutsu: 35, vida: -50 },
            },
          ],
        },
      ],
    },
  ],
  senju: [
    {
      id: 'senju-vitality',
      name: 'Vitalidade Senju',
      imageSrc: '/images/elementals/unknown.png',
      description: 'Fortalece vida e sustentação em combate.',
      effects: [
        {
          type: 'buff',
          name: 'Corpo vigoroso',
          description: 'Aumenta Vida em percentual.',
          levels: [
            {
              level: 1,
              label: 'Fluxo vital',
              description: '+8% Vida.',
              percentStats: { vida: 8 },
            },
            {
              level: 2,
              label: 'Regeneração',
              description: '+15% Vida.',
              percentStats: { vida: 15 },
            },
          ],
        },
      ],
    },
  ],
}

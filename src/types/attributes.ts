export type AttributeKey =
  | 'vida'
  | 'chakra'
  | 'taijutsu'
  | 'ninjutsu'
  | 'genjutsu'
  | 'kenjutsu'

export type ScalableAttributeKey = Exclude<AttributeKey, 'vida' | 'chakra'>

export type Attributes = Record<AttributeKey, number>
export type TrainingAttributes = Record<ScalableAttributeKey, number>

export const BASE_STATS: Attributes = {
  vida: 650,
  chakra: 650,
  taijutsu: 0,
  ninjutsu: 0,
  genjutsu: 0,
  kenjutsu: 0,
}

export const ATTRIBUTE_LABELS: Record<AttributeKey, string> = {
  vida: 'Vida',
  chakra: 'Chakra',
  taijutsu: 'Taijutsu',
  ninjutsu: 'Ninjutsu',
  genjutsu: 'Genjutsu',
  kenjutsu: 'Kenjutsu',
}

export const INITIAL_ATTRIBUTE_POINTS: Attributes = {
  vida: 0,
  chakra: 0,
  taijutsu: 0,
  ninjutsu: 0,
  genjutsu: 0,
  kenjutsu: 0,
}

export const INITIAL_TRAINING_POINTS: TrainingAttributes = {
  taijutsu: 0,
  ninjutsu: 0,
  genjutsu: 0,
  kenjutsu: 0,
}

export const VITAL_ATTRIBUTES: Array<Extract<AttributeKey, 'vida' | 'chakra'>> =
  ['vida', 'chakra']

export const DISTRIBUTABLE_ATTRIBUTES: AttributeKey[] = [
  'vida',
  'chakra',
  'taijutsu',
  'ninjutsu',
  'genjutsu',
  'kenjutsu',
]

export const TRAINABLE_ATTRIBUTES: ScalableAttributeKey[] = [
  'taijutsu',
  'ninjutsu',
  'genjutsu',
  'kenjutsu',
]

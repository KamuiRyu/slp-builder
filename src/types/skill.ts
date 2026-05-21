import type { ScalableAttributeKey } from './attributes'
import type { Attributes } from './attributes'

export type SkillEffectType = 'buff' | 'debuff' | 'special'

export type SkillEffectLevel = {
  level: number
  label?: string
  description: string
  stats?: Partial<Attributes>
  percentStats?: Partial<Attributes>
}

export type SkillEffect = {
  type: SkillEffectType
  name: string
  description: string
  duration?: string
  stats?: Partial<Attributes>
  percentStats?: Partial<Attributes>
  levels?: SkillEffectLevel[]
}

type SkillMetadata = {
  description?: string
  effects?: SkillEffect[]
}

export type LineageSkill = {
  id: string
  name: string
  imageSrc?: string
  baseDamage: number
  scalingAttribute: ScalableAttributeKey
  scalingPercent: 0 | 0.4
} & SkillMetadata

export type ElementalSkill = {
  id: string
  name: string
  imageSrc?: string
  baseDamage: number
  scalingAttribute: 'ninjutsu'
  scalingPercent: 0.2 | 0.4 | 0.6 | 0.8
} & SkillMetadata

export type BuffSkill = {
  id: string
  name: string
  imageSrc?: string
  description: string
  effects?: SkillEffect[]
}

export type DamageSkill = LineageSkill | ElementalSkill

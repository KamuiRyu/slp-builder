import type { Attributes, TrainingAttributes } from './attributes'

export type Build = {
  name: string
  rankId: string
  lineageId: string
  avatarId?: string
  avatarImageIndex?: number
  avatarUrl?: string
  customThemeColor?: string
  elementIds: [string, string?]
  attributes: Attributes
  training: TrainingAttributes
  equipments: {
    weaponId?: string
    equipment1Id?: string
    equipment2Id?: string
    bandanaId?: string
    ninjaToolId?: string
  }
  selectedSkills: {
    lineageSkillIds: string[]
    elementalSkillIds: string[]
    buffSkillIds: string[]
  }
  skillLevels: Record<string, number>
}

export type Lineage = {
  id: string
  name: string
  imageSrc?: string
}

export type Element = {
  id: string
  name: string
  imageSrc?: string
}

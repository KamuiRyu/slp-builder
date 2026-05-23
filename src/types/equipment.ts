import type { Attributes } from './attributes'
import type { DamageSkill } from './skill'

export type EquipmentType = 'weapon' | 'equipment' | 'accessory' | 'ninjaTool'

export type Equipment = {
  id: string
  name: string
  type: EquipmentType
  imageSrc?: string
  exclusiveSkills?: DamageSkill[]
  stats?: Partial<Attributes>
}

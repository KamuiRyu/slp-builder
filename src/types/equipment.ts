import type { Attributes } from './attributes'

export type EquipmentType = 'weapon' | 'armor' | 'accessory' | 'ninjaTool'

export type Equipment = {
  id: string
  name: string
  type: EquipmentType
  stats?: Partial<Attributes>
}

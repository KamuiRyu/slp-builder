import type { Attributes } from './attributes'

export type NinjaRank = {
  id: string
  name: string
  maxAttributePoints: number
  maxTrainableAttributePoints: number
  baseStats: Attributes
}

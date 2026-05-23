import {
  DISTRIBUTABLE_ATTRIBUTES,
  TRAINABLE_ATTRIBUTES,
  VITAL_ATTRIBUTES,
} from '../types/attributes'
import type { Attributes } from '../types/attributes'
import type { Build } from '../types/build'
import type { Equipment } from '../types/equipment'
import type { NinjaRank } from '../types/rank'
import type { BuffSkill } from '../types/skill'

export function calculateDistributedPoints(attributes: Attributes): number {
  return DISTRIBUTABLE_ATTRIBUTES.reduce(
    (total, attribute) => total + attributes[attribute],
    0,
  )
}

export function convertAttributePointsToStat(
  attribute: keyof Attributes,
  value: number,
): number {
  const multiplier = VITAL_ATTRIBUTES.includes(
    attribute as (typeof VITAL_ATTRIBUTES)[number],
  )
    ? 10
    : 1

  return value * multiplier
}

export function calculateFinalStats(
  build: Build,
  rank: NinjaRank,
  equipments: Equipment[],
  buffSkills: BuffSkill[] = [],
): Attributes {
  const stats = { ...rank.baseStats }
  const percentStats: Partial<Attributes> = {}

  for (const attribute of Object.keys(build.attributes) as Array<
    keyof Attributes
  >) {
    stats[attribute] += convertAttributePointsToStat(
      attribute,
      build.attributes[attribute],
    )
  }

  for (const attribute of TRAINABLE_ATTRIBUTES) {
    stats[attribute] += build.training[attribute]
  }

  const selectedEquipmentIds = Object.values(build.equipments).filter((id): id is string => Boolean(id))
  for (const eqId of selectedEquipmentIds) {
    const equipment = equipments.find((eq) => eq.id === eqId)
    if (equipment?.stats) {
      for (const [attribute, value] of Object.entries(equipment.stats)) {
        const key = attribute as keyof Attributes
        stats[key] += convertAttributePointsToStat(key, value ?? 0)
      }
    }
  }

  const selectedBuffSkills = buffSkills.filter((skill) =>
    build.selectedSkills.buffSkillIds.includes(skill.id) ||
    build.selectedSkills.generalSkillIds.includes(skill.id),
  )

  for (const skill of selectedBuffSkills) {
    for (const effect of skill.effects ?? []) {
      for (const [attribute, value] of Object.entries(effect.stats ?? {})) {
        stats[attribute as keyof Attributes] += value ?? 0
      }

      for (const [attribute, value] of Object.entries(effect.percentStats ?? {})) {
        const key = attribute as keyof Attributes
        percentStats[key] = (percentStats[key] ?? 0) + (value ?? 0)
      }

      const selectedLevel = build.skillLevels[skill.id]
      const level =
        effect.levels?.find((effectLevel) => effectLevel.level === selectedLevel) ??
        effect.levels?.[0]

      for (const [attribute, value] of Object.entries(level?.stats ?? {})) {
        stats[attribute as keyof Attributes] += value ?? 0
      }

      for (const [attribute, value] of Object.entries(
        level?.percentStats ?? {},
      )) {
        const key = attribute as keyof Attributes
        percentStats[key] = (percentStats[key] ?? 0) + (value ?? 0)
      }
    }
  }

  for (const [attribute, percent] of Object.entries(percentStats)) {
    const key = attribute as keyof Attributes
    stats[key] = Math.round(stats[key] * (1 + (percent ?? 0) / 100))
  }

  return stats
}

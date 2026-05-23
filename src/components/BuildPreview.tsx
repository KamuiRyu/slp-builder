import React, { useState } from 'react'
import { ScrollText, Swords } from 'lucide-react'
import { AttributeIcon } from './AttributeIcon'
import { ATTRIBUTE_LABELS, TRAINABLE_ATTRIBUTES } from '../types/attributes'
import type { Attributes } from '../types/attributes'
import type { Build } from '../types/build'
import type { DamageSkill, SkillEffect } from '../types/skill'
import { getPublicAssetUrl } from '../utils/assets'
import { calculateDamage } from '../utils/damage'
import { calculateDistributedPoints } from '../utils/stats'

const UNKNOWN_SKILL_IMAGE = '/images/elementals/unknown.webp'

const effectTypeLabels: Record<SkillEffect['type'], string> = {
  buff: 'Buff',
  debuff: 'Debuff',
  special: 'Especial',
}

type BuildPreviewProps = {
  build: Build
  finalStats: Attributes
  maxAttributePoints: number
  maxTrainableAttributePoints: number
  damageSkillGroups: DamageSkillGroup[]
  shareUrl: string
  onCopyShareUrl: () => void
}

export type DamageSkillGroup = {
  id: string
  title: string
  emptyMessage: string
  skills: DamageSkill[]
}

export function BuildPreview({
  build,
  finalStats,
  maxAttributePoints,
  maxTrainableAttributePoints,
  damageSkillGroups,
}: BuildPreviewProps) {
  const distributedPoints = calculateDistributedPoints(build.attributes)
  const isOverLimit = distributedPoints > maxAttributePoints
  const hasTrainingOverLimit = TRAINABLE_ATTRIBUTES.some(
    (attribute) => build.training[attribute] > maxTrainableAttributePoints,
  )
  const hasDamageSkills = damageSkillGroups.some(
    (group) => group.skills.length > 0,
  )

  return (
    <aside className="preview-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Prévia da build</span>
          <h2>{build.name || 'Shinobi sem nome'}</h2>
        </div>
        <ScrollText aria-hidden="true" />
      </div>

      <div className="points-meter">
        <div className="meter-copy">
          <span>Pontos usados</span>
          <strong className={isOverLimit ? 'danger' : undefined}>
            {distributedPoints}/{maxAttributePoints}
          </strong>
        </div>
        <div className="meter-track">
          <span
            className={isOverLimit ? 'over-limit' : undefined}
            style={{
              width: `${Math.min(
                (distributedPoints / maxAttributePoints) * 100,
                100,
              )}%`,
            }}
          />
        </div>
      </div>

      <div className="points-meter compact">
        <div className="meter-copy">
          <span>Treino por atributo</span>
          <strong className={hasTrainingOverLimit ? 'danger' : undefined}>
            máx. {maxTrainableAttributePoints}
          </strong>
        </div>
        <div className="training-list">
          {TRAINABLE_ATTRIBUTES.map((attribute) => (
            <span
              className={
                build.training[attribute] > maxTrainableAttributePoints
                  ? 'danger'
                  : undefined
              }
              key={attribute}
            >
              {ATTRIBUTE_LABELS[attribute]} {build.training[attribute]}
            </span>
          ))}
        </div>
      </div>

      <div className="stat-grid">
        {(Object.keys(finalStats) as Array<keyof Attributes>).map(
          (attribute) => (
            <div className="stat-card" key={attribute}>
              <span>
                <AttributeIcon attribute={attribute} className="stat-icon" />
                {ATTRIBUTE_LABELS[attribute]}
              </span>
              <strong>{finalStats[attribute]}</strong>
            </div>
          ),
        )}
      </div>

      <section className="damage-list">
        <div className="section-title">
          <Swords aria-hidden="true" />
          <h3>Dano em tempo real</h3>
        </div>
        {!hasDamageSkills ? (
          <p className="muted">Selecione jutsus para ver o dano calculado.</p>
        ) : (
          damageSkillGroups.map((group) => (
            <div className="damage-group" key={group.id}>
              <div className="damage-group-heading">
                <h4>{group.title}</h4>
                <span>{group.skills.length}</span>
              </div>
              {group.skills.length === 0 ? (
                <p className="muted damage-group-empty">
                  {group.emptyMessage}
                </p>
              ) : (
                group.skills.map((skill) => (
                  <DamageSkillRow
                    finalStats={finalStats}
                    key={skill.id}
                    skill={skill}
                  />
                ))
              )}
            </div>
          ))
        )}
      </section>
    </aside>
  )
}

const SKILL_ATTRIBUTE_COLORS: Record<string, string> = {
  taijutsu: '#ff4d5f',
  ninjutsu: '#4aa3ff',
  genjutsu: '#a56cff',
  kenjutsu: '#ffd747',
}

const SKILL_ATTRIBUTE_LABELS: Record<string, string> = {
  taijutsu: 'Tai',
  ninjutsu: 'Nin',
  genjutsu: 'Gen',
  kenjutsu: 'Ken',
}

type DamageSkillRowProps = {
  finalStats: Attributes
  skill: DamageSkill
}

function DamageSkillRow({ finalStats, skill }: DamageSkillRowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hasScaling = skill.scalingAttribute && skill.scalingPercent !== undefined
  const skillColor = hasScaling ? SKILL_ATTRIBUTE_COLORS[skill.scalingAttribute!] : '#888'
  const attrLabel = hasScaling ? SKILL_ATTRIBUTE_LABELS[skill.scalingAttribute!] : ''
  const damage =
    skill.baseDamage !== undefined
      ? hasScaling && skill.scalingAttribute
        ? calculateDamage(
            skill.baseDamage,
            finalStats[skill.scalingAttribute],
            skill.scalingPercent!,
          )
        : skill.baseDamage
      : null
  const scalingLabel =
    hasScaling && skill.scalingPercent! > 0
      ? `${Math.round(skill.scalingPercent! * 100)}% ${attrLabel}`
      : null
  const hasDetails = !!(skill.description || skill.effects?.length)
  const detailsId = `${skill.id}-details`

  return (
    <article
      className="damage-row"
      style={{ '--skill-color': skillColor } as React.CSSProperties}
    >
      <div className="skill-row-header">
        <div className="skill-info">
          <div className="skill-image-ring">
            <img
              alt=""
              className="skill-image"
              loading="lazy"
              src={getPublicAssetUrl(skill.imageSrc ?? UNKNOWN_SKILL_IMAGE)}
            />
          </div>
          <div className="skill-text">
            <strong>{skill.name}</strong>
            {attrLabel && <span className="skill-attr-badge">{attrLabel}</span>}
          </div>
        </div>
        <div className="skill-row-right">
          {hasDetails && (
            <button
              aria-controls={detailsId}
              aria-expanded={isOpen}
              className="skill-details-toggle"
              onClick={() => setIsOpen((c) => !c)}
              type="button"
            >
              {isOpen ? '−' : '+'} Detalhes
            </button>
          )}
          {damage !== null && (
            <div className="skill-damage-block">
              <output>{damage}</output>
              {scalingLabel && <em>{scalingLabel}</em>}
            </div>
          )}
        </div>
      </div>
      {hasDetails && (
        <div
          className={`skill-details-clip ${isOpen ? 'open' : ''}`}
          id={detailsId}
        >
          <div className="skill-details-body">
            {skill.description && (
              <p className="skill-description">{skill.description}</p>
            )}
            {skill.effects && skill.effects.length > 0 && (
              <SkillEffects effects={skill.effects} skillId={skill.id} />
            )}
          </div>
        </div>
      )}
    </article>
  )
}

// SkillDetails is now inlined into DamageSkillRow for layout control


type SkillEffectsProps = {
  effects: SkillEffect[]
  skillId: string
}

function SkillEffects({ effects, skillId }: SkillEffectsProps) {
  return (
    <div className="skill-effects">
      {effects.map((effect) => (
        <div
          className={`skill-effect ${effect.type}`}
          key={`${skillId}-${effect.name}`}
        >
          <div className="skill-effect-heading">
            <span>{effectTypeLabels[effect.type]}</span>
            <strong>{effect.name}</strong>
            {effect.duration && (
              <em>Duração: {effect.duration}</em>
            )}
          </div>
          <p>{effect.description}</p>
          <EffectStats
            percentStats={effect.percentStats}
            stats={effect.stats}
          />
          {effect.levels && (
            <ul>
              {effect.levels.map((level) => (
                <li key={level.level}>
                  <b>Nv. {level.level}</b>
                  <span>{level.description}</span>
                  {level.duration && (
                    <em>Duração: {level.duration}</em>
                  )}
                  <EffectStats
                    percentStats={level.percentStats}
                    stats={level.stats}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

type EffectStatsProps = {
  percentStats?: Partial<Attributes>
  stats?: Partial<Attributes>
}

function EffectStats({ percentStats, stats }: EffectStatsProps) {
  const flatEntries = Object.entries(stats ?? {}) as Array<
    [keyof Attributes, number]
  >
  const percentEntries = Object.entries(percentStats ?? {}) as Array<
    [keyof Attributes, number]
  >

  if (flatEntries.length === 0 && percentEntries.length === 0) {
    return null
  }

  return (
    <div className="effect-stat-list">
      {flatEntries.map(([attribute, value]) => (
        <span key={`flat-${attribute}`}>
          {value > 0 ? '+' : ''}
          {value} {ATTRIBUTE_LABELS[attribute]}
        </span>
      ))}
      {percentEntries.map(([attribute, value]) => (
        <span key={`percent-${attribute}`}>
          {value > 0 ? '+' : ''}
          {value}% {ATTRIBUTE_LABELS[attribute]}
        </span>
      ))}
    </div>
  )
}

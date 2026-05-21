import { useState } from 'react'
import { ScrollText, Swords } from 'lucide-react'
import { AttributeIcon } from './AttributeIcon'
import { ATTRIBUTE_LABELS, TRAINABLE_ATTRIBUTES } from '../types/attributes'
import type { Attributes } from '../types/attributes'
import type { Build } from '../types/build'
import type { DamageSkill, SkillEffect } from '../types/skill'
import { getPublicAssetUrl } from '../utils/assets'
import { calculateDamage } from '../utils/damage'
import { calculateDistributedPoints } from '../utils/stats'

const UNKNOWN_SKILL_IMAGE = '/images/elementals/unknown.png'

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
  damageSkills: DamageSkill[]
  shareUrl: string
  onCopyShareUrl: () => void
}

export function BuildPreview({
  build,
  finalStats,
  maxAttributePoints,
  maxTrainableAttributePoints,
  damageSkills,
}: BuildPreviewProps) {
  const distributedPoints = calculateDistributedPoints(build.attributes)
  const isOverLimit = distributedPoints > maxAttributePoints
  const hasTrainingOverLimit = TRAINABLE_ATTRIBUTES.some(
    (attribute) => build.training[attribute] > maxTrainableAttributePoints,
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
        {damageSkills.length === 0 ? (
          <p className="muted">Selecione jutsus para ver o dano calculado.</p>
        ) : (
          damageSkills.map((skill) => (
            <article className="damage-row" key={skill.id}>
              <div className="skill-row-header">
                <div className="skill-info">
                  <img
                    alt=""
                    className="skill-image"
                    loading="lazy"
                    src={getPublicAssetUrl(
                      skill.imageSrc ?? UNKNOWN_SKILL_IMAGE,
                    )}
                  />
                  <div>
                    <strong>{skill.name}</strong>
                    {skill.baseDamage > 0 && (
                      <span>
                        {skill.baseDamage} + {skill.scalingPercent * 100}%{' '}
                        {ATTRIBUTE_LABELS[skill.scalingAttribute]}
                      </span>
                    )}
                  </div>
                </div>
                {(skill.description || skill.effects?.length) && (
                  <SkillDetails
                    description={skill.description}
                    effects={skill.effects}
                    skillId={skill.id}
                  />
                )}
                {skill.baseDamage > 0 && (
                  <output>
                    {calculateDamage(
                      skill.baseDamage,
                      finalStats[skill.scalingAttribute],
                      skill.scalingPercent,
                    )}
                  </output>
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </aside>
  )
}

type SkillDetailsProps = {
  description?: string
  effects?: SkillEffect[]
  skillId: string
}

function SkillDetails({ description, effects, skillId }: SkillDetailsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const detailsId = `${skillId}-details`

  return (
    <div className={`skill-details ${isOpen ? 'open' : ''}`}>
      <button
        aria-controls={detailsId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        Detalhes e efeitos
      </button>
      <div className="skill-details-clip" id={detailsId}>
        <div className="skill-details-body">
          {description && (
            <p className="skill-description">{description}</p>
          )}
          {effects && effects.length > 0 && (
            <SkillEffects effects={effects} skillId={skillId} />
          )}
        </div>
      </div>
    </div>
  )
}

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

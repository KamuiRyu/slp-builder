import type {
  FieldErrors,
  Path,
  PathValue,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form'
import { AttributeIcon } from './AttributeIcon'
import { Input } from './ui/Input'
import { Label } from './ui/Label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select'
import {
  ATTRIBUTE_LABELS,
  type AttributeKey,
  DISTRIBUTABLE_ATTRIBUTES,
  TRAINABLE_ATTRIBUTES,
} from '../types/attributes'
import type { Build, Element, Lineage } from '../types/build'
import type { Equipment, EquipmentType } from '../types/equipment'
import type { BuffSkill } from '../types/skill'
import type { BuildFormValues } from '../utils/validation'
import {
  calculateDistributedPoints,
  convertAttributePointsToStat,
} from '../utils/stats'
import { getPublicAssetUrl } from '../utils/assets'

type BuilderFormProps = {
  build: Build
  errors: FieldErrors<BuildFormValues>
  register: UseFormRegister<BuildFormValues>
  setValue: UseFormSetValue<BuildFormValues>
  lineages: Lineage[]
  elements: Element[]
  ranks: Array<{
    id: string
    name: string
    maxAttributePoints: number
    maxTrainableAttributePoints: number
  }>
  equipments: Equipment[]
  buffSkills: BuffSkill[]
}

const equipmentLabels: Record<EquipmentType, string> = {
  weapon: 'Arma',
  armor: 'Armadura',
  accessory: 'Acessório',
  ninjaTool: 'Ferramenta ninja',
}

const equipmentFields: Array<{
  type: EquipmentType
  field: keyof Build['equipments']
}> = [
  { type: 'weapon', field: 'weaponId' },
  { type: 'armor', field: 'armorId' },
  { type: 'accessory', field: 'accessoryId' },
  { type: 'ninjaTool', field: 'ninjaToolId' },
]

const DIGITS_ONLY_REGEX = /\D/g
const EMPTY_SELECT_VALUE = '__none__'
const UNKNOWN_IMAGE = '/images/elementals/unknown.png'

function clampNumericValue(rawValue: string, max: number): number {
  const digitsOnly = rawValue.replace(DIGITS_ONLY_REGEX, '')

  if (!digitsOnly) {
    return 0
  }

  return Math.min(Number(digitsOnly), max)
}

function createClampedNumericRegistration(
  registration: UseFormRegisterReturn,
  max: number,
): UseFormRegisterReturn {
  return {
    ...registration,
    onChange: (event) => {
      const value = clampNumericValue(event.target.value, max)

      event.target.value = String(value)

      return registration.onChange(event)
    },
  }
}

export function BuilderForm({
  build,
  errors,
  register,
  setValue,
  lineages,
  elements,
  ranks,
  equipments,
  buffSkills,
}: BuilderFormProps) {
  const activeRank = ranks.find((rank) => rank.id === build.rankId) ?? ranks[0]
  const distributedPoints = calculateDistributedPoints(build.attributes)
  const equipmentBonuses = equipments
    .filter((equipment) =>
      Object.values(build.equipments).includes(equipment.id),
    )
    .reduce(
      (bonuses, equipment) => {
        for (const [attribute, value] of Object.entries(equipment.stats ?? {})) {
          const key = attribute as AttributeKey
          bonuses[key] += convertAttributePointsToStat(key, value ?? 0)
        }

        return bonuses
      },
      {
        vida: 0,
        chakra: 0,
        taijutsu: 0,
        ninjutsu: 0,
        genjutsu: 0,
        kenjutsu: 0,
      } satisfies Record<AttributeKey, number>,
    )

  function registerClampedNumber(
    field: Path<BuildFormValues>,
    max: number,
  ): UseFormRegisterReturn {
    return createClampedNumericRegistration(
      register(field, {
        setValueAs: (value) => clampNumericValue(String(value), max),
      }),
      max,
    )
  }

  function updateAttributeValue(
    field: Path<BuildFormValues>,
    nextValue: number,
    max: number,
  ) {
    setValue(field, Math.min(Math.max(nextValue, 0), max), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  function updateFieldValue<T extends Path<BuildFormValues>>(
    field: T,
    value: PathValue<BuildFormValues, T>,
  ) {
    setValue(field, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  function updatePrimaryElement(elementId: string) {
    updateFieldValue('elementIds', [elementId, build.elementIds[1]])
  }

  function toggleBuffSkill(skill: BuffSkill, checked: boolean) {
    const selectedIds = build.selectedSkills.buffSkillIds
    const nextIds = checked
      ? [...selectedIds, skill.id]
      : selectedIds.filter((skillId) => skillId !== skill.id)
    const firstLevel = getSkillLevels(skill)[0]?.level

    updateFieldValue('selectedSkills.buffSkillIds', nextIds)

    if (checked && firstLevel && !build.skillLevels[skill.id]) {
      updateFieldValue('skillLevels', {
        ...build.skillLevels,
        [skill.id]: firstLevel,
      })
    }
  }

  function updateSkillLevel(skillId: string, level: string) {
    updateFieldValue('skillLevels', {
      ...build.skillLevels,
      [skillId]: Number(level),
    })
  }

  return (
    <div className="builder-form">
      <section className="form-card identity-card">
        <span className="eyebrow">Ficha shinobi</span>
        <h2>Base da build</h2>
        <div className="field-grid">
          <Label>
            Nome
            <Input
              type="text"
              placeholder="Ex: Controle Katon"
              {...register('name')}
            />
            {errors.name && <small>{errors.name.message}</small>}
          </Label>

          <Label>
            Graduação
            <Select
              onValueChange={(value) => updateFieldValue('rankId', value)}
              value={build.rankId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Escolha uma graduação" />
              </SelectTrigger>
              <SelectContent>
                {ranks.map((rank) => (
                  <SelectItem key={rank.id} value={rank.id}>
                    {rank.name} - {rank.maxAttributePoints} pts
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>

          <Label>
            Linhagem
            <Select
              onValueChange={(value) => updateFieldValue('lineageId', value)}
              value={build.lineageId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Escolha uma linhagem" />
              </SelectTrigger>
              <SelectContent>
                {lineages.map((lineage) => (
                  <SelectItem key={lineage.id} value={lineage.id}>
                    <SelectOptionMedia
                      imageSrc={lineage.imageSrc}
                      name={lineage.name}
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>

          <Label>
            Elemento
            <Select
              onValueChange={updatePrimaryElement}
              value={build.elementIds[0]}
            >
              <SelectTrigger>
                <SelectValue placeholder="Escolha um elemento" />
              </SelectTrigger>
              <SelectContent>
                {elements.map((element) => (
                  <SelectItem key={element.id} value={element.id}>
                    <SelectOptionMedia
                      imageSrc={element.imageSrc}
                      name={element.name}
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>
        </div>

        <div className="active-skills">
          <div className="active-skills-heading">
            <span>Habilidades ativas</span>
            <small>Clique para ativar</small>
          </div>
          <div className="active-skill-list">
            {buffSkills.map((skill) => {
              const isChecked = build.selectedSkills.buffSkillIds.includes(
                skill.id,
              )
              const levels = getSkillLevels(skill)

              return (
                <button
                  className={`active-skill-row ${isChecked ? 'active' : ''}`}
                  key={skill.id}
                  onClick={() => toggleBuffSkill(skill, !isChecked)}
                  type="button"
                >
                  <div className="active-skill-toggle">
                    <img
                      alt=""
                      className="active-skill-image"
                      loading="lazy"
                      src={getPublicAssetUrl(
                        skill.imageSrc ?? UNKNOWN_IMAGE,
                      )}
                    />
                    <span>
                      <strong>{skill.name}</strong>
                      <small>{skill.description}</small>
                    </span>
                  </div>
                  {isChecked && levels.length > 0 && (
                    <Select
                      onValueChange={(value) => updateSkillLevel(skill.id, value)}
                      value={String(build.skillLevels[skill.id] ?? levels[0].level)}
                    >
                      <SelectTrigger
                        className="skill-level-select"
                        onClick={(event) => event.stopPropagation()}
                        onPointerDown={(event) => event.stopPropagation()}
                      >
                        <SelectValue placeholder="Nível" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem
                            key={level.level}
                            value={String(level.level)}
                          >
                            {level.label ?? `Nv. ${level.level}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="form-card">
        <span className="eyebrow">Treino separado</span>
        <h2>Atributos treináveis</h2>
        <p className="form-note">
          Estes pontos não consomem a distribuição principal. Genin tem até 65
          por atributo; Chunnin tem até 125.
        </p>
        <div className="attribute-list">
          {TRAINABLE_ATTRIBUTES.map((attribute) => {
            const field = `training.${attribute}` as Path<BuildFormValues>
            const currentValue = build.training[attribute]
            const maxValue = activeRank.maxTrainableAttributePoints

            return (
              <AttributeRow
                currentValue={currentValue}
                attribute={attribute}
                field={field}
                key={attribute}
                label={ATTRIBUTE_LABELS[attribute]}
                maxValue={maxValue}
                onUpdate={updateAttributeValue}
                register={registerClampedNumber(field, maxValue)}
              />
            )
          })}
        </div>
      </section>

      <section className="form-card">
        <span className="eyebrow">Distribuição</span>
        <h2>Atributos</h2>
        <p className="form-note">
          Vida e Chakra recebem +10 no valor final para cada ponto investido.
        </p>
        <div className="attribute-list">
          {DISTRIBUTABLE_ATTRIBUTES.map((attribute) => {
            const currentValue = build.attributes[attribute]
            const maxValue = Math.max(
              0,
              activeRank.maxAttributePoints - distributedPoints + currentValue,
            )
            const field = `attributes.${attribute}` as Path<BuildFormValues>

            return (
              <AttributeRow
                currentValue={currentValue}
                attribute={attribute}
                field={field}
                key={attribute}
                label={ATTRIBUTE_LABELS[attribute]}
                maxValue={maxValue}
                onUpdate={updateAttributeValue}
                register={registerClampedNumber(field, maxValue)}
                sideValue={equipmentBonuses[attribute]}
                totalValue={
                  convertAttributePointsToStat(attribute, currentValue) +
                  equipmentBonuses[attribute]
                }
              />
            )
          })}
        </div>
      </section>

      <section className="form-card">
        <span className="eyebrow">Equipamento</span>
        <h2>Equipamentos</h2>
        <div className="field-grid">
          {equipmentFields.map(({ type, field }) => (
            <Label key={type}>
              {equipmentLabels[type]}
              <Select
                onValueChange={(value) =>
                  updateFieldValue(
                    `equipments.${field}`,
                    value === EMPTY_SELECT_VALUE ? undefined : value,
                  )
                }
                value={build.equipments[field] ?? EMPTY_SELECT_VALUE}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nenhum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={EMPTY_SELECT_VALUE}>Nenhum</SelectItem>
                  {equipments
                    .filter((equipment) => equipment.type === type)
                    .map((equipment) => (
                      <SelectItem key={equipment.id} value={equipment.id}>
                        <SelectOptionMedia
                          imageSrc={equipment.imageSrc}
                          name={equipment.name}
                          subtitle={formatEquipmentStats(equipment)}
                        />
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </Label>
          ))}
        </div>
      </section>
    </div>
  )
}

function getSkillLevels(skill: BuffSkill) {
  return skill.effects?.flatMap((effect) => effect.levels ?? []) ?? []
}

function formatEquipmentStats(equipment: Equipment): string | undefined {
  const stats = Object.entries(equipment.stats ?? {})

  if (stats.length === 0) {
    return undefined
  }

  return stats
    .map(([attribute, value]) => {
      const label = ATTRIBUTE_LABELS[attribute as AttributeKey]

      return `${value && value > 0 ? '+' : ''}${value} ${label}`
    })
    .join(' / ')
}

type SelectOptionMediaProps = {
  imageSrc?: string
  name: string
  subtitle?: string
}

function SelectOptionMedia({
  imageSrc,
  name,
  subtitle,
}: SelectOptionMediaProps) {
  return (
    <span className="select-option-media">
      <img
        alt=""
        className="select-option-image"
        loading="lazy"
        src={getPublicAssetUrl(imageSrc ?? UNKNOWN_IMAGE)}
      />
      <span className="select-option-copy">
        <strong>{name}</strong>
        {subtitle && <small>{subtitle}</small>}
      </span>
    </span>
  )
}

type AttributeRowProps = {
  attribute: AttributeKey
  currentValue: number
  field: Path<BuildFormValues>
  label: string
  maxValue: number
  onUpdate: (
    field: Path<BuildFormValues>,
    nextValue: number,
    max: number,
  ) => void
  register: UseFormRegisterReturn
  sideValue?: number
  totalValue?: number
}

function AttributeRow({
  attribute,
  currentValue,
  field,
  label,
  maxValue,
  onUpdate,
  register,
  sideValue = 0,
  totalValue = currentValue,
}: AttributeRowProps) {
  return (
    <div className="attribute-row">
      <span className="attribute-name">
        <AttributeIcon attribute={attribute} className="attribute-icon" />
        {label}
      </span>
      <div className="attribute-stepper">
        <button
          aria-label={`Diminuir ${label}`}
          disabled={currentValue <= 0}
          onClick={() => onUpdate(field, currentValue - 1, maxValue)}
          type="button"
        >
          -
        </button>
        <Input
          aria-label={label}
          className="attribute-input"
          inputMode="numeric"
          min={0}
          max={maxValue}
          pattern="[0-9]*"
          {...register}
        />
        <button
          aria-label={`Aumentar ${label}`}
          disabled={currentValue >= maxValue}
          onClick={() => onUpdate(field, currentValue + 1, maxValue)}
          type="button"
        >
          +
        </button>
      </div>
      <span className="attribute-base">{sideValue}</span>
      <output className="attribute-total">{totalValue}</output>
    </div>
  )
}

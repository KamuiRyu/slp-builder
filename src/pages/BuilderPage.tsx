import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { ELEMENTS } from '../config/elements'
import { EQUIPMENTS } from '../config/equipments'
import { LINEAGES } from '../config/lineages'
import { NINJA_RANKS } from '../config/ranks'
import {
  BUFF_SKILLS,
  ELEMENTAL_SKILLS,
  LINEAGE_BUFF_SKILLS,
  LINEAGE_SKILLS,
} from '../config/skills'
import { BuildPreview } from '../components/BuildPreview'
import { BuilderForm } from '../components/BuilderForm'
import {
  INITIAL_ATTRIBUTE_POINTS,
  INITIAL_TRAINING_POINTS,
} from '../types/attributes'
import type { Build } from '../types/build'
import { createShareUrl, readSharedBuild } from '../utils/share'
import { calculateFinalStats } from '../utils/stats'
import { buildSchema, type BuildFormValues } from '../utils/validation'

const DEFAULT_BUILD: Build = {
  name: 'Novo shinobi',
  rankId: NINJA_RANKS[0].id,
  lineageId: LINEAGES[0].id,
  elementIds: [ELEMENTS[0].id],
  attributes: INITIAL_ATTRIBUTE_POINTS,
  training: INITIAL_TRAINING_POINTS,
  equipments: {},
  selectedSkills: {
    lineageSkillIds: [],
    elementalSkillIds: [],
    buffSkillIds: [],
  },
  skillLevels: {},
}

type LegacyPersistedBuild = Partial<Build> & {
  elementId?: string
  elementIds?: Array<string | undefined>
}

const ACTIVE_ELEMENT_SLOTS = 1

function normalizeElementIds(build: LegacyPersistedBuild): [string, string?] {
  const primaryElementId =
    build.elementIds?.[0] ?? build.elementId ?? DEFAULT_BUILD.elementIds[0]
  const secondaryElementId =
    build.elementIds?.[1] && build.elementIds[1] !== primaryElementId
      ? build.elementIds[1]
      : undefined

  return secondaryElementId
    ? [primaryElementId, secondaryElementId]
    : [primaryElementId]
}

function normalizeBuild(build: LegacyPersistedBuild): Build {
  const elementIds = normalizeElementIds(build)
  const buildWithoutLegacyElementId = { ...build }
  delete buildWithoutLegacyElementId.elementId

  return {
    ...DEFAULT_BUILD,
    ...buildWithoutLegacyElementId,
    elementIds,
    attributes: {
      ...INITIAL_ATTRIBUTE_POINTS,
      ...build.attributes,
    },
    training: {
      ...INITIAL_TRAINING_POINTS,
      ...build.training,
    },
    equipments: {
      ...build.equipments,
    },
    selectedSkills: {
      ...DEFAULT_BUILD.selectedSkills,
      ...build.selectedSkills,
    },
    skillLevels: {
      ...build.skillLevels,
    },
  }
}

export function BuilderPage() {
  const form = useForm<BuildFormValues>({
    resolver: zodResolver(buildSchema),
    mode: 'onChange',
    defaultValues: normalizeBuild(readSharedBuild() ?? DEFAULT_BUILD),
  })

  const build = useWatch({ control: form.control }) as Build
  const activeRank =
    NINJA_RANKS.find((rank) => rank.id === build.rankId) ?? NINJA_RANKS[0]
  const lineageSkills = LINEAGE_SKILLS[build.lineageId] ?? []
  const activeElementIds = build.elementIds
    .slice(0, ACTIVE_ELEMENT_SLOTS)
    .filter((elementId): elementId is string => Boolean(elementId))
  const elementalSkills = activeElementIds.flatMap(
    (elementId) => ELEMENTAL_SKILLS[elementId] ?? [],
  )
  const activeDamageSkills = [...lineageSkills, ...elementalSkills]
  const availableBuffSkills = [
    ...BUFF_SKILLS,
    ...(LINEAGE_BUFF_SKILLS[build.lineageId] ?? []),
  ]
  const finalStats = calculateFinalStats(
    build,
    activeRank,
    EQUIPMENTS,
    availableBuffSkills,
  )
  const shareUrl = createShareUrl(build)

  async function copyShareUrl() {
    await navigator.clipboard.writeText(shareUrl)
  }

  return (
    <main className="app-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <h1>SLP Builder</h1>
          <p>Monte seu shinobi</p>
        </div>
      </section>

      <div className="builder-layout">
        <BuilderForm
          build={build}
          buffSkills={availableBuffSkills}
          elements={ELEMENTS}
          equipments={EQUIPMENTS}
          errors={form.formState.errors}
          lineages={LINEAGES}
          ranks={NINJA_RANKS}
          register={form.register}
          setValue={form.setValue}
        />
        <BuildPreview
          build={build}
          damageSkills={activeDamageSkills}
          finalStats={finalStats}
          maxAttributePoints={activeRank.maxAttributePoints}
          maxTrainableAttributePoints={activeRank.maxTrainableAttributePoints}
          onCopyShareUrl={copyShareUrl}
          shareUrl={shareUrl}
        />
      </div>
    </main>
  )
}

import { zodResolver } from '@hookform/resolvers/zod'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { ELEMENTS } from '../config/elements'
import { EQUIPMENTS } from '../config/equipments'
import { LINEAGES } from '../config/lineages'
import { NINJA_RANKS } from '../config/ranks'
import {
  BUFF_SKILLS,
  ELEMENTAL_SKILLS,
  GENERAL_SKILLS,
  LINEAGE_BUFF_SKILLS,
  LINEAGE_SKILLS,
} from '../config/skills'
import { BuildPreview } from '../components/BuildPreview'
import type { DamageSkillGroup } from '../components/BuildPreview'
import { BuilderForm } from '../components/BuilderForm'
import { BuildLibrary } from '../components/BuildLibrary'
import {
  INITIAL_ATTRIBUTE_POINTS,
  INITIAL_TRAINING_POINTS,
} from '../types/attributes'
import type { Build } from '../types/build'
import {
  createSavedBuild,
  readSavedBuilds,
  writeSavedBuilds,
} from '../utils/localBuilds'
import { getPublicAssetUrl } from '../utils/assets'
import { createShareUrl, encodeBuild, readSharedBuild } from '../utils/share'
import { calculateFinalStats } from '../utils/stats'
import { buildSchema, type BuildFormValues } from '../utils/validation'

const DEFAULT_BUILD: Build = {
  name: 'Novo shinobi',
  rankId: NINJA_RANKS[0].id,
  lineageId: LINEAGES[0].id,
  avatarId: 'random',
  avatarImageIndex: 0,
  elementIds: [ELEMENTS[0].id],
  attributes: INITIAL_ATTRIBUTE_POINTS,
  training: INITIAL_TRAINING_POINTS,
  equipments: {},
  selectedSkills: {
    lineageSkillIds: [],
    elementalSkillIds: [],
    buffSkillIds: [],
    generalSkillIds: [],
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
      weaponId: build.equipments?.weaponId,
      equipment1Id: build.equipments?.equipment1Id ?? (build.equipments as any)?.armorId,
      equipment2Id: build.equipments?.equipment2Id,
      bandanaId: build.equipments?.bandanaId ?? (build.equipments as any)?.accessoryId,
      ninjaToolId: build.equipments?.ninjaToolId,
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
  const appBackgroundStyle = {
    '--app-background-image': `url("${getPublicAssetUrl(
      '/images/background.webp',
    )}")`,
  } as CSSProperties

  const [savedBuilds, setSavedBuilds] = useState(() =>
    readSavedBuilds().map((savedBuild) => ({
      ...savedBuild,
      build: normalizeBuild(savedBuild.build),
    })),
  )
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
  const weaponSkills =
    EQUIPMENTS.find((equipment) => equipment.id === build.equipments.weaponId)
      ?.exclusiveSkills ?? []
  const damageSkillGroups: DamageSkillGroup[] = [
    {
      id: 'lineage',
      title: 'Linhagem',
      emptyMessage: 'Nenhum jutsu de linhagem disponível.',
      skills: lineageSkills,
    },
    {
      id: 'element',
      title: 'Elemento',
      emptyMessage: 'Nenhum jutsu elemental disponível.',
      skills: elementalSkills,
    },
    {
      id: 'weapon',
      title: 'Arma',
      emptyMessage: 'Equipe uma arma com skill exclusiva.',
      skills: weaponSkills,
    },
    {
      id: 'general',
      title: 'Geral',
      emptyMessage: 'Nenhum jutsu geral selecionado.',
      skills: GENERAL_SKILLS,
    },
  ]
  const availableBuffSkills = [
    ...BUFF_SKILLS,
    ...(LINEAGE_BUFF_SKILLS[build.lineageId] ?? []),
  ]
  const finalStats = calculateFinalStats(
    build,
    activeRank,
    EQUIPMENTS,
    [...availableBuffSkills, ...GENERAL_SKILLS],
  )
  const shareUrl = createShareUrl(build)

  async function copyShareUrl() {
    await navigator.clipboard.writeText(shareUrl)
  }

  function loadSavedBuild(savedBuild: Build) {
    form.reset(normalizeBuild(savedBuild))
  }

  function deleteSavedBuild(buildId: string) {
    const nextSavedBuilds = savedBuilds.filter(
      (savedBuild) => savedBuild.id !== buildId,
    )

    setSavedBuilds(nextSavedBuilds)
    writeSavedBuilds(nextSavedBuilds)
  }
  async function copyBuildData() {
    await navigator.clipboard.writeText(encodeBuild(build))
  }

  function saveCurrentBuild() {
    const nextSavedBuilds = [
      createSavedBuild(normalizeBuild(build)),
      ...savedBuilds,
    ]

    setSavedBuilds(nextSavedBuilds)
    writeSavedBuilds(nextSavedBuilds)
  }

  return (
    <main className="app-shell" style={appBackgroundStyle}>


      <div className="builder-layout">
        <BuilderForm
          build={build}
          buffSkills={availableBuffSkills}
          generalSkills={GENERAL_SKILLS.filter((skill) => skill.effects && skill.effects.length > 0)}
          elements={ELEMENTS}
          equipments={EQUIPMENTS}
          errors={form.formState.errors}
          lineages={LINEAGES}
          ranks={NINJA_RANKS}
          register={form.register}
          setValue={form.setValue}
        />
        <div className="builder-sidebar">
          <BuildPreview
            build={build}
            damageSkillGroups={damageSkillGroups}
            finalStats={finalStats}
            maxAttributePoints={activeRank.maxAttributePoints}
            maxTrainableAttributePoints={activeRank.maxTrainableAttributePoints}
            onCopyShareUrl={copyShareUrl}
            shareUrl={shareUrl}
          />
        </div>
      </div>


      <BuildLibrary
        build={build}
        damageSkillGroups={damageSkillGroups}
        elements={ELEMENTS}
        equipments={EQUIPMENTS}
        finalStats={finalStats}
        lineages={LINEAGES}
        onCopyBuildData={copyBuildData}
        onCopyShareUrl={copyShareUrl}
        onDeleteBuild={deleteSavedBuild}
        onLoadBuild={loadSavedBuild}
        onSaveBuild={saveCurrentBuild}
        onUpdateBuild={(field, value) =>
          form.setValue(field, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
        ranks={NINJA_RANKS}
        savedBuilds={savedBuilds}
      />
    </main>
  )
}

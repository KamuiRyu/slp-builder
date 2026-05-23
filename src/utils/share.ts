import type { Build } from '../types/build'

type CompactBuild = [
  version: 2 | 3 | 4 | 5,
  name: string,
  rankId: string,
  lineageId: string,
  elementIds: [string, string?],
  attributes: [number, number, number, number, number, number],
  training: [number, number, number, number],
  equipments: Array<string | undefined>,
  selectedSkills: [string[], string[], string[], string[]?],
  skillLevels: Record<string, number>,
  avatarId?: string,
  avatarImageIndex?: number,
]

function encodeBase64Url(json: string): string {
  const bytes = new TextEncoder().encode(json)
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')

  return btoa(binary)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '')
}

function decodeBase64(encoded: string): string {
  const normalized = encoded.replaceAll('-', '+').replaceAll('_', '/')
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    '=',
  )
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  return new TextDecoder().decode(bytes)
}

function compactBuild(build: Build): CompactBuild {
  return [
    5,
    build.name,
    build.rankId,
    build.lineageId,
    build.elementIds,
    [
      build.attributes.vida,
      build.attributes.chakra,
      build.attributes.taijutsu,
      build.attributes.ninjutsu,
      build.attributes.genjutsu,
      build.attributes.kenjutsu,
    ],
    [
      build.training.taijutsu,
      build.training.ninjutsu,
      build.training.genjutsu,
      build.training.kenjutsu,
    ],
    [
      build.equipments.weaponId,
      build.equipments.equipment1Id,
      build.equipments.equipment2Id,
      build.equipments.bandanaId,
      build.equipments.ninjaToolId,
    ],
    [
      build.selectedSkills.lineageSkillIds,
      build.selectedSkills.elementalSkillIds,
      build.selectedSkills.buffSkillIds,
      build.selectedSkills.generalSkillIds,
    ],
    build.skillLevels,
    build.avatarId,
    build.avatarImageIndex,
  ]
}

function expandBuild(compact: CompactBuild): Build {
  const [
    version,
    name,
    rankId,
    lineageId,
    elementIds,
    attributes,
    training,
    equipments,
    selectedSkills,
    skillLevels,
    avatarId,
    avatarImageIndex,
  ] = compact

  const expandedEquipments = version >= 3 ? {
    weaponId: equipments[0],
    equipment1Id: equipments[1],
    equipment2Id: equipments[2],
    bandanaId: equipments[3],
    ninjaToolId: equipments[4],
  } : {
    weaponId: equipments[0],
    equipment1Id: equipments[1],
    equipment2Id: undefined,
    bandanaId: equipments[2],
    ninjaToolId: equipments[3],
  }

  return {
    name,
    rankId,
    lineageId,
    avatarId: version >= 4 ? avatarId : 'random',
    avatarImageIndex: version >= 4 ? avatarImageIndex : 0,
    elementIds,
    attributes: {
      vida: attributes[0],
      chakra: attributes[1],
      taijutsu: attributes[2],
      ninjutsu: attributes[3],
      genjutsu: attributes[4],
      kenjutsu: attributes[5],
    },
    training: {
      taijutsu: training[0],
      ninjutsu: training[1],
      genjutsu: training[2],
      kenjutsu: training[3],
    },
    equipments: expandedEquipments,
    selectedSkills: {
      lineageSkillIds: selectedSkills[0],
      elementalSkillIds: selectedSkills[1],
      buffSkillIds: selectedSkills[2],
      generalSkillIds: version >= 5 ? (selectedSkills[3] ?? []) : [],
    },
    skillLevels,
  }
}

function isCompactBuild(value: unknown): value is CompactBuild {
  return Array.isArray(value) && (value[0] === 2 || value[0] === 3 || value[0] === 4 || value[0] === 5)
}

export function encodeBuild(build: Build): string {
  return encodeBase64Url(JSON.stringify(compactBuild(build)))
}

export function decodeBuild(encoded: string): Build {
  const decoded = JSON.parse(decodeBase64(encoded)) as unknown

  return isCompactBuild(decoded) ? expandBuild(decoded) : (decoded as Build)
}

export function createShareUrl(build: Build): string {
  const url = new URL(window.location.href)

  url.searchParams.set('build', encodeBuild(build))

  return url.toString()
}

export function readSharedBuild(): Build | null {
  const encoded = new URLSearchParams(window.location.search).get('build')

  if (!encoded) {
    return null
  }

  try {
    return decodeBuild(encoded)
  } catch {
    return null
  }
}

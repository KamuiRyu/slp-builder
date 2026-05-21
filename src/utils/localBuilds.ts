import type { Build } from '../types/build'

const STORAGE_KEY = 'shinobi-builder:saved-builds'

export type SavedBuild = {
  id: string
  name: string
  build: Build
  createdAt: string
  updatedAt: string
}

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

function createSavedBuildId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function readSavedBuilds(): SavedBuild[] {
  if (!canUseStorage()) {
    return []
  }

  const rawBuilds = window.localStorage.getItem(STORAGE_KEY)

  if (!rawBuilds) {
    return []
  }

  try {
    const savedBuilds = JSON.parse(rawBuilds) as SavedBuild[]

    return Array.isArray(savedBuilds) ? savedBuilds : []
  } catch {
    return []
  }
}

export function writeSavedBuilds(savedBuilds: SavedBuild[]): void {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBuilds))
}

export function createSavedBuild(build: Build): SavedBuild {
  const now = new Date().toISOString()

  return {
    id: createSavedBuildId(),
    name: build.name.trim() || 'Shinobi sem nome',
    build,
    createdAt: now,
    updatedAt: now,
  }
}

import type { Build } from '../types/build'

export function encodeBuild(build: Build): string {
  const json = JSON.stringify(build)
  const bytes = new TextEncoder().encode(json)
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')

  return btoa(binary)
}

export function decodeBuild(encoded: string): Build {
  const binary = atob(encoded)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  const json = new TextDecoder().decode(bytes)

  return JSON.parse(json) as Build
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

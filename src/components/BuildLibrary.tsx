import {
  BookOpen,
  CheckCircle2,
  Clipboard,
  Database,
  Link,
  Save,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BrandLogo } from './BrandLogo'
import type { Build } from '../types/build'
import type { SavedBuild } from '../utils/localBuilds'

type BuildLibraryProps = {
  build: Build
  lineages: Array<{ id: string; name: string }>
  ranks: Array<{ id: string; name: string }>
  savedBuilds: SavedBuild[]
  onCopyShareUrl: () => Promise<void> | void
  onCopyBuildData: () => Promise<void> | void
  onDeleteBuild: (buildId: string) => void
  onLoadBuild: (build: Build) => void
  onSaveBuild: () => void
}

export function BuildLibrary({
  build,
  lineages,
  ranks,
  savedBuilds,
  onCopyShareUrl,
  onCopyBuildData,
  onDeleteBuild,
  onLoadBuild,
  onSaveBuild,
}: BuildLibraryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState<{
    title: string
    description: string
  } | null>(null)
  const toastTimeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      window.clearTimeout(toastTimeoutRef.current)
    }
  }, [])

  function getBuildSummary(savedBuild: Build): string {
    const rank = ranks.find((item) => item.id === savedBuild.rankId)
    const lineage = lineages.find((item) => item.id === savedBuild.lineageId)

    return `${rank?.name ?? savedBuild.rankId} / ${
      lineage?.name ?? savedBuild.lineageId
    }`
  }

  function showToast(title: string, description: string) {
    window.clearTimeout(toastTimeoutRef.current)
    setToast({ title, description })
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 2600)
  }

  function saveBuild() {
    onSaveBuild()
    showToast('Build salva', 'Sua build foi salva neste navegador.')
  }

  async function copyBuildData() {
    try {
      await onCopyBuildData()
      showToast('Dados copiados', 'O código da build foi copiado.')
    } catch {
      showToast('Não foi possível copiar', 'Tente novamente pelo navegador.')
    }
  }

  async function copyShareUrl() {
    try {
      await onCopyShareUrl()
      showToast('Link copiado', 'O link compartilhável da build foi copiado.')
    } catch {
      showToast('Não foi possível copiar', 'Tente novamente pelo navegador.')
    }
  }

  function deleteBuild(savedBuild: SavedBuild) {
    onDeleteBuild(savedBuild.id)
    showToast('Build excluída', `${savedBuild.name} foi removida.`)
  }

  return (
    <>
      <section className="build-library">
        <div className="library-brand">
          <BrandLogo />
        </div>

        <div className="library-actions">
          <button className="primary-action" type="button" onClick={saveBuild}>
            <Save aria-hidden="true" />
            Salvar
          </button>
          <button type="button" onClick={() => setIsOpen(true)}>
            <Database aria-hidden="true" />
            Builds
            <span>{savedBuilds.length}</span>
          </button>
          <button type="button" onClick={copyBuildData}>
            <Clipboard aria-hidden="true" />
            Dados
          </button>
          <button type="button" onClick={copyShareUrl}>
            <Link aria-hidden="true" />
            Link
          </button>
        </div>
      </section>

      {isOpen && (
        <div className="library-modal-backdrop">
          <section className="saved-builds-card library-modal">
            <div className="library-panel-header">
              <div>
                <span className="eyebrow">Escolher build</span>
                <h2>Builds salvas</h2>
              </div>
              <button
                aria-label="Fechar builds salvas"
                className="icon-action"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <div className="library-modal-summary">
              <BookOpen aria-hidden="true" />
              <span>
                Editando agora: <strong>{build.name || 'Shinobi sem nome'}</strong>
              </span>
            </div>

            {savedBuilds.length === 0 ? (
              <p className="muted library-empty">
                Salve a build atual para carregar de novo neste navegador.
              </p>
            ) : (
              <div className="saved-build-list">
                {savedBuilds.map((savedBuild, index) => (
                  <article
                    className="saved-build-row"
                    key={savedBuild.id}
                    style={{ animationDelay: `${index * 35}ms` }}
                  >
                    <div>
                      <strong>{savedBuild.name}</strong>
                      <span>{getBuildSummary(savedBuild.build)}</span>
                    </div>
                    <button
                      aria-label={`Carregar ${savedBuild.name}`}
                      type="button"
                      onClick={() => {
                        onLoadBuild(savedBuild.build)
                        setIsOpen(false)
                      }}
                    >
                      <Upload aria-hidden="true" />
                      Carregar
                    </button>
                    <button
                      aria-label={`Excluir ${savedBuild.name}`}
                      className="icon-action"
                      type="button"
                      onClick={() => deleteBuild(savedBuild)}
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
      {toast && (
        <div className="library-toast" role="status">
          <CheckCircle2 aria-hidden="true" />
          <span>
            <strong>{toast.title}</strong>
            <small>{toast.description}</small>
          </span>
        </div>
      )}
    </>
  )
}

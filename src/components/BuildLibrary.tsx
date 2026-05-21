import { Clipboard, Link, Save, Trash2, Upload } from 'lucide-react'
import type { Build } from '../types/build'
import type { SavedBuild } from '../utils/localBuilds'

type BuildLibraryProps = {
  build: Build
  lineages: Array<{ id: string; name: string }>
  ranks: Array<{ id: string; name: string }>
  savedBuilds: SavedBuild[]
  onCopyShareUrl: () => void
  onCopyBuildData: () => void
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
  function getBuildSummary(savedBuild: Build): string {
    const rank = ranks.find((item) => item.id === savedBuild.rankId)
    const lineage = lineages.find((item) => item.id === savedBuild.lineageId)

    return `${rank?.name ?? savedBuild.rankId} / ${
      lineage?.name ?? savedBuild.lineageId
    }`
  }

  return (
    <section className="build-library">
      <div className="library-actions">
        <button className="primary-action" type="button" onClick={onSaveBuild}>
          <Save aria-hidden="true" />
          Salvar build
        </button>
        <button type="button" onClick={onCopyBuildData}>
          <Clipboard aria-hidden="true" />
          Copiar dados
        </button>
        <button type="button" onClick={onCopyShareUrl}>
          <Link aria-hidden="true" />
          Copiar link
        </button>
      </div>

      <div className="saved-builds-card">
        <span className="eyebrow">LocalStorage</span>
        <h2>Builds salvas</h2>

        {savedBuilds.length === 0 ? (
          <p className="muted library-empty">
            Salve a build atual para carregar de novo neste navegador.
          </p>
        ) : (
          <div className="saved-build-list">
            {savedBuilds.map((savedBuild) => (
              <article className="saved-build-row" key={savedBuild.id}>
                <div>
                  <strong>{savedBuild.name}</strong>
                  <span>{getBuildSummary(savedBuild.build)}</span>
                </div>
                <button
                  aria-label={`Carregar ${savedBuild.name}`}
                  type="button"
                  onClick={() => onLoadBuild(savedBuild.build)}
                >
                  <Upload aria-hidden="true" />
                  Carregar
                </button>
                <button
                  aria-label={`Excluir ${savedBuild.name}`}
                  className="icon-action"
                  type="button"
                  onClick={() => onDeleteBuild(savedBuild.id)}
                >
                  <Trash2 aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        )}

        <p className="library-current">
          Editando agora: <strong>{build.name || 'Shinobi sem nome'}</strong>
        </p>
      </div>
    </section>
  )
}

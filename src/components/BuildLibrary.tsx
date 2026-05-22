import {
  BookOpen,
  CheckCircle2,
  Clipboard,
  Database,
  Download,
  Image,
  Link,
  Save,
  Trash2,
  Upload,
  X,
  AlertCircle,
  Info,
} from 'lucide-react'
import { toPng } from 'html-to-image'
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { BrandLogo } from './BrandLogo'
import {
  ATTRIBUTE_LABELS,
  DISTRIBUTABLE_ATTRIBUTES,
  TRAINABLE_ATTRIBUTES,
  type AttributeKey,
  type Attributes,
} from '../types/attributes'
import { AttributeIcon } from './AttributeIcon'
import type { Build, Element, Lineage } from '../types/build'
import type { DamageSkillGroup } from './BuildPreview'
import type { Equipment, EquipmentType } from '../types/equipment'
import type { SavedBuild } from '../utils/localBuilds'
import { getPublicAssetUrl } from '../utils/assets'
import { calculateDamage } from '../utils/damage'
import { convertAttributePointsToStat } from '../utils/stats'

type BuildLibraryProps = {
  build: Build
  damageSkillGroups: DamageSkillGroup[]
  elements: Element[]
  equipments: Equipment[]
  finalStats: Attributes
  lineages: Lineage[]
  ranks: Array<{ id: string; name: string }>
  savedBuilds: SavedBuild[]
  onCopyShareUrl: () => Promise<void> | void
  onCopyBuildData: () => Promise<void> | void
  onDeleteBuild: (buildId: string) => void
  onLoadBuild: (build: Build) => void
  onSaveBuild: () => void
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

const UNKNOWN_IMAGE = '/images/elementals/unknown.png'

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

const MINI_ATTR_LABELS: Record<string, string> = {
  vida: 'HP',
  chakra: 'CK',
  taijutsu: 'Tai',
  ninjutsu: 'Nin',
  genjutsu: 'Gen',
  kenjutsu: 'Ken',
}

const CARD_THEMES = [
  { id: 'dark', name: 'Dark Forge' },
  { id: 'scroll', name: 'Pergaminho' },
  { id: 'akatsuki', name: 'Akatsuki' },
  { id: 'sage', name: 'Sábio' },
  { id: 'chakra', name: 'Chakra' },
]

export function BuildLibrary({
  build,
  damageSkillGroups,
  elements,
  equipments,
  finalStats,
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
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCardTheme, setActiveCardTheme] = useState('dark')
  const [toast, setToast] = useState<{
    title: string
    description: string
    type?: 'success' | 'info' | 'error' | 'delete'
  } | null>(null)
  const [previewScale, setPreviewScale] = useState(1)
  
  const shareCardRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const toastTimeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      window.clearTimeout(toastTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isShareOpen) return

    const updateScale = () => {
      if (!stageRef.current) return
      const stageWidth = stageRef.current.clientWidth
      const computedStyle = window.getComputedStyle(stageRef.current)
      const paddingLeft = parseFloat(computedStyle.paddingLeft || '0')
      const paddingRight = parseFloat(computedStyle.paddingRight || '0')
      const contentWidth = stageWidth - paddingLeft - paddingRight

      const cardWidth = 1600
      const newScale = Math.min(1, contentWidth / cardWidth)
      setPreviewScale(newScale)
    }

    const rafId = requestAnimationFrame(updateScale)
    
    const observer = new ResizeObserver(() => {
      updateScale()
    })
    
    if (stageRef.current) {
      observer.observe(stageRef.current)
    }
    
    window.addEventListener('resize', updateScale)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener('resize', updateScale)
    }
  }, [isShareOpen])

  function getBuildSummary(savedBuild: Build): string {
    const rank = ranks.find((item) => item.id === savedBuild.rankId)
    const lineage = lineages.find((item) => item.id === savedBuild.lineageId)

    return `${rank?.name ?? savedBuild.rankId} / ${
      lineage?.name ?? savedBuild.lineageId
    }`
  }

  function showToast(title: string, description: string, type: 'success' | 'info' | 'error' | 'delete' = 'success') {
    window.clearTimeout(toastTimeoutRef.current)
    setToast({ title, description, type })
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 2600)
  }

  function saveBuild() {
    onSaveBuild()
    showToast('Build salva', 'Sua build foi salva neste navegador.', 'success')
  }

  async function copyBuildData() {
    try {
      await onCopyBuildData()
      showToast('Dados copiados', 'O código da build foi copiado.', 'success')
    } catch {
      showToast('Não foi possível copiar', 'Tente novamente pelo navegador.', 'error')
    }
  }

  async function copyShareUrl() {
    try {
      await onCopyShareUrl()
      showToast('Link copiado', 'O link compartilhável da build foi copiado.', 'success')
    } catch {
      showToast('Não foi possível copiar', 'Tente novamente pelo navegador.', 'error')
    }
  }

  function deleteBuild(savedBuild: SavedBuild) {
    onDeleteBuild(savedBuild.id)
    showToast('Build excluída', `${savedBuild.name} foi removida.`, 'delete')
  }

  async function downloadShareImage() {
    if (!shareCardRef.current) {
      return
    }

    setIsGeneratingImage(true)

    try {
      const dataUrl = await toPng(shareCardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      })
      const link = document.createElement('a')
      const fileName = (build.name || 'shinobi-build')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

      link.download = `${fileName || 'shinobi-build'}.png`
      link.href = dataUrl
      link.click()
      showToast('Imagem gerada', 'O PNG da build foi baixado.', 'success')
    } catch {
      showToast('Não foi possível gerar', 'Tente novamente em alguns instantes.', 'error')
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const filteredBuilds = savedBuilds.filter((item) => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return true
    const nameMatch = item.name.toLowerCase().includes(term)
    const rank = ranks.find((r) => r.id === item.build.rankId)
    const lineage = lineages.find((l) => l.id === item.build.lineageId)
    const element = elements.find((e) => item.build.elementIds?.includes(e.id))
    const rankMatch = rank?.name.toLowerCase().includes(term)
    const lineageMatch = lineage?.name.toLowerCase().includes(term)
    const elementMatch = element?.name.toLowerCase().includes(term)
    return nameMatch || rankMatch || lineageMatch || elementMatch
  })

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
          <button type="button" onClick={() => setIsShareOpen(true)}>
            <Image aria-hidden="true" />
            Imagem
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

            {savedBuilds.length > 0 && (
              <div className="library-search-wrapper">
                <input
                  type="text"
                  placeholder="Buscar por nome, linhagem, rank..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="library-search-input"
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchTerm('')}
                    aria-label="Limpar busca"
                  >
                    <X aria-hidden="true" />
                  </button>
                )}
              </div>
            )}

            {savedBuilds.length === 0 ? (
              <p className="muted library-empty">
                Salve a build atual para carregar de novo neste navegador.
              </p>
            ) : filteredBuilds.length === 0 ? (
              <p className="muted library-empty">
                Nenhuma build corresponde ao termo pesquisado.
              </p>
            ) : (
              <div className="saved-build-list">
                {filteredBuilds.map((savedBuild, index) => (
                  <article
                    className="saved-build-row"
                    key={savedBuild.id}
                    style={{ animationDelay: `${index * 35}ms` }}
                  >
                    <div className="build-info">
                      <strong>{savedBuild.name}</strong>
                      <span>{getBuildSummary(savedBuild.build)}</span>
                      
                      <div className="mini-stats-grid">
                        {DISTRIBUTABLE_ATTRIBUTES.map((attr) => {
                          const val = savedBuild.build.attributes[attr] || 0
                          const trained = attr in savedBuild.build.training
                            ? savedBuild.build.training[attr as keyof typeof savedBuild.build.training] || 0
                            : 0
                          const total = val + trained
                          if (total === 0) return null
                          
                          const color = attributeColors[attr]
                          return (
                            <div key={attr} className="mini-stat-bar-container" style={{ '--attr-color': color } as CSSProperties}>
                              <span className="mini-stat-label">{MINI_ATTR_LABELS[attr] || attr}</span>
                              <div className="mini-stat-bar-outer">
                                <div className="mini-stat-bar-inner" style={{ width: `${Math.min(100, (total / 125) * 100)}%` }} />
                              </div>
                              <span className="mini-stat-value">{total}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <button
                      aria-label={`Carregar ${savedBuild.name}`}
                      type="button"
                      onClick={() => {
                        onLoadBuild(savedBuild.build)
                        setIsOpen(false)
                        setSearchTerm('')
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
      {isShareOpen && (
        <div className="library-modal-backdrop">
          <section className="saved-builds-card share-modal">
            <div className="library-panel-header">
              <div>
                <span className="eyebrow">Compartilhar</span>
                <h2>Imagem da build</h2>
              </div>
              <button
                aria-label="Fechar imagem da build"
                className="icon-action"
                onClick={() => setIsShareOpen(false)}
                type="button"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <div className="theme-selector-bar">
              <span className="theme-selector-label">Tema:</span>
              <div className="theme-tabs">
                {CARD_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    className={`theme-tab-btn ${activeCardTheme === theme.id ? 'active' : ''}`}
                    onClick={() => setActiveCardTheme(theme.id)}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="share-card-stage" ref={stageRef}>
              <div
                className="share-card-scaler"
                style={{
                  width: `${1600 * previewScale}px`,
                  height: `${1120 * previewScale}px`,
                  overflow: 'hidden',
                  position: 'relative',
                  margin: '0 auto',
                }}
              >
                <div
                  className="share-card-wrapper"
                  style={{
                    width: '1600px',
                    height: '1120px',
                    transform: `scale(${previewScale})`,
                    transformOrigin: 'top left',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                >
                  <BuildShareCard
                    build={build}
                    damageSkillGroups={damageSkillGroups}
                    elements={elements}
                    equipments={equipments}
                    finalStats={finalStats}
                    lineages={lineages}
                    cardRef={shareCardRef}
                    theme={activeCardTheme}
                  />
                </div>
              </div>
            </div>

            <div className="share-modal-actions">
              <button
                className="primary-action"
                disabled={isGeneratingImage}
                onClick={downloadShareImage}
                type="button"
              >
                <Download aria-hidden="true" />
                {isGeneratingImage ? 'Gerando...' : 'Baixar PNG'}
              </button>
            </div>
          </section>
        </div>
      )}
      {toast && (
        <div className={`library-toast toast-${toast.type || 'success'}`} role="status">
          {toast.type === 'delete' ? (
            <Trash2 aria-hidden="true" />
          ) : toast.type === 'error' ? (
            <AlertCircle aria-hidden="true" />
          ) : toast.type === 'info' ? (
            <Info aria-hidden="true" />
          ) : (
            <CheckCircle2 aria-hidden="true" />
          )}
          <span>
            <strong>{toast.title}</strong>
            <small>{toast.description}</small>
          </span>
        </div>
      )}
    </>
  )
}

type BuildShareCardProps = {
  build: Build
  damageSkillGroups: DamageSkillGroup[]
  cardRef: RefObject<HTMLDivElement | null>
  elements: Element[]
  equipments: Equipment[]
  finalStats: Attributes
  lineages: Lineage[]
  theme: string
}

function BuildShareCard({
  build,
  damageSkillGroups,
  cardRef,
  elements,
  equipments,
  finalStats,
  lineages,
  theme,
}: BuildShareCardProps) {
  const lineage = lineages.find((item) => item.id === build.lineageId)
  const element = elements.find((item) => item.id === build.elementIds[0])
  const selectedEquipments = equipmentFields.map(({ type, field }) => ({
    label: equipmentLabels[type],
    equipment: equipments.find((item) => item.id === build.equipments[field]),
  }))
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
  const shareSkills = damageSkillGroups.flatMap((group) => group.skills)
  return (
    <div className={`share-card theme-${theme}`} ref={cardRef}>
      <div className="share-card-header">
        <BrandLogo />
        <div className="share-card-meta">
          <strong>{build.name || 'Shinobi sem nome'}</strong>
          <ShareImage imageSrc={lineage?.imageSrc} label="Linhagem" />
          <ShareImage imageSrc={element?.imageSrc} label="Elemento" />
        </div>
        <div className="share-radar-card">
          <ShareAttributeRadar points={build.attributes} training={build.training} />
        </div>
      </div>

      <div className="share-card-grid">
        <section className="share-attributes-panel">
          <span className="share-card-title">Atributos</span>
          <ShareAttributeTable
            distributed={build.attributes}
            equipmentBonuses={equipmentBonuses}
            training={build.training}
          />
        </section>

        <section className="share-equipment-panel">
          <span className="share-card-title">Equipamentos</span>
          <div className="share-equipment-list">
            {selectedEquipments.map(({ label, equipment }) => (
              <div className="share-equipment" key={label}>
                <img
                  alt=""
                  src={getPublicAssetUrl(equipment?.imageSrc ?? UNKNOWN_IMAGE)}
                />
                <span>
                  <small>{label}</small>
                  <strong>{equipment?.name ?? 'Nenhum'}</strong>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="share-jutsus-panel">
          <span className="share-card-title">Jutsus</span>
          {shareSkills.length === 0 ? (
            <p className="share-skill-empty">Nenhum jutsu disponível.</p>
          ) : (
            <div className="share-skill-list">
              {shareSkills.map((skill) => {
                const damage =
                  skill.baseDamage > 0
                    ? calculateDamage(
                        skill.baseDamage,
                        finalStats[skill.scalingAttribute],
                        skill.scalingPercent,
                      )
                    : null
                const skillColor = SKILL_ATTRIBUTE_COLORS[skill.scalingAttribute]
                const attrLabel = SKILL_ATTRIBUTE_LABELS[skill.scalingAttribute]
                const scalingLabel = skill.scalingPercent > 0
                  ? `${Math.round(skill.scalingPercent * 100)}% ${attrLabel}`
                  : null

                return (
                  <div
                    className="share-skill"
                    key={skill.id}
                    style={{ '--skill-color': skillColor } as CSSProperties}
                  >
                    <div className="share-skill-image-wrap">
                      <div className="share-skill-image-ring">
                        <img
                          alt=""
                          src={getPublicAssetUrl(skill.imageSrc ?? UNKNOWN_IMAGE)}
                        />
                      </div>
                    </div>
                    <div className="share-skill-info">
                      <strong>{skill.name}</strong>
                      <div className="share-skill-bottom">
                        <span className="share-skill-attr">{attrLabel}</span>
                        {damage !== null && (
                          <div className="share-skill-damage">
                            <b>{damage}</b>
                            {scalingLabel && <em>{scalingLabel}</em>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>

      <div className="share-card-footer">
        <span>SLP Forge Build</span>
        <span>Build ID: local / Criado em Shinobi Builder</span>
      </div>
    </div>
  )
}

type ShareAttributeTableProps = {
  distributed: Attributes
  equipmentBonuses: Record<AttributeKey, number>
  training: Build['training']
}

const attributeColors: Record<AttributeKey, string> = {
  vida: '#6ee77f',
  chakra: '#5bd9e6',
  taijutsu: '#ff4d5f',
  ninjutsu: '#4aa3ff',
  genjutsu: '#a56cff',
  kenjutsu: '#ffd747',
}

function ShareAttributeTable({
  distributed,
  equipmentBonuses,
  training,
}: ShareAttributeTableProps) {
  return (
    <div className="share-attribute-table">
      <div className="share-attribute-table-head">
        <span>Atributo</span>
        <span>Distribuído</span>
        <span>Treinável</span>
        <span>Equip.</span>
      </div>
      {DISTRIBUTABLE_ATTRIBUTES.map((attribute) => {
        const isTrainable = TRAINABLE_ATTRIBUTES.includes(
          attribute as (typeof TRAINABLE_ATTRIBUTES)[number],
        )

        return (
          <div
            className="share-attribute-row"
            key={attribute}
            style={{
              '--attribute-color': attributeColors[attribute],
            } as CSSProperties}
          >
            <span className="share-attribute-name">
              <AttributeIcon
                attribute={attribute}
                className="share-attribute-icon"
              />
              {ATTRIBUTE_LABELS[attribute]}
            </span>
            <span className="share-attribute-box">{distributed[attribute]}</span>
            <span className="share-attribute-side">
              {isTrainable
                ? training[attribute as (typeof TRAINABLE_ATTRIBUTES)[number]]
                : 0}
            </span>
            <b>{equipmentBonuses[attribute]}</b>
          </div>
        )
      })}
    </div>
  )
}

type ShareAttributeRadarProps = {
  points: Attributes
  training: Build['training']
}

function ShareAttributeRadar({ points, training }: ShareAttributeRadarProps) {
  const axes = [
    { color: '#6ee77f', key: 'vida',      shortLabel: 'Vida',   fullLabel: 'Vida'      },
    { color: '#5bd9e6', key: 'chakra',    shortLabel: 'Cha',    fullLabel: 'Chakra'    },
    { color: '#4aa3ff', key: 'ninjutsu',  shortLabel: 'Nin',    fullLabel: 'Ninjutsu'  },
    { color: '#ffd747', key: 'kenjutsu',  shortLabel: 'Ken',    fullLabel: 'Kenjutsu'  },
    { color: '#a56cff', key: 'genjutsu',  shortLabel: 'Gen',    fullLabel: 'Genjutsu'  },
    { color: '#ff4d5f', key: 'taijutsu',  shortLabel: 'Tai',    fullLabel: 'Taijutsu'  },
  ] as const

  const cx = 200
  const cy = 200
  const radius = 130
  const minimumVisibleRatio = 0.12

  const axisData = axes.map((axis, index) => {
    const distributed = points[axis.key]
    const trained = axis.key in training
      ? training[axis.key as keyof typeof training]
      : 0
    const raw = distributed + trained
    return { axis, index, raw }
  })

  const maxPoints = Math.max(125, ...axisData.map((a) => a.raw), 1)
  const rings = [0.2, 0.4, 0.6, 0.8, 1]

  function polar(index: number, scale: number) {
    const angle = -90 + index * (360 / axes.length)
    const rad = (Math.PI / 180) * angle
    return {
      x: cx + Math.cos(rad) * radius * scale,
      y: cy + Math.sin(rad) * radius * scale,
    }
  }

  function ringPoints(scale: number) {
    return axes.map((_, i) => {
      const p = polar(i, scale)
      return `${p.x},${p.y}`
    }).join(' ')
  }

  const computedAxes = axisData.map(({ axis, index, raw }) => {
    const ratio = Math.min(raw / maxPoints, 1)
    const visualRatio = raw > 0 ? Math.max(ratio, minimumVisibleRatio) : minimumVisibleRatio
    const outerPoint = polar(index, 1)
    const statPoint = polar(index, visualRatio)
    const labelPoint = polar(index, 1.22)
    const angle = -90 + index * (360 / axes.length)

    let textAnchor: 'start' | 'middle' | 'end' = 'middle'
    if (labelPoint.x < cx - 10) textAnchor = 'end'
    else if (labelPoint.x > cx + 10) textAnchor = 'start'

    return {
      ...axis,
      raw,
      ratio,
      visualRatio,
      outerPoint,
      statPoint,
      labelPoint,
      textAnchor,
      angle,
    }
  })

  const statPolygonPoints = computedAxes
    .map((a) => `${a.statPoint.x},${a.statPoint.y}`)
    .join(' ')

  return (
    <div className="share-attribute-radar">
      <svg aria-hidden="true" viewBox={`0 0 ${cx * 2} ${cy * 2}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Glow filter para o polígono de stats */}
          <filter id="radar-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Gradient radial misturando várias cores */}
          <radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,176,0,0.35)" />
            <stop offset="60%" stopColor="rgba(113,92,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,64,87,0.06)" />
          </radialGradient>
          {/* Glow individual para cada eixo */}
          {computedAxes.map((axis) => (
            <filter key={`glow-${axis.key}`} id={`dot-glow-${axis.key}`} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Anéis de grid com opacidade variável */}
        {rings.map((scale) => (
          <polygon
            fill={scale === 1 ? 'rgba(255,255,255,0.03)' : 'none'}
            key={scale}
            points={ringPoints(scale)}
            stroke={scale === 1 ? 'rgba(198,202,211,0.45)' : 'rgba(198,202,211,0.14)'}
            strokeDasharray={scale < 1 ? '4 3' : undefined}
            strokeWidth={scale === 1 ? 1.5 : 1}
          />
        ))}

        {/* Linhas guia do centro até a borda externa em cada eixo */}
        {computedAxes.map((axis) => (
          <line
            key={`guide-${axis.key}`}
            stroke="rgba(198,202,211,0.18)"
            strokeWidth={1}
            x1={cx}
            x2={axis.outerPoint.x}
            y1={cy}
            y2={axis.outerPoint.y}
          />
        ))}

        {/* Polígono de stats com fill gradiente + glow */}
        <polygon
          fill="url(#radar-fill)"
          filter="url(#radar-glow)"
          points={statPolygonPoints}
          stroke="rgba(255,220,80,0.9)"
          strokeLinejoin="round"
          strokeWidth={2}
        />

        {/* Linhas coloridas do centro até o ponto de stat */}
        {computedAxes.map((axis) => (
          <line
            key={`line-${axis.key}`}
            opacity={0.25 + axis.ratio * 0.75}
            stroke={axis.color}
            strokeLinecap="round"
            strokeWidth={2 + axis.ratio * 2.5}
            x1={cx}
            x2={axis.statPoint.x}
            y1={cy}
            y2={axis.statPoint.y}
          />
        ))}

        {/* Ponto externo fantasma (borda do eixo) */}
        {computedAxes.map((axis) => (
          <circle
            cx={axis.outerPoint.x}
            cy={axis.outerPoint.y}
            fill="rgba(198,202,211,0.25)"
            key={`outer-${axis.key}`}
            r={3}
          />
        ))}

        {/* Ponto de stat com duplo anel + glow */}
        {computedAxes.map((axis) => (
          <g key={`dot-${axis.key}`} filter={`url(#dot-glow-${axis.key})`}>
            {/* Anel externo suave */}
            <circle
              cx={axis.statPoint.x}
              cy={axis.statPoint.y}
              fill="none"
              opacity={axis.ratio > 0 ? 0.45 : 0.2}
              r={6 + axis.ratio * 4}
              stroke={axis.color}
              strokeWidth={1}
            />
            {/* Ponto central sólido */}
            <circle
              cx={axis.statPoint.x}
              cy={axis.statPoint.y}
              fill={axis.color}
              opacity={axis.ratio > 0 ? 1 : 0.35}
              r={3.5 + axis.ratio * 3}
              stroke="rgba(255,255,255,0.8)"
              strokeWidth={1.5}
            />
          </g>
        ))}

        {/* Labels nos eixos com nome + valor total */}
        {computedAxes.map((axis) => (
          <g key={`label-${axis.key}`}>
            <text
              dominantBaseline="central"
              fill={axis.color}
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize={11}
              fontWeight={900}
              opacity={0.5 + axis.ratio * 0.5}
              textAnchor={axis.textAnchor}
              x={axis.labelPoint.x}
              y={axis.labelPoint.y - 7}
            >
              {axis.shortLabel}
            </text>
            <text
              dominantBaseline="central"
              fill="rgba(255,255,255,0.7)"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize={13}
              fontWeight={950}
              opacity={0.4 + axis.ratio * 0.6}
              textAnchor={axis.textAnchor}
              x={axis.labelPoint.x}
              y={axis.labelPoint.y + 7}
            >
              {axis.raw}
            </text>
          </g>
        ))}

        {/* Ponto central */}
        <circle cx={cx} cy={cy} fill="rgba(255,255,255,0.15)" r={4} />
        <circle cx={cx} cy={cy} fill="rgba(255,255,255,0.6)" r={2} />
      </svg>
    </div>
  )
}

type ShareImageProps = {
  imageSrc?: string
  label: string
}

function ShareImage({ imageSrc, label }: ShareImageProps) {
  return (
    <div className="share-origin-image">
      <img alt="" src={getPublicAssetUrl(imageSrc ?? UNKNOWN_IMAGE)} />
      <span>{label}</span>
    </div>
  )
}

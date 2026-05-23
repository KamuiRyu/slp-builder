import { getPublicAssetUrl } from '../utils/assets'

export function BrandLogo() {
  return (
    <div className="brand-logo" aria-label="SLP Forge">
      <img
        alt="Shinobi Legends Forge"
        className="brand-logo-image"
        src={getPublicAssetUrl('/images/logo.webp')}
      />
    </div>
  )
}

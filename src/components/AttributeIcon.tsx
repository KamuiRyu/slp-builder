import type { ComponentType, SVGProps } from 'react'
import { Brain, Dumbbell, HeartPulse, Sparkles, Sword, Zap } from 'lucide-react'
import type { AttributeKey } from '../types/attributes'

type AttributeIconProps = {
  attribute: AttributeKey
  className?: string
}

const attributeIcons: Record<
  AttributeKey,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  vida: HeartPulse,
  chakra: Zap,
  taijutsu: Dumbbell,
  ninjutsu: Sparkles,
  genjutsu: Brain,
  kenjutsu: Sword,
}

export function AttributeIcon({ attribute, className }: AttributeIconProps) {
  const Icon = attributeIcons[attribute]

  return <Icon aria-hidden="true" className={className} />
}

export function calculateDamage(
  baseDamage: number,
  attributeValue: number,
  scalingPercent: number,
): number {
  return Math.round(baseDamage + attributeValue * scalingPercent)
}

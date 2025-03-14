// utils/generateColors.js

export const getColorBlends = (numColors: number = 5, useTailwind = false): string[] => {
  const baseColors = [
    'fwd-purple',
    'fwd-lipstick',
    'fwd-red',
    'fwd-coral-red',
    'fwd-orange',
  ] as const

  const colorToString = (color: (typeof baseColors)[number]) =>
    useTailwind ? color : `var(--color-${color})`

  if (numColors <= 1) return [colorToString(baseColors[0])]
  if (numColors === 5) return baseColors.map(colorToString)

  // For any other number of colors, distribute them evenly
  return Array.from({ length: numColors }, (_, i) => {
    // Map i to a position in the range [0, 4]
    const position = (i / (numColors - 1)) * 4
    const index = Math.min(Math.round(position), 4) as 0 | 1 | 2 | 3 | 4
    return colorToString(baseColors[index])
  })
}

export default getColorBlends

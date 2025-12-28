import { AverageCalculator } from "./average.types"

export const averageCalculators: AverageCalculator[] = [
  {
    id: "mean",
    labelKey: "math.average.mean",
    formula: "\\bar{x} = \\frac{\\sum_{i=1}^{n} x_i}{n}",
  },
  {
    id: "median",
    labelKey: "math.average.median",
    formula:
      "\\tilde{x} = \\begin{cases} x_{\\frac{n+1}{2}} & n \\text{ odd} \\\\ \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & n \\text{ even} \\end{cases}",
  },
  {
    id: "mode",
    labelKey: "math.average.mode",
    formula: "\\text{Mode} = \\text{most frequent value(s)}",
  },
]

/**
 * Calculate the arithmetic mean (average)
 */
export const calculateMean = (numbers: number[]): number => {
  if (numbers.length === 0) return NaN
  const sum = numbers.reduce((acc, n) => acc + n, 0)
  return sum / numbers.length
}

/**
 * Calculate the median (middle value)
 */
export const calculateMedian = (numbers: number[]): number => {
  if (numbers.length === 0) return NaN

  const sorted = [...numbers].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2
  }
  return sorted[mid]
}

/**
 * Calculate the mode (most frequent value(s))
 * Returns array of modes (can have multiple)
 */
export const calculateMode = (numbers: number[]): number[] => {
  if (numbers.length === 0) return []

  const frequency: Record<number, number> = {}
  let maxFreq = 0

  for (const num of numbers) {
    frequency[num] = (frequency[num] || 0) + 1
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num]
    }
  }

  // If all numbers appear only once, there's no mode
  if (maxFreq === 1) return []

  const modes: number[] = []
  for (const [num, freq] of Object.entries(frequency)) {
    if (freq === maxFreq) {
      modes.push(Number(num))
    }
  }

  return modes.sort((a, b) => a - b)
}

/**
 * Parse comma or space separated numbers string
 */
export const parseNumbers = (input: string): number[] => {
  if (!input.trim()) return []

  return input
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map((s) => parseFloat(s))
    .filter((n) => !isNaN(n))
}

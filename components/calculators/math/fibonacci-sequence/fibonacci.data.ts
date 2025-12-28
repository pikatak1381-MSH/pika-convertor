import { FibonacciCalculator } from "./fibonacci.types"

export const fibonacciCalculators: FibonacciCalculator[] = [
  {
    id: "sequence",
    labelKey: "math.fibonacci.sequence",
    inputLabelKey: "math.fibonacci.inputs.count",
    formula: "F_n = F_{n-1} + F_{n-2}",
  },
  {
    id: "nthNumber",
    labelKey: "math.fibonacci.nthNumber",
    inputLabelKey: "math.fibonacci.inputs.position",
    formula: "F_n = \\frac{\\varphi^n - \\psi^n}{\\sqrt{5}}",
  },
  {
    id: "checkFibonacci",
    labelKey: "math.fibonacci.checkFibonacci",
    inputLabelKey: "math.fibonacci.inputs.number",
    formula: "5n^2 \\pm 4 = \\text{perfect square}",
  },
]

/**
 * Generate Fibonacci sequence up to n terms
 */
export const generateSequence = (count: number): number[] => {
  if (count <= 0) return []
  if (count === 1) return [0]
  if (count === 2) return [0, 1]

  const sequence: number[] = [0, 1]
  for (let i = 2; i < count; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2])
  }
  return sequence
}

/**
 * Get the nth Fibonacci number (0-indexed)
 */
export const getNthFibonacci = (n: number): number => {
  if (n < 0) return 0
  if (n === 0) return 0
  if (n === 1) return 1

  let prev = 0
  let curr = 1
  for (let i = 2; i <= n; i++) {
    const next = prev + curr
    prev = curr
    curr = next
  }
  return curr
}

/**
 * Check if a number is a perfect square
 */
const isPerfectSquare = (n: number): boolean => {
  const sqrt = Math.sqrt(n)
  return sqrt === Math.floor(sqrt)
}

/**
 * Check if a number is a Fibonacci number
 * A number is Fibonacci if 5n² + 4 or 5n² - 4 is a perfect square
 */
export const isFibonacci = (n: number): boolean => {
  if (n < 0) return false
  return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4)
}

/**
 * Find the position of a Fibonacci number in the sequence
 */
export const getFibonacciPosition = (n: number): number | null => {
  if (!isFibonacci(n)) return null
  if (n === 0) return 0
  if (n === 1) return 1

  let prev = 0
  let curr = 1
  let pos = 1

  while (curr < n) {
    const next = prev + curr
    prev = curr
    curr = next
    pos++
  }

  return curr === n ? pos : null
}

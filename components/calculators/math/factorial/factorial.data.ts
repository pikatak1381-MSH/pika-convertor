import { FactorialCalculator } from "./factorial.types"

export const factorialCalculators: FactorialCalculator[] = [
  {
    id: "factorial",
    labelKey: "math.factorial.factorial",
    inputs: ["n"],
    formula: "n! = n \\times (n-1) \\times ... \\times 2 \\times 1",
  },
  {
    id: "doubleFactorial",
    labelKey: "math.factorial.doubleFactorial",
    inputs: ["n"],
    formula: "n!! = n \\times (n-2) \\times (n-4) \\times ...",
  },
  {
    id: "permutation",
    labelKey: "math.factorial.permutation",
    inputs: ["n", "r"],
    formula: "P(n,r) = \\frac{n!}{(n-r)!}",
  },
  {
    id: "combination",
    labelKey: "math.factorial.combination",
    inputs: ["n", "r"],
    formula: "C(n,r) = \\frac{n!}{r!(n-r)!}",
  },
]

/**
 * Calculate factorial of n
 */
export const factorial = (n: number): number => {
  if (n < 0) return NaN
  if (n === 0 || n === 1) return 1
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

/**
 * Calculate double factorial of n
 * n!! = n × (n-2) × (n-4) × ...
 */
export const doubleFactorial = (n: number): number => {
  if (n < 0) return NaN
  if (n === 0 || n === 1) return 1
  let result = 1
  for (let i = n; i > 0; i -= 2) {
    result *= i
  }
  return result
}

/**
 * Calculate permutation P(n, r) = n! / (n-r)!
 */
export const permutation = (n: number, r: number): number => {
  if (n < 0 || r < 0 || r > n) return NaN
  return factorial(n) / factorial(n - r)
}

/**
 * Calculate combination C(n, r) = n! / (r! × (n-r)!)
 */
export const combination = (n: number, r: number): number => {
  if (n < 0 || r < 0 || r > n) return NaN
  return factorial(n) / (factorial(r) * factorial(n - r))
}

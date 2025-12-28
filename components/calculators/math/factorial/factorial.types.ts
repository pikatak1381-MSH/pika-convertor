export type FactorialMode = "factorial" | "doubleFactorial" | "permutation" | "combination"

export interface FactorialCalculator {
  id: FactorialMode
  labelKey: string
  inputs: string[]
  formula: string
}

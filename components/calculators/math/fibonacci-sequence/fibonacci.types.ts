export type FibonacciMode = "sequence" | "nthNumber" | "checkFibonacci"

export interface FibonacciCalculator {
  id: FibonacciMode
  labelKey: string
  inputLabelKey: string
  formula: string
}

export type AverageMode = "mean" | "median" | "mode"

export interface AverageCalculator {
  id: AverageMode
  labelKey: string
  formula: string
}

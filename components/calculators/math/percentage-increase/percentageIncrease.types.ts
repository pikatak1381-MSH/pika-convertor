export type PercentageIncreaseKind = "percentageChange" | "percentageIncrease"

export interface PercentageIncreaseCalculatorDefinition {
  id: PercentageIncreaseKind
  labelKey: string
  inputs: string[]
  calculate: (values: number[]) => number | string
  formula: string
}

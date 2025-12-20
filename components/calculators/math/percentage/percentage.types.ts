export type PercentageKind = "simple" | "change" | "ratio"

export interface PercentageCalculatorDefinition {
  id: string
  labelKey: string
  kind: PercentageKind
  calculate: (input: number[]) => number
}

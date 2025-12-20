export type PercentageKind = "simple" | "change" | "ratio"

export interface PercentageCalculatorDefinition {
  id: PercentageKind
  labelKey: string
  kind: PercentageKind
  calculate: (input: number[]) => number
}

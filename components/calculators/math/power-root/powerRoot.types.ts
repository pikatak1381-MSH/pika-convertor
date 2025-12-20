export type PowerRootKind = "power" | "root"

export interface FormulaCalculatorDefinition {
  id: PowerRootKind
  labelKey: string
  inputs: string[]
  calculate: (values: number[]) => number
  formula: string
}

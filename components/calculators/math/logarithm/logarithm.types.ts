export type LogKind = "natural" | "base10" | "baseN"

export interface LogCalculatorDefinition {
  id: LogKind
  labelKey: string
  inputs: string[]
  calculate: (values: number[]) => number
  formula: string
}

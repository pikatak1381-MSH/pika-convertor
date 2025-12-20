export type EquationType = "linear-one" | "linear-two" | "quadratic" | "cubic"

export interface EquationSolverDefinition {
  id: EquationType
  labelKey: string
  inputs: string[]
  calculate: (values: number[]) => number | number[] | { x: number; y: number }
  formula: string
  description?: string
}

export type EquationType = "polar" | "cartesian" | "implicit" | "parametric"

export interface MathButton {
  id: string
  label: string
  insert: string
  title?: string
}

export interface EquationConfig {
  id: EquationType
  labelKey: string
  inputs: EquationInput[]
  example: string
}

export interface EquationInput {
  id: string
  labelKey: string
  placeholder: string
  variable?: string
}

export interface PlotOptions {
  type: EquationType
  equation: string
  xDomain?: [number, number]
  yDomain?: [number, number]
  // For parametric
  x?: string
  y?: string
  tRange?: [number, number]
  // For polar
  r?: string
  thetaRange?: [number, number]
}

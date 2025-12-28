export type CalculationType = "perimeter" | "area"

export type ShapeId =
  | "square"
  | "rectangle"
  | "triangle"
  | "circle"
  | "trapezoid"
  | "parallelogram"
  | "ellipse"

export interface ShapeInput {
  id: string
  labelKey: string
}

export interface ShapeDefinition {
  id: ShapeId
  labelKey: string
  inputs: ShapeInput[]
  calculatePerimeter: (values: number[]) => number
  calculateArea: (values: number[]) => number
  perimeterFormula: string
  areaFormula: string
}

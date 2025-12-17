import { physicsUnits } from "./physics-units"
import { currentUnits } from "./fluid-units"

export const calculatorRegistry = {
  [physicsUnits.id]: physicsUnits,
  [currentUnits.id]: currentUnits,
} as const

export type CalculatorId = keyof typeof calculatorRegistry

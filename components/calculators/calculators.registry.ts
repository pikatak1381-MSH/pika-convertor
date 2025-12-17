import { physicsUnits } from "./physics-units"
import { fluidsUnits } from "./fluid-units"
import { electricityUnits } from "./electricity-units"

export const calculatorRegistry = {
  [physicsUnits.id]: physicsUnits,
  [fluidsUnits.id]: fluidsUnits,
  [electricityUnits.id]: electricityUnits,
} as const

export type CalculatorId = keyof typeof calculatorRegistry

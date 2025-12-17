import { physicsUnits } from "./physics-units"
import { fluidsUnits } from "./fluid-units"
import { electricityUnits } from "./electricity-units"
import { magnetismUnits } from "./magnetism-units"

export const calculatorRegistry = {
  [physicsUnits.id]: physicsUnits,
  [fluidsUnits.id]: fluidsUnits,
  [electricityUnits.id]: electricityUnits,
  [magnetismUnits.id]: magnetismUnits,
} as const

export type CalculatorId = keyof typeof calculatorRegistry

import { physicsUnits } from "./physics-units"

export const calculatorRegistry = {
    [physicsUnits.id]: physicsUnits,
} as const

export type CalculatorId = keyof typeof calculatorRegistry

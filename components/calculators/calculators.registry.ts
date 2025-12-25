import { physicsUnits } from "./physics/physics-units"
import { fluidsUnits } from "./physics/fluid-units"
import { electricityUnits } from "./physics/electricity-units"
import { magnetismUnits } from "./physics/magnetism-units"
import { opticalUnits } from "./physics/optical-units"
import { thermalUnits } from "./physics/thermal-units"
import { radiologyUnits } from "./physics/radiology-units"
import { percentageCalculators } from "./math/percentage"
import { powerRootCalculators } from "./math/power-root"
import { logCalculators } from "./math/logarithm"
import { equationSolverCalculators } from "./math/equation-solver"
import { baseConverterCalculator } from "./math/base-converter"

export const calculatorRegistry = {
  [physicsUnits.id]: physicsUnits,
  [fluidsUnits.id]: fluidsUnits,
  [electricityUnits.id]: electricityUnits,
  [magnetismUnits.id]: magnetismUnits,
  [opticalUnits.id]: opticalUnits,
  [thermalUnits.id]: thermalUnits,
  [radiologyUnits.id]: radiologyUnits,
  [percentageCalculators.id]: percentageCalculators,
  [powerRootCalculators.id]: powerRootCalculators,
  [logCalculators.id]: logCalculators,
  [equationSolverCalculators.id]: equationSolverCalculators,
  [baseConverterCalculator.id]: baseConverterCalculator,
} as const

export type CalculatorId = keyof typeof calculatorRegistry

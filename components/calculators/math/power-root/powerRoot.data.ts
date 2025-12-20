import { FormulaCalculatorDefinition } from "./powerRoot.types"

export const powerRootCalculators: FormulaCalculatorDefinition[] = [
  {
    id: "power",
    labelKey: "math.powerRoot.power",
    inputs: ["base", "exponent"],
    calculate: ([base, exponent]) => Math.pow(base, exponent),
    formula: "base ^ exponent",
  },
  {
    id: "root",
    labelKey: "math.powerRoot.root",
    inputs: ["radicand", "degree"],
    calculate: ([radicand, degree]) => Math.pow(radicand, 1 / degree),
    formula: "√[degree]{radicand}",
  },
]

import { LogCalculatorDefinition } from "./logarithm.types"

export const logCalculators: LogCalculatorDefinition[] = [
  {
    id: "natural",
    labelKey: "math.log.natural",
    inputs: ["value"],
    calculate: ([value]) => Math.log(value),
    formula: "ln(value)",
  },
  {
    id: "base10",
    labelKey: "math.log.base10",
    inputs: ["value"],
    calculate: ([value]) => Math.log10(value),
    formula: "log10(value)",
  },
  {
    id: "baseN",
    labelKey: "math.log.baseN",
    inputs: ["value", "base"],
    calculate: ([value, base]) => Math.log(value) / Math.log(base),
    formula: "log_base(value)",
  },
]

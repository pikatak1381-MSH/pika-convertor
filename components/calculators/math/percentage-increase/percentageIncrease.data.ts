import { PercentageIncreaseCalculatorDefinition } from "./percentageIncrease.types"

export const percentageIncreaseCalculators: PercentageIncreaseCalculatorDefinition[] = [
  {
    id: "percentageChange",
    labelKey: "math.percentageIncrease.percentageChange",
    inputs: ["oldValue", "newValue"],
    calculate: ([oldValue, newValue]) => {
      if (oldValue === 0) return "undefined"
      return ((newValue - oldValue) / Math.abs(oldValue)) * 100
    },
    formula: "\\text{Percentage Change} = \\frac{\\text{New Value} - \\text{Old Value}}{|\\text{Old Value}|} \\times 100\\%",
  },
  {
    id: "percentageIncrease",
    labelKey: "math.percentageIncrease.percentageIncrease",
    inputs: ["initialValue", "percentage"],
    calculate: ([initialValue, percentage]) => {
      return initialValue * (1 + percentage / 100)
    },
    formula: "\\text{Final Value} = \\text{Initial Value} \\times (1 + \\frac{\\text{Percentage}}{100})",
  },
]

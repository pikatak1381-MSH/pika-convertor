import { ConverterDefinition, FractionResult } from "./fractionsToDecimals.types"

// Greatest Common Divisor using Euclidean algorithm
const gcd = (a: number, b: number): number => {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    const t = b
    b = a % b
    a = t
  }
  return a
}

// Convert fraction to decimal
export const fractionToDecimal = (numerator: number, denominator: number): number | string => {
  if (denominator === 0) return "divisionByZero"
  return numerator / denominator
}

// Convert decimal to fraction
export const decimalToFraction = (decimal: number): FractionResult => {
  if (!isFinite(decimal)) {
    return { numerator: 0, denominator: 1, display: "Invalid" }
  }

  // Handle negative numbers
  const sign = decimal < 0 ? -1 : 1
  decimal = Math.abs(decimal)

  // Handle whole numbers
  if (Number.isInteger(decimal)) {
    return {
      numerator: sign * decimal,
      denominator: 1,
      display: String(sign * decimal) + "/1",
    }
  }

  // Convert decimal to fraction
  const decimalStr = decimal.toString()
  const decimalPlaces = decimalStr.includes(".")
    ? decimalStr.split(".")[1].length
    : 0

  const denominator = Math.pow(10, Math.min(decimalPlaces, 9))
  let numerator = Math.round(decimal * denominator)

  // Simplify the fraction
  const divisor = gcd(numerator, denominator)
  numerator = (sign * numerator) / divisor
  const simplifiedDenominator = denominator / divisor

  return {
    numerator,
    denominator: simplifiedDenominator,
    display: String(numerator) + "/" + String(simplifiedDenominator),
  }
}

export const converters: ConverterDefinition[] = [
  {
    id: "fractionToDecimal",
    labelKey: "math.fractionConverter.fractionToDecimal",
    inputs: ["numerator", "denominator"],
    formula: "\\text{Decimal} = \\frac{\\text{Numerator}}{\\text{Denominator}}",
  },
  {
    id: "decimalToFraction",
    labelKey: "math.fractionConverter.decimalToFraction",
    inputs: ["decimal"],
    formula: "\\text{Fraction} = \\frac{a}{b} \\text{ where } \\gcd(a, b) = 1",
  },
]

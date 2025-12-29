export type ConversionMode = "fractionToDecimal" | "decimalToFraction"

export interface FractionResult {
  numerator: number
  denominator: number
  display: string
}

export interface ConverterDefinition {
  id: ConversionMode
  labelKey: string
  inputs: string[]
  formula: string
}

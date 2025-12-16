export type ConvertorKind = "linear" | "affine" | "custom"

export interface UnitDefinition {
    id: string
    labelKey: string
    factor?: number
    offset?: number
}

export interface CalculatorDefinition {
    id: string
    labelKey: string
    kind: ConvertorKind
    baseUnit: string
    units: UnitDefinition[]
    convert?: (value: number, from: string, to: string) => number
}
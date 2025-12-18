import { CalculatorDefinition } from "@/components/calculators/physics/physics-units/physics.types"

export const convertValue = (
  value: number,
  fromUnitId: string,
  toUnitId: string,
  converter: CalculatorDefinition
) => {
  if (fromUnitId === toUnitId) return value

  if (converter.kind === "custom") {
    return converter.convert!(value, fromUnitId, toUnitId)
  }

  const from = converter.units.find((u) => u.id === fromUnitId)!
  const to = converter.units.find((u) => u.id === toUnitId)!

  if (converter.kind === "linear") {
    const baseValue = value * from.factor!
    return baseValue / to.factor!
  }

  // affine (e.g: temperature)
  const baseValue = (value + from.offset!) * from.factor!
  return baseValue / to.factor! - to.offset!
}

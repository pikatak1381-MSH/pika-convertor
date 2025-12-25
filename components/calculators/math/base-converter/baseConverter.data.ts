import { BaseOption, BaseSystem } from "./baseConverter.types"

/**
 * Runtime guard to ensure a number is a valid base system
 */
export const isValidBase = (base: number): base is BaseSystem => {
  return Number.isInteger(base) && base >= 2 && base <= 36
}

/**
 * Generating base options for dropdowns (2 → 36)
 */
export const baseOptions: BaseOption[] = Array.from({ length: 35 }, (_, index) => {
  const base = (index + 2) as BaseSystem

  return {
    id: `base-${base}`,
    value: base,
    labelKey: `math.baseConverter.base${base}`,
  }
})

/**
 * Validateing if the input string is valid for the given base
 * Uses native JS parsing to support bases up to 36
 */
export const isValidInput = (value: string, base: BaseSystem): boolean => {
  if (!value || value.trim() === "") return true

  const parsed = parseInt(value.trim(), base)
  return !Number.isNaN(parsed)
}

/**
 * Converts a number from one base to another
 */
export const convertBase = (value: string, fromBase: BaseSystem, toBase: BaseSystem): string => {
  if (!value || value.trim() === "") return ""

  if (!isValidInput(value, fromBase)) return ""

  const decimal = parseInt(value.trim(), fromBase)

  if (Number.isNaN(decimal) || decimal < 0) return ""

  return decimal.toString(toBase).toUpperCase()
}

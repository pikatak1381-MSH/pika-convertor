import { AngleUnit, TrigResult } from "./trigonometry.types"

export const degToRad = (deg: number): number => (deg * Math.PI) / 180
export const radToDeg = (rad: number): number => (rad * 180) / Math.PI

export const calculateTrig = (value: number, unit: AngleUnit): TrigResult => {
  const angleInRad = unit === "degree" ? degToRad(value) : value

  // Basic trig functions
  const sinVal = Math.sin(angleInRad)
  const cosVal = Math.cos(angleInRad)
  const tanVal = Math.tan(angleInRad)
  const cotVal = 1 / tanVal

  // Inverse trig functions (input is the sine/cosine value, not the angle)
  // arcsin and arccos only valid for inputs in [-1, 1]
  const arcsinVal = Math.abs(sinVal) <= 1 ? Math.asin(sinVal) : NaN
  const arccosVal = Math.abs(cosVal) <= 1 ? Math.acos(cosVal) : NaN
  const arctanVal = Math.atan(tanVal)
  const arccotVal = Math.atan(1 / tanVal)

  // Format helper
  const format = (n: number): number | string => {
    if (!isFinite(n) || isNaN(n)) return "undefined"
    return Number(n.toFixed(10))
  }

  return {
    sin: format(sinVal),
    cos: format(cosVal),
    tan: format(tanVal),
    cot: format(cotVal),
    arcsin: format(arcsinVal),
    arccos: format(arccosVal),
    arctan: format(arctanVal),
    arccot: format(arccotVal),
    conversion: unit === "degree" 
      ? format(degToRad(value)) 
      : format(radToDeg(value)),
  }
}

export const trigFormula = `
\\begin{aligned}
\\sin(\\theta) &= \\frac{\\text{opposite}}{\\text{hypotenuse}} \\\\
\\cos(\\theta) &= \\frac{\\text{adjacent}}{\\text{hypotenuse}} \\\\
\\tan(\\theta) &= \\frac{\\sin(\\theta)}{\\cos(\\theta)} \\\\
\\cot(\\theta) &= \\frac{1}{\\tan(\\theta)}
\\end{aligned}
`

import { EquationSolverDefinition } from "./equationSolver.types"

export const equationSolvers: EquationSolverDefinition[] = [
  {
    id: "linear-one",
    labelKey: "math.equationSolver.linearOne",
    inputs: ["a", "b", "c"],
    calculate: ([a, b, c]) => (c - b) / a,
    formula: "ax + b = c → x = (c - b)/a",
  },

  {
    id: "linear-two",
    labelKey: "math.equationSolver.linearTwo",
    inputs: ["a1", "b1", "c1", "a2", "b2", "c2"],
    calculate: ([a1, b1, c1, a2, b2, c2]) => {
      const det = a1 * b2 - a2 * b1
      if (det === 0) return { x: NaN, y: NaN }
      const x = (c1 * b2 - c2 * b1) / det
      const y = (a1 * c2 - a2 * c1) / det
      return { x, y }
    },
    formula: "a₁x + b₁y = c₁\na₂x + b₂y = c₂",
  },

  {
    id: "quadratic",
    labelKey: "math.equationSolver.quadratic",
    inputs: ["a", "b", "c"],
    calculate: ([a, b, c]) => {
      const discriminant = b * b - 4 * a * c
      if (discriminant < 0) return [NaN, NaN]
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a)
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a)
      return [x1, x2]
    },
    formula: "ax² + bx + c = 0",
  },

  {
    id: "cubic",
    labelKey: "math.equationSolver.cubic",
    inputs: ["a", "b", "c", "d"],
    calculate: ([a, b, c, d]) => {
      // Normalize to form: x³ + px + q = 0
      const p = (3 * a * c - b * b) / (3 * a * a)
      const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a)

      const discriminant = (q * q) / 4 + (p * p * p) / 27

      if (discriminant > 0) {
        // One real root, two complex conjugates
        const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant))
        const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant))
        const x1 = u + v - b / (3 * a)
        return [x1, NaN, NaN]
      } else if (discriminant === 0) {
        // Multiple real roots
        const u = Math.cbrt(-q / 2)
        const x1 = 2 * u - b / (3 * a)
        const x2 = -u - b / (3 * a)
        return [x1, x2, x2]
      } else {
        // Three distinct real roots
        const r = Math.sqrt(-(p * p * p) / 27)
        const theta = Math.acos(-q / (2 * r))
        const rCbrt = Math.cbrt(r)

        const x1 = 2 * rCbrt * Math.cos(theta / 3) - b / (3 * a)
        const x2 = 2 * rCbrt * Math.cos((theta + 2 * Math.PI) / 3) - b / (3 * a)
        const x3 = 2 * rCbrt * Math.cos((theta + 4 * Math.PI) / 3) - b / (3 * a)
        return [x1, x2, x3]
      }
    },
    formula: "ax³ + bx² + cx + d = 0",
  },
]

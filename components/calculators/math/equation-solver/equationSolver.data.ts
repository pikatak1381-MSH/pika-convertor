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
]

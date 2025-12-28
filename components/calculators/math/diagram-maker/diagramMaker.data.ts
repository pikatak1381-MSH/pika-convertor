import { MathButton, EquationConfig } from "./diagramMaker.types"

export const mathButtons: MathButton[] = [
  // Trigonometric
  { id: "tan", label: "tan", insert: "tan(", title: "Tangent" },
  { id: "atan", label: "atan", insert: "atan(", title: "Arctangent" },
  { id: "tanh", label: "tanh", insert: "tanh(", title: "Hyperbolic tangent" },
  { id: "sin", label: "sin", insert: "sin(", title: "Sine" },
  { id: "asin", label: "asin", insert: "asin(", title: "Arcsine" },
  { id: "sinh", label: "sinh", insert: "sinh(", title: "Hyperbolic sine" },
  { id: "cos", label: "cos", insert: "cos(", title: "Cosine" },
  { id: "acos", label: "acos", insert: "acos(", title: "Arccosine" },
  { id: "cosh", label: "cosh", insert: "cosh(", title: "Hyperbolic cosine" },
  // Constants
  { id: "pi", label: "π", insert: "PI", title: "Pi (3.14159...)" },
  { id: "theta", label: "θ", insert: "theta", title: "Theta" },
  { id: "phi", label: "φ", insert: "PHI", title: "Golden ratio (1.618...)" },
  // Operations
  { id: "cbrt", label: "∛", insert: "nthRoot(", title: "Cube root" },
  { id: "floor", label: "[x]", insert: "floor(", title: "Floor function" },
  { id: "lparen", label: "(", insert: "(", title: "Left parenthesis" },
  { id: "rparen", label: ")", insert: ")", title: "Right parenthesis" },
  { id: "e", label: "e", insert: "E", title: "Euler's number (2.718...)" },
  { id: "sqrt", label: "√", insert: "sqrt(", title: "Square root" },
  { id: "ln", label: "ln", insert: "log(", title: "Natural logarithm" },
  { id: "pow", label: "xʸ", insert: "^", title: "Power" },
  { id: "abs", label: "|x|", insert: "abs(", title: "Absolute value" },
]

export const equationConfigs: EquationConfig[] = [
  {
    id: "cartesian",
    labelKey: "math.diagramMaker.cartesian",
    inputs: [
      {
        id: "equation",
        labelKey: "math.diagramMaker.inputs.equation",
        placeholder: "x^2",
        variable: "y = f(x)",
      },
    ],
    example: "x^2, sin(x), 2*x + 1",
  },
  {
    id: "polar",
    labelKey: "math.diagramMaker.polar",
    inputs: [
      {
        id: "equation",
        labelKey: "math.diagramMaker.inputs.rEquation",
        placeholder: "2 * sin(4 * theta)",
        variable: "r = f(θ)",
      },
    ],
    example: "2 * sin(4 * theta), 1 + cos(theta)",
  },
  {
    id: "implicit",
    labelKey: "math.diagramMaker.implicit",
    inputs: [
      {
        id: "equation",
        labelKey: "math.diagramMaker.inputs.implicitEquation",
        placeholder: "x^2 + y^2 - 1",
        variable: "f(x, y) = 0",
      },
    ],
    example: "x^2 + y^2 - 1 (circle), x^2 - y^2 - 1",
  },
  {
    id: "parametric",
    labelKey: "math.diagramMaker.parametric",
    inputs: [
      {
        id: "x",
        labelKey: "math.diagramMaker.inputs.xEquation",
        placeholder: "cos(t)",
        variable: "x(t)",
      },
      {
        id: "y",
        labelKey: "math.diagramMaker.inputs.yEquation",
        placeholder: "sin(t)",
        variable: "y(t)",
      },
    ],
    example: "x = cos(t), y = sin(t) (circle)",
  },
]

// Default domain ranges
export const defaultDomains = {
  x: [-10, 10] as [number, number],
  y: [-10, 10] as [number, number],
  t: [0, 2 * Math.PI] as [number, number],
  theta: [0, 2 * Math.PI] as [number, number],
}

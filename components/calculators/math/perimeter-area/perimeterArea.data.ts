import { ShapeDefinition, CalculationType } from "./perimeterArea.types"

export const calculationTypes: { id: CalculationType; labelKey: string }[] = [
  { id: "perimeter", labelKey: "math.perimeterArea.perimeter" },
  { id: "area", labelKey: "math.perimeterArea.area" },
]

export const shapes: ShapeDefinition[] = [
  {
    id: "square",
    labelKey: "math.perimeterArea.shapes.square",
    inputs: [{ id: "side", labelKey: "math.perimeterArea.inputs.side" }],
    calculatePerimeter: ([side]) => 4 * side,
    calculateArea: ([side]) => side * side,
    perimeterFormula: "P = 4a",
    areaFormula: "A = a^2",
  },
  {
    id: "rectangle",
    labelKey: "math.perimeterArea.shapes.rectangle",
    inputs: [
      { id: "length", labelKey: "math.perimeterArea.inputs.length" },
      { id: "width", labelKey: "math.perimeterArea.inputs.width" },
    ],
    calculatePerimeter: ([length, width]) => 2 * (length + width),
    calculateArea: ([length, width]) => length * width,
    perimeterFormula: "P = 2(l + w)",
    areaFormula: "A = l \\times w",
  },
  {
    id: "triangle",
    labelKey: "math.perimeterArea.shapes.triangle",
    inputs: [
      { id: "sideA", labelKey: "math.perimeterArea.inputs.sideA" },
      { id: "sideB", labelKey: "math.perimeterArea.inputs.sideB" },
      { id: "sideC", labelKey: "math.perimeterArea.inputs.sideC" },
      { id: "height", labelKey: "math.perimeterArea.inputs.height" },
    ],
    calculatePerimeter: ([a, b, c]) => a + b + c,
    calculateArea: ([a, , , h]) => (a * h) / 2, // base (sideA) * height / 2
    perimeterFormula: "P = a + b + c",
    areaFormula: "A = \\frac{1}{2} \\times base \\times h",
  },
  {
    id: "circle",
    labelKey: "math.perimeterArea.shapes.circle",
    inputs: [{ id: "radius", labelKey: "math.perimeterArea.inputs.radius" }],
    calculatePerimeter: ([radius]) => 2 * Math.PI * radius,
    calculateArea: ([radius]) => Math.PI * radius * radius,
    perimeterFormula: "C = 2\\pi r",
    areaFormula: "A = \\pi r^2",
  },
  {
    id: "trapezoid",
    labelKey: "math.perimeterArea.shapes.trapezoid",
    inputs: [
      { id: "baseA", labelKey: "math.perimeterArea.inputs.baseA" },
      { id: "baseB", labelKey: "math.perimeterArea.inputs.baseB" },
      { id: "sideA", labelKey: "math.perimeterArea.inputs.sideA" },
      { id: "sideB", labelKey: "math.perimeterArea.inputs.sideB" },
      { id: "height", labelKey: "math.perimeterArea.inputs.height" },
    ],
    calculatePerimeter: ([a, b, c, d]) => a + b + c + d,
    calculateArea: ([a, b, , , h]) => ((a + b) * h) / 2,
    perimeterFormula: "P = a + b + c + d",
    areaFormula: "A = \\frac{1}{2}(a + b) \\times h",
  },
  {
    id: "parallelogram",
    labelKey: "math.perimeterArea.shapes.parallelogram",
    inputs: [
      { id: "base", labelKey: "math.perimeterArea.inputs.base" },
      { id: "side", labelKey: "math.perimeterArea.inputs.side" },
      { id: "height", labelKey: "math.perimeterArea.inputs.height" },
    ],
    calculatePerimeter: ([base, side]) => 2 * (base + side),
    calculateArea: ([base, , height]) => base * height,
    perimeterFormula: "P = 2(a + b)",
    areaFormula: "A = base \\times h",
  },
  {
    id: "ellipse",
    labelKey: "math.perimeterArea.shapes.ellipse",
    inputs: [
      { id: "semiMajor", labelKey: "math.perimeterArea.inputs.semiMajor" },
      { id: "semiMinor", labelKey: "math.perimeterArea.inputs.semiMinor" },
    ],
    // Ramanujan's approximation for ellipse perimeter
    calculatePerimeter: ([a, b]) => {
      const h = Math.pow(a - b, 2) / Math.pow(a + b, 2)
      return Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)))
    },
    calculateArea: ([a, b]) => Math.PI * a * b,
    perimeterFormula: "C \\approx \\pi(a+b)\\left(1 + \\frac{3h}{10+\\sqrt{4-3h}}\\right)",
    areaFormula: "A = \\pi a b",
  },
]

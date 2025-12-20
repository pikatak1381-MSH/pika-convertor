export const percentageCalculators = [
  {
    id: "simple",
    labelKey: "math.percentage.simple",
    inputs: ["value", "percent"],
    calculate: ([p, v]: number[]) => (p / 100) * v,
    formula: "p% × value",
  },
  {
    id: "change",
    labelKey: "math.percentage.change",
    inputs: ["new", "old"],
    calculate: ([oldV, newV]: number[]) => (oldV === 0 ? 0 : ((newV - oldV) / oldV) * 100),
    formula: "(new − old) ÷ old × 100",
  },
  {
    id: "ratio",
    labelKey: "math.percentage.ratio",
    inputs: ["whole", "part"],
    calculate: ([p, w]: number[]) => (w === 0 ? 0 : (p / w) * 100),
    formula: "part ÷ whole × 100",
  },
] as const

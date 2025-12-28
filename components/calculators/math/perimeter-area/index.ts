import dynamic from "next/dynamic"

export const perimeterAreaCalculator = {
  id: "perimeter-area",
  component: dynamic(() => import("./PerimeterAreaCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.perimeterAreaCalculator",
  seo: {
    titleKey: "seo.perimeterAreaCalculator.title",
    descriptionKey: "seo.perimeterAreaCalculator.description",
  },
}

import dynamic from "next/dynamic"

export const averageCalculator = {
  id: "average",
  component: dynamic(() => import("./AverageCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.averageCalculator",
  seo: {
    titleKey: "seo.averageCalculator.title",
    descriptionKey: "seo.averageCalculator.description",
  },
}

import dynamic from "next/dynamic"

export const percentageCalculators = {
  id: "percentage",
  component: dynamic(() => import("./PercentageCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.percentageCalculators",
  seo: {
    titleKey: "seo.percentageCalculators.title",
    descriptionKey: "seo.percentageCalculators.description",
  },
}

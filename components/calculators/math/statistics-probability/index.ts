import dynamic from "next/dynamic"

export const statsAndProbCalculator = {
  id: "statistics",
  component: dynamic(() => import("./StatisticsCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.statsAndProbCalculator",
  seo: {
    titleKey: "seo.statsAndProbCalculator.title",
    descriptionKey: "seo.statsAndProbCalculator.description",
  },
}

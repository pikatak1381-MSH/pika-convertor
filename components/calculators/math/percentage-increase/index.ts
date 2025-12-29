import dynamic from "next/dynamic"

export const percentageIncreaseCalculator = {
  id: "percentage-increase",
  component: dynamic(() => import("./PercentageIncreaseCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.percentageIncreaseCalculator",
  seo: {
    titleKey: "seo.percentageIncreaseCalculator.title",
    descriptionKey: "seo.percentageIncreaseCalculator.description",
  },
}

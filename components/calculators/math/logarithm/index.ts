import dynamic from "next/dynamic"

export const logCalculators = {
  id: "log",
  component: dynamic(() => import("./LogarithmCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.logCalculators",
  seo: {
    titleKey: "seo.logCalculators.title",
    descriptionKey: "seo.logCalculators.description",
  },
}

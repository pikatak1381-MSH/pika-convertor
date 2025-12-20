import dynamic from "next/dynamic"

export const powerRootCalculators = {
  id: "power-root",
  component: dynamic(() => import("./PowerRootCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.powerRootCalculators",
  seo: {
    titleKey: "seo.powerRootCalculators.title",
    descriptionKey: "seo.powerRootCalculators.description",
  },
}

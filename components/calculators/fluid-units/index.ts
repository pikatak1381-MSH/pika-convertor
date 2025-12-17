import dynamic from "next/dynamic"

export const currentUnits = {
  id: "currents",
  component: dynamic(() => import("./FluidsCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.physicsUnits",
  seo: {
    titleKey: "seo.physicsUnits.title",
    descriptionKey: "seo.physicsUnits.description",
  },
}

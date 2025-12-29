import dynamic from "next/dynamic"

export const electricityUnits = {
  id: "electricity-units",
  component: dynamic(() => import("./ElectricityCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.electricityUnits",
  seo: {
    titleKey: "seo.electricityUnits.title",
    descriptionKey: "seo.electricityUnits.description",
  },
}

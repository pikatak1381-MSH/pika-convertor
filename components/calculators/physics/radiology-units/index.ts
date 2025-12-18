import dynamic from "next/dynamic"

export const radiologyUnits = {
  id: "radiology-units",
  component: dynamic(() => import("./RadiologyCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.radiologyUnits",
  seo: {
    titleKey: "seo.radiologyUnits.title",
    descriptionKey: "seo.radiologyUnits.description",
  },
}

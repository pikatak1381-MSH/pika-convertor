import dynamic from "next/dynamic"

export const thermalUnits = {
  id: "thermal-units",
  component: dynamic(() => import("./ThermalCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.thermalUnits",
  seo: {
    titleKey: "seo.thermalUnits.title",
    descriptionKey: "seo.thermalUnits.description",
  },
}

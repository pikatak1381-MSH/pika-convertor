import dynamic from "next/dynamic"

export const opticalUnits = {
  id: "optical-units",
  component: dynamic(() => import("./OpticalCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.opticalUnits",
  seo: {
    titleKey: "seo.opticalUnits.title",
    descriptionKey: "seo.opticalUnits.description",
  },
}

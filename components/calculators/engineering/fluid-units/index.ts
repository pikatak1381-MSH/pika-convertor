import dynamic from "next/dynamic"

export const fluidsUnits = {
  id: "fluids-units",
  component: dynamic(() => import("./FluidsCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.fluidsUnits",
  seo: {
    titleKey: "seo.fluidsUnits.title",
    descriptionKey: "seo.fluidsUnits.description",
  },
}

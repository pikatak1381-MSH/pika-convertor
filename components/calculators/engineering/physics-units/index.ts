import dynamic from "next/dynamic"

export const physicsUnits = {
  id: "physics-units",
  component: dynamic(() => import("./PhyisicsUnitCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.physicsUnits",
  seo: {
    titleKey: "seo.physicsUnits.title",
    descriptionKey: "seo.physicsUnits.description",
  },
}

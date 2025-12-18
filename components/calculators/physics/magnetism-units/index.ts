import dynamic from "next/dynamic"

export const magnetismUnits = {
  id: "magnetism-units",
  component: dynamic(() => import("./MagnetismCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.magnetismUnits",
  seo: {
    titleKey: "seo.magnetismUnits.title",
    descriptionKey: "seo.magnetismUnits.description",
  },
}

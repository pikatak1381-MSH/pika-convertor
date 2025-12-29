import dynamic from "next/dynamic"

export const fractionsToDecimalsCalculator = {
  id: "decimal-to-fraction",
  component: dynamic(() => import("./FractionsToDecimals"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.fractionConverter",
  seo: {
    titleKey: "seo.fractionConverter.title",
    descriptionKey: "seo.fractionConverter.description",
  },
}

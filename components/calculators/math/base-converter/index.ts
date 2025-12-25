import dynamic from "next/dynamic"

export const baseConverterCalculator = {
  id: "base-converter",
  component: dynamic(() => import("./BaseConverterCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.baseConverterCalculator",
  seo: {
    titleKey: "seo.baseConverterCalculator.title",
    descriptionKey: "seo.baseConverterCalculator.description",
  },
}

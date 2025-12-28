import dynamic from "next/dynamic"

export const factorialCalculator = {
  id: "factorial",
  component: dynamic(() => import("./FactorialCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.factorialCalculator",
  seo: {
    titleKey: "seo.factorial.title",
    descriptionKey: "seo.factorialCalculator.description",
  },
}

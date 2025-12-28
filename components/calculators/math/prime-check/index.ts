import dynamic from "next/dynamic"

export const primeCheckCalculator = {
  id: "prime-check",
  component: dynamic(() => import("./PrimeCheckCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.primeCheckCalculator",
  seo: {
    titleKey: "seo.primeCheckCalculator.title",
    descriptionKey: "seo.primeCheckCalculator.description",
  },
}

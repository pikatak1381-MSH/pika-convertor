import dynamic from "next/dynamic"

export const fibonacciCalculator = {
  id: "fibonacci",
  component: dynamic(() => import("./FibonacciCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.fibonacciCalculator",
  seo: {
    titleKey: "seo.fibonacciCalculator.title",
    descriptionKey: "seo.fibonacciCalculator.description",
  },
}

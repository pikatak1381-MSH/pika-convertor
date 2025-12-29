import dynamic from "next/dynamic"

export const trigonometryCalculator = {
  id: "trigonometry",
  component: dynamic(() => import("./TrigonometryCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.trigonometryCalculator",
  seo: {
    titleKey: "seo.trigonometryCalculator.title",
    descriptionKey: "seo.trigonometryCalculator.description",
  },
}

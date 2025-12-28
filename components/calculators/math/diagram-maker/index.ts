import dynamic from "next/dynamic"

export const diagramMakerCalculator = {
  id: "diagram-maker",
  component: dynamic(() => import("./DiagramMakerCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.diagramMakerCalculator",
  seo: {
    titleKey: "seo.diagramMakerCalculator.title",
    descriptionKey: "seo.diagramMakerCalculator.description",
  },
}

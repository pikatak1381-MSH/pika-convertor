import dynamic from "next/dynamic"

export const equationSolverCalculators = {
  id: "equation-solver",
  component: dynamic(() => import("./EquationSolverCalculator"), {
    loading: () => "Loading calculator",
  }),
  formulaKey: "formulas.equationSolverCalculators",
  seo: {
    titleKey: "seo.equationSolverCalculators.title",
    descriptionKey: "seo.equationSolverCalculators.description",
  },
}

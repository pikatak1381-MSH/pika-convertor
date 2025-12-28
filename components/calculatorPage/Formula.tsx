import { useTranslations } from "next-intl"

interface FormulaProps {
  formula: string
}

const Formula: React.FC<FormulaProps> = ({ formula }) => {
  const t = useTranslations("CategoriesSection")

  return (
    <div className="bg-results-background border-secondary-foreground mt-3 flex items-center justify-center gap-4 rounded-full border px-2 py-4">
      <p>{t("formula")}:</p>
      <pre className="truncate">{formula}</pre>
    </div>
  )
}

export default Formula

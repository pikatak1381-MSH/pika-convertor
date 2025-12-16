import { useTranslations } from "next-intl"

interface FormulaProps {
    formula: string
}

const Formula: React.FC<FormulaProps> = ({ formula }) => {
    const t = useTranslations("CategoriesSection")

    return (
      <div className="bg-results-background rounded-full border border-secondary-foreground py-4 mt-3">
        <p>
            {t("formula")}: {formula}
        </p>
      </div>
  )
}

export default Formula
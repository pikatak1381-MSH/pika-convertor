import { categories } from "../../_data/categories"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import CalculatorShell from "@/components/calculatorPage/CalculatorShell"
import { CalculatorId, calculatorRegistry } from "@/components/calculators/calculators.registry"
import CalculatorHeader from "@/components/calculatorPage/CalculatorHeader"
import { BreadCrumb } from "@/components/BreadCrumbs"

interface CalculatorProps {
  params: Promise<{
    locale: string
    calculator: string
    category: string
  }>
}

/* export async function generateMetaData({ params }: CalculatorProps) {
    const { calculator } = await params
    const t  = await getTranslations("Seo")

    const def = calculatorRegistry[calculator as CalculatorId]
    if (!def) return {}

    return {
        title: t(def.seo.titleKey),
        desciption: t(def.seo.descriptionKey),
    }
} */

const Calculator = async ({ params }: CalculatorProps) => {
  const { category, calculator, locale } = await params
  const t = await getTranslations("CategoriesSection")

  if (!(calculator in calculatorRegistry)) {
    return notFound()
  }

  const categoryData = categories.find((c) => c.id === category)
  if (!categoryData) return notFound()

  const subCategory = categoryData.subCategories.find((sub) => sub.id === calculator)
  if (!subCategory) return notFound()

  const calculatorDef = calculatorRegistry[calculator as CalculatorId]
  if (!calculatorDef) return notFound()

  const CalculatorComponent = calculatorDef.component

  return (
    <div className="mt-6">
      <BreadCrumb
        locale={locale}
        category={category}
        calculator={calculator}
        categoryLabel={t(categoryData.i18nKey)}
        calculatorLabel={t(subCategory.i18nKey)}
      />
      <section className="mx-auto mt-17.5 text-center">
        {/* Title */}
        <CalculatorHeader
          categoryTitle={t(categoryData.i18nKey)}
          categoryIcon={categoryData.icon}
          subCategoryTitle={t(subCategory.i18nKey)}
          subCategoryDesription={t(subCategory.descriptionKey)}
        />

        {/* Calculator */}
        <CalculatorShell title={t(subCategory.i18nKey)}>
          <CalculatorComponent />
        </CalculatorShell>
      </section>
    </div>
  )
}

export default Calculator

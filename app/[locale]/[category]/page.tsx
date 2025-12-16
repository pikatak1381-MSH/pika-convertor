import CategoryHeroSection from "@/components/categoryPage/CategoryHeroSection"
import { categories } from "../_data/categories"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import CategoryGrid from "@/components/categoryPage/CategoryGrid"

interface CategoryPageProps  {
  params: Promise<{
    category: string
  }>
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category: categoryParam } = await params
  const t = await getTranslations("CategoriesSection")

  const category = categories.find(c => c.id === categoryParam)
  if (!category) return notFound()

  return (
      <>
        <CategoryHeroSection
          categoryTitle={t(category.i18nKey)}
          categoryDescription={t(category.descriptionKey)}
          categoryIcon={category.icon}
          categoryItemsLength={category.subCategories.length}
        />

        <CategoryGrid 
          subCategories={category.subCategories}
          categoryId={category.id}
        />
      </>
  )
}

export default CategoryPage

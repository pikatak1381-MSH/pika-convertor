import { categories } from "../_data/categories"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

type CategoryPageProps = {
  params: Promise<{
    category: string
  }>
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category: categoryParam } = await params
  console.log(params)

  const t = await getTranslations("CategoriesSection")

  const category = categories.find(c => c.id === categoryParam)
  console.log(category)
  if (!category) return notFound()

  return (
    <main className="relative mx-auto w-full max-w-7xl px-4 pt-27.5 sm:px-6 lg:px-8">
      <section>
        <h1>{t(category.i18nKey)}</h1>
        <p className="text-black">Hello World Test</p>
      </section>
    </main>
  )
}

export default CategoryPage

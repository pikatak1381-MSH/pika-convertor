import { useTranslations } from "next-intl"
import { categories } from "@/app/[locale]/_data/categories"
import CategoryCard from "./CategoryCard"

const CategoriesSection = () => {
  const t = useTranslations("CategoriesSection")
  return (
    <section className="container mx-auto mt-13">
      <h2 className="text-center text-2xl font-bold mb-3">{t("title")}</h2>

      <div className="grid grid-cols-4 gap-5">
        {categories.map((cat) => (
            <CategoryCard
                key={cat.id}
                subCount={cat.subCategories.length}
                category={cat}
            />
        ))}
      </div>
    </section>
  )
}

export default CategoriesSection

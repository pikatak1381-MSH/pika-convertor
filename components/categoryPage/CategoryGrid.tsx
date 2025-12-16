import type { SubCategory } from "@/app/[locale]/_data/categories"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import Image from "next/image"

interface CategoryGridProps {
  subCategories: SubCategory[]
  categoryId: string
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ subCategories, categoryId }) => {
  const t = useTranslations("CategoriesSection")

  return (
    <section className="container mx-auto mt-13">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {subCategories.map((cat) => (
          <Link
            key={cat.id}
            className="rounded-[20px] border bg-white p-5 transition-shadow hover:shadow-md"
            href={{
              pathname: "/[category]/[calculator]",
              params: {
                calculator: cat.id,
                category: categoryId,
              },
            }}
          >
            <div className="flex items-center gap-1">
              <div className="bg-primary h-6 w-6 overflow-hidden rounded">
                <Image
                  src={cat.icon}
                  alt={cat.i18nKey}
                  width={24}
                  height={24}
                  className="size-full object-contain"
                />
              </div>
              <h2 className="font-bold">{t(cat.i18nKey)}</h2>
            </div>
            <p className="mt-3 text-sm">{t(cat.descriptionKey)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryGrid

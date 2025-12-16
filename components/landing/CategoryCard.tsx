import type { Category } from "@/app/[locale]/_data/categories"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/navigation"

interface CategoryCardProps {
  category: Category
  subCount?: number
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const t = useTranslations("CategoriesSection")

  return (
    <div className="flex aspect-285/338 h-auto w-full flex-col overflow-hidden rounded-[20px] border bg-white px-5 pt-5 pb-4 shadow-sm">
      {/* Title */}
      <div className="mb-2 flex items-center gap-2">
        <div className="bg-primary overflow-hidden rounded p-1">
          <Image
            src={category.icon}
            alt={category.i18nKey}
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
        </div>
        <h3 className="text-base font-semibold">{t(category.i18nKey)}</h3>
      </div>

      {/* Convertor list */}
      <ul className="flex flex-1 flex-col gap-2">
        {category.subCategories.slice(0, 5).map((cat) => (
          <li key={cat.id}>
            <Link
              href="/"
              className="hover:border-border flex items-center gap-1 rounded-[20px] border border-transparent p-2 text-sm font-semibold transition-shadow duration-300 hover:shadow-md"
            >
              <div className="h-4.5 w-4.5 overflow-hidden rounded">
                <Image
                  src={cat.icon}
                  alt={cat.i18nKey}
                  width={18}
                  height={18}
                  className="size-full object-contain"
                />
              </div>
              <span className="text-pretty">{t(cat.i18nKey)}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* More Info Button */}
      <Link
        className="text-secondary-foreground hover:bg-hover hover:text-hover-secondary self-end rounded-[20px] px-2 py-1 text-sm font-semibold transition-colors"
        href={{
          pathname: "/[category]",
          params: { category: category.id },
        }}
      >
        {t("seeMoreBtn")}
      </Link>
    </div>
  )
}

export default CategoryCard

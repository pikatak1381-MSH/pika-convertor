import Image from "next/image"
import { useTranslations } from "next-intl"

type CategoryHeroSectionProps = {
    categoryIcon: string
    categoryTitle: string
    categoryDescription: string
    categoryItemsLength: number
}

const CategoryHeroSection: React.FC<CategoryHeroSectionProps> = ({ categoryTitle, categoryIcon, categoryDescription, categoryItemsLength }) => {
  const t = useTranslations("CategoriesSection")

  return (
      <section className="container mx-auto text-center mt-12">
        <div className="flex items-center justify-center gap-2">
          <div
            className="bg-primary w-9 h-9 rounded p-1"
          >
            <Image
              src={categoryIcon}
              alt={categoryTitle}
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-secondary-foreground">{categoryTitle}</h1>
        </div>
        <p 
          className="w-full max-w-[796px] mx-auto mt-3 text-category-description text-lg font-bold"
        >
          {categoryDescription}
        </p>
        <span className="text-tertiary-foreground text-sm font-semibold mt-1">
          {categoryItemsLength} {t("convertor")} {categoryTitle}
        </span>
      </section>
  )
}

export default CategoryHeroSection
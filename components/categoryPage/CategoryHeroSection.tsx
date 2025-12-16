import Image from "next/image"
import { useTranslations } from "next-intl"

type CategoryHeroSectionProps = {
  categoryIcon: string
  categoryTitle: string
  categoryDescription: string
  categoryItemsLength: number
}

const CategoryHeroSection: React.FC<CategoryHeroSectionProps> = ({
  categoryTitle,
  categoryIcon,
  categoryDescription,
  categoryItemsLength,
}) => {
  const t = useTranslations("CategoriesSection")

  return (
    <section className="container mx-auto mt-12 text-center">
      <div className="flex items-center justify-center gap-2">
        <div className="bg-primary h-9 w-9 rounded p-1">
          <Image
            src={categoryIcon}
            alt={categoryTitle}
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
        <h1 className="text-secondary-foreground text-2xl font-bold">{categoryTitle}</h1>
      </div>
      <p className="text-category-description mx-auto mt-3 w-full max-w-[796px] text-lg font-bold">
        {categoryDescription}
      </p>
      <span className="text-tertiary-foreground mt-1 text-sm font-semibold">
        {categoryItemsLength} {t("convertor")} {categoryTitle}
      </span>
    </section>
  )
}

export default CategoryHeroSection

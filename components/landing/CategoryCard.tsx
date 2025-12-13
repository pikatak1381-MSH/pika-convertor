import type { Category } from "@/app/[locale]/_data/categories"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/navigation"

interface CategoryCardProps {
    category: Category
    subCount?: number
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    category,
}) => {
    const t = useTranslations("CategoriesSection")
    
    return (
        <div
            className="w-full h-auto aspect-285/338 px-5 pb-4 pt-5 border bg-white shadow-sm rounded-[20px] overflow-hidden flex flex-col"
        >
            {/* Title */}
            <div
                className="flex items-center gap-2 mb-2"
            >
                <div className="w-7 h-7 rounded overflow-hidden">
                    <Image
                        src={category.icon}
                        alt={category.i18nKey}
                        width={28}
                        height={28}
                        className="size-full object-contain"
                    />
                </div>
                <h3 className="text-base font-semibold">{t(category.i18nKey)}</h3>
            </div>

            {/* Convertor list */}
            <ul className="flex flex-col gap-2 flex-1">
                {category.subCategories.slice(0, 5).map((cat) => (
                    <li
                        key={cat.id}
                    >
                        <Link
                            href="/"
                            className="p-2 text-sm font-semibold flex items-center gap-1 rounded-[20px] hover:shadow-md transition-shadow duration-300 border border-transparent hover:border-border"
                        >
                            <div className="w-4.5 h-4.5 rounded overflow-hidden">
                                <Image 
                                    src={cat.icon}
                                    alt={cat.i18nKey}
                                    width={18}
                                    height={18}
                                    className="size-full object-contain"
                                />
                            </div>
                            <span className="text-pretty">
                                {t(cat.i18nKey)}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* More Info Button */}
            <button
                className="text-sm font-semibold self-end text-secondary-foreground hover:bg-hover hover:text-hover-secondary rounded-[20px] px-2 py-1 transition-colors"
            >
                {t("moreInfoBtn")}
            </button>
        </div>
  )
}

export default CategoryCard
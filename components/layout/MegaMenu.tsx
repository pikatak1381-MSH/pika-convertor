import { useTranslations } from "next-intl"
import { categories } from "@/app/[locale]/_data/categories"
import { useState } from "react"
import Image from "next/image"

const MegaMenu = () => {
    const t = useTranslations("CategoriesSection")
    const [activeCategory, setActiveCategory] = useState("engineering")

    return (
        <div
            className="
                fixed left-0 right-0 top-19
                hidden group-hover:block
                h-[597px] bg-background text-foreground
                border-t shadow-xl
            "
        >
            <div className="container mx-auto h-full p-8">

                <div className="w-full h-full flex">

                    {/* Categories Column */}
                    <div
                        className="w-full h-full max-w-[387px]"
                    >
                        <h3 
                            className="text-tertiary-foreground text-lg font-bold text-nowrap"
                        >
                            دسته بندی‌ها
                        </h3>
                        <ul
                            className="h-full flex flex-col justify-between"
                        >
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <button
                                        className={`w-full flex items-center gap-3 py-1 px-3 text-base font-semibold text-nowrap rounded-lg border border-transparent ${
                                            activeCategory === category.id ? "bg-white border border-black shadow-xs" : ""
                                        }`}
                                        onClick={() => setActiveCategory(category.id)}
                                    >
                                        <div
                                            className="w-5 h-5 bg-secondary-background rounded-full"
                                        >
                                            <Image 
                                                src={category.icon}
                                                alt={category.i18nKey}
                                                width={20}
                                                height={20}
                                                className="size-full object-cover"
                                            />
                                        </div>
                                        {t(category.i18nKey)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sub-Categories Column */}
                    <div
                        className="flex-1 bg-white rounded-xl border"
                    >

                    </div>
                </div>
            </div>
        </div>
  )
}

export default MegaMenu 
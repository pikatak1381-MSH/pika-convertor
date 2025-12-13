import { useTranslations } from "next-intl"
import { categories } from "@/app/[locale]/_data/categories"
import { useState } from "react"
import Image from "next/image"

const MegaMenu = () => {
    const t = useTranslations("CategoriesSection")
    const [activeCategory, setActiveCategory] = useState("engineering")

    return (
        <div className="w-[800px] h-[597px] bg-background text-secondary-foreground absolute right-0 top-full hidden group-hover:block shadow-lg z-60">
            <div
                className="w-full max-w-[1200px] grid grid-cols-2 mb-3.5 p-12"
            >
                {/* Categories - Right Panel */}
                <div
                    className="flex flex-col"
                >
                    <h3 className="text-tertiary-foreground text-lg font-bold text-nowrap">دسته بندی‌ها</h3>
                    <ul
                        className="flex flex-col gap-2"
                    >
                        {categories.map((category) => (
                            <li key={category.id} className="">
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

                {/* Sub-categories - Left Panel */}
                <div
                    className="bg-white"
                >
                    
                </div>
            </div>
        </div>
  )
}

export default MegaMenu
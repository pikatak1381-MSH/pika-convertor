import { useTranslations } from "next-intl"
import { categories } from "@/app/[locale]/_data/categories"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const MegaMenu = () => {
    const t = useTranslations("CategoriesSection")
    const [activeCategoryId, setActiveCategoryId] = useState("engineering")
    
    const activeCategory = categories.find(cat => cat.id === activeCategoryId)

    // Animation variants
    const menuVariants = {
        hidden: { 
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2
            }
        }
    }

    const categoryItemVariants = {
        inactive: { 
            scale: 1,
            transition: { duration: 0.2 }
        },
        active: { 
            scale: 1.02,
            transition: { 
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1] as const
            }
        }
    }

    const subCategoriesContainerVariants = {
        hidden: { 
            opacity: 0 
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15
            }
        }
    }

    const subCategoryItemVariants = {
        hidden: { 
            opacity: 0,
            x: -20,
            scale: 0.95
        },
        visible: { 
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                className="
                    fixed left-0 right-0 top-19
                    hidden group-hover:block
                    h-[597px] bg-background text-foreground
                    border-t shadow-xl
                "
            >
                <div className="container mx-auto h-full p-8">
                    <div className="w-full h-full flex flex-col">
                        <div className="w-full h-full flex gap-4">

                            {/* Categories Right Column */}
                            <div className="w-full h-full max-w-[387px]">
                                <ul className="h-full flex flex-col gap-2">
                                    <motion.h3 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 }}
                                        className="text-tertiary-foreground text-lg font-bold text-nowrap mb-2"
                                    >
                                        {t("categoriesTitle")}
                                    </motion.h3>
                                    {categories.map((category, index) => {
                                        const isActive = activeCategoryId === category.id
                                        return (
                                            <motion.li 
                                                key={category.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ 
                                                    duration: 0.4, 
                                                    delay: 0.15 + (index * 0.03),
                                                    ease: [0.25, 0.46, 0.45, 0.94] as const
                                                }}
                                                className="relative"
                                            >
                                                <motion.div
                                                    variants={categoryItemVariants}
                                                    animate={isActive ? "active" : "inactive"}
                                                    className={`relative w-full flex items-center py-1 px-3 text-base font-semibold text-nowrap rounded-lg cursor-pointer transition-all ${
                                                        isActive 
                                                            ? "bg-white border border-border shadow-xs" 
                                                            : "border border-transparent hover:bg-secondary-background"
                                                    }`}
                                                >
                                                    <button
                                                        className="w-full flex items-center gap-3"
                                                        onClick={() => setActiveCategoryId(category.id)}
                                                    >
                                                        <motion.div 
                                                            className="w-8 h-8 bg-secondary-background rounded-full flex items-center justify-center"
                                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <Image 
                                                                src={category.icon}
                                                                alt={category.i18nKey}
                                                                width={20}
                                                                height={20}
                                                                className="w-5 h-5 object-contain"
                                                            />
                                                        </motion.div>
                                                        {t(category.i18nKey)}
                                                    </button>
                                                </motion.div>

                                                {/* Active category highlight background */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="active-category-bg"
                                                        className="absolute inset-0 bg-linear-to-l from-primary/5 to-transparent rounded-lg -z-10"
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 350,
                                                            damping: 30
                                                        }}
                                                    />
                                                )}
                                            </motion.li>
                                        )
                                    })}
                                </ul>
                            </div>

                            {/* Sub-Categories Left Column */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="relative flex-1 h-full bg-white rounded-xl border p-6 overflow-y-auto"
                            >
                                <AnimatePresence mode="wait">
                                    {activeCategory && (
                                        <motion.div
                                            key={activeCategoryId}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            variants={subCategoriesContainerVariants}
                                        >
                                            <motion.h3 
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-lg font-bold mb-4 text-tertiary-foreground"
                                            >
                                                {t("subCategoryTitle")}
                                            </motion.h3>
                                            <motion.div 
                                                className="grid grid-cols-3 gap-3"
                                                variants={subCategoriesContainerVariants}
                                            >
                                                {activeCategory.subCategories.map((subCategory) => (
                                                    <motion.div
                                                        key={subCategory.id}
                                                        variants={subCategoryItemVariants}
                                                    >
                                                        <Link
                                                            href={``}
                                                            className="flex items-center gap-1 p-2 rounded-full border border-transparent hover:border-gray-300 hover:shadow-xs transition-all group/item w-fit"
                                                        >
                                                            <motion.div 
                                                                className="w-4.5 h-4.5 rounded-lg flex items-center justify-center"
                                                                whileHover={{ scale: 1.15, rotate: 10 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <Image 
                                                                    src={subCategory.icon}
                                                                    alt={subCategory.i18nKey}
                                                                    width={18}
                                                                    height={18}
                                                                    className="size-full object-contain"
                                                                />
                                                            </motion.div>
                                                            <span className="text-sm font-semibold flex-1">
                                                                {t(subCategory.i18nKey)}
                                                            </span>
                                                            {subCategory.isNew && (
                                                                <motion.span 
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    transition={{ 
                                                                        type: "spring",
                                                                        stiffness: 500,
                                                                        damping: 15,
                                                                        delay: 0.2
                                                                    }}
                                                                    className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded"
                                                                >
                                                                    {t("isNewBadge")}
                                                                </motion.span>
                                                            )}
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>                        
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default MegaMenu
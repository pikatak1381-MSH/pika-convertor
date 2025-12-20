import { useTranslations } from "next-intl"
import { categories } from "@/app/[locale]/_data/categories"
import { useState } from "react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { motion, AnimatePresence } from "framer-motion"

const MegaMenu = () => {
  const t = useTranslations("CategoriesSection")
  const [activeCategoryId, setActiveCategoryId] = useState("engineering")

  const activeCategory = categories.find((cat) => cat.id === activeCategoryId)

  // Animation variants
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  }

  const categoryItemVariants = {
    inactive: {
      scale: 1,
      transition: { duration: 0.2 },
    },
    active: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1] as const,
      },
    },
  }

  const subCategoriesContainerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.15,
      },
    },
  }

  const subCategoryItemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={menuVariants}
        className="bg-background text-foreground fixed top-19 right-0 left-0 hidden h-[597px] border-t shadow-xl group-hover:block"
      >
        <div className="container mx-auto h-full p-8">
          <div className="flex h-full w-full flex-col">
            <div className="flex h-full w-full items-center gap-4">
              {/* Categories Right Column */}
              <div className="h-full w-full max-w-[387px]">
                <ul className="flex h-full flex-col gap-2">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-tertiary-foreground mb-2 text-lg font-bold text-nowrap"
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
                          delay: 0.15 + index * 0.03,
                          ease: [0.25, 0.46, 0.45, 0.94] as const,
                        }}
                      >
                        <motion.div
                          variants={categoryItemVariants}
                          animate={isActive ? "active" : "inactive"}
                          className={`navbar-item ${isActive ? "active" : "inactive"}`}
                        >
                          <button
                            className="flex w-full items-center gap-3"
                            onClick={() => setActiveCategoryId(category.id)}
                          >
                            <motion.div
                              className="bg-secondary-background flex h-8 w-8 items-center justify-center rounded-full"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Image
                                src={category.icon}
                                alt={category.i18nKey}
                                width={20}
                                height={20}
                                className="h-5 w-5 object-contain"
                              />
                            </motion.div>
                            {t(category.i18nKey)}
                          </button>
                        </motion.div>
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
                className="relative z-10 h-full flex-1 overflow-y-auto rounded-xl bg-white p-6"
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
                        className="text-tertiary-foreground mb-4 text-lg font-bold"
                      >
                        {t("subCategoryTitle")}
                      </motion.h3>
                      <motion.div
                        className="grid grid-cols-3 gap-3"
                        variants={subCategoriesContainerVariants}
                      >
                        {activeCategory.subCategories.map((subCategory) => (
                          <motion.div key={subCategory.id} variants={subCategoryItemVariants}>
                            <Link
                              href={{
                                pathname: "/[category]/[calculator]",
                                params: {
                                  category: activeCategoryId,
                                  calculator: subCategory.id,
                                },
                              }}
                              className="group/item flex w-fit items-center gap-1 rounded-full border border-transparent p-2 transition-all hover:border-gray-300 hover:shadow-xs"
                            >
                              <motion.div
                                className="flex h-4.5 w-4.5 items-center justify-center rounded-lg"
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
                              <span className="flex-1 text-sm font-semibold">
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
                                    delay: 0.2,
                                  }}
                                  className="bg-primary text-primary-foreground rounded px-2 py-1 text-xs"
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

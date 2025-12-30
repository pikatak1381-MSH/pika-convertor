"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { categories, type SubCategory, type Category } from "@/app/[locale]/_data/categories"

type SearchResult = {
  category: Category
  subcategory: SubCategory
  title: string
  description: string
}

const SearchBar = () => {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Build searchable results from all categories
  const allResults = useMemo((): SearchResult[] => {
    const results: SearchResult[] = []

    // Helper to get translated text
    const getTranslated = (key: string): string => {
      const parts = key.split(".")
      if (parts.length >= 3) {
        return t(`CategoriesSection.${key}`)
      }
      return key
    }

    categories.forEach((category) => {
      category.subCategories.forEach((subcategory) => {
        results.push({
          category,
          subcategory,
          title: getTranslated(subcategory.i18nKey),
          description: getTranslated(subcategory.descriptionKey),
        })
      })
    })

    return results
  }, [t])

  // Filter results based on query
  const filteredResults = useMemo(() => {
    if (!query.trim()) return []

    const lowerQuery = query.toLowerCase().trim()

    return allResults
      .filter((result) => {
        const titleMatch = result.title.toLowerCase().includes(lowerQuery)
        const descMatch = result.description.toLowerCase().includes(lowerQuery)
        const idMatch = result.subcategory.id.toLowerCase().includes(lowerQuery)
        return titleMatch || descMatch || idMatch
      })
      .slice(0, 8) // Limit to 8 results
  }, [query, allResults])

  const isOpen = isFocused && (query.trim().length > 0 || filteredResults.length > 0)

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsFocused(false)
      inputRef.current?.blur()
    }
  }

  const handleResultClick = (result: SearchResult) => {
    setQuery("")
    setIsFocused(false)
    router.push(`/${locale}/${result.category.id}/${result.subcategory.id}`)
  }

  return (
    <>
      {/* Dark overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-10 bg-black/40"
            onClick={() => setIsFocused(false)}
          />
        )}
      </AnimatePresence>

      <div ref={containerRef} className="relative z-20 mx-auto w-full max-w-[500px]">
        {/* Search Input */}
        <div
          className={`bg-input-background relative flex items-center gap-2 rounded-3xl border px-3 py-1 transition-shadow duration-200 ${
            isOpen ? "ring-primary/50 shadow-lg ring-2" : ""
          }`}
        >
          <Image
            src="/icons/search.svg"
            alt=""
            width={18}
            height={18}
            className="h-4.5 w-4.5 object-contain"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder={t("HeroSection.searchPlaceholder")}
            className="placeholder:text-input-placeholder w-full rounded-xl p-1 placeholder:text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {isOpen && query.trim().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-background absolute top-full right-0 left-0 mt-2 overflow-hidden rounded-2xl border shadow-xl"
            >
              {filteredResults.length > 0 ? (
                <ul className="max-h-[400px] overflow-y-auto py-2">
                  {filteredResults.map((result, index) => (
                    <motion.li
                      key={`${result.category.id}-${result.subcategory.id}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <button
                        onClick={() => handleResultClick(result)}
                        className="hover:bg-muted flex w-full items-start gap-3 px-4 py-3 text-start transition-colors"
                      >
                        <div className="bg-muted mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                          <Image
                            src={result.subcategory.icon}
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5 object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-foreground truncate font-medium">{result.title}</p>
                          <p className="text-muted-foreground truncate text-sm">
                            {result.description}
                          </p>
                          <p className="text-muted-foreground/70 mt-0.5 text-xs">
                            {t(`CategoriesSection.categories.${result.category.id}`)}
                          </p>
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted-foreground px-4 py-8 text-center">
                  {locale === "fa" ? "نتیجه‌ای یافت نشد" : "No results found"}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default SearchBar

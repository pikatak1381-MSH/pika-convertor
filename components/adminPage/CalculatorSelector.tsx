"use client"

import { categories } from "@/app/[locale]/_data/categories"
import { useLocale, useTranslations } from "next-intl"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CalculatorSelectorProps {
  value: string
  onChange: (calculatorId: string, categoryId: string) => void
  disabled?: boolean
}

const CalculatorSelector = ({ value, onChange, disabled }: CalculatorSelectorProps) => {
  const t = useTranslations("CategoriesSection")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  const handleChange = (combinedValue: string) => {
    const [categoryId, calculatorId] = combinedValue.split(":")
    onChange(calculatorId, categoryId)
  }

  return (
    <Select dir={dir} value={value} onValueChange={handleChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t("selectCalculator")} />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        {categories.map((category) => (
          <SelectGroup key={category.id}>
            <SelectLabel className="font-bold">{t(category.i18nKey)}</SelectLabel>
            {category.subCategories.map((sub) => (
              <SelectItem key={sub.id} value={`${category.id}:${sub.id}`}>
                {t(sub.i18nKey)}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CalculatorSelector

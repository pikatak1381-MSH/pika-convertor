"use client"

import { useLocale } from "next-intl"
import { useTranslations } from "next-intl"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LocaleSelectorProps {
  value: string
  onChange: (locale: string) => void
  disabled?: boolean
}

const LocaleSelector = ({ value, onChange, disabled }: LocaleSelectorProps) => {
  const t = useTranslations("Admin")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  return (
    <Select dir={dir} value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t("selectLocale")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="fa">فارسی (Farsi)</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default LocaleSelector

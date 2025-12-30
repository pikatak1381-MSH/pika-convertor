"use client"

import { useTranslations } from "next-intl"
import SearchBar from "./SearchBar"

const HeroSection = () => {
  const t = useTranslations("HeroSection")

  return (
    <section className="container mx-auto">
      {/* Text */}
      <div className="pt-20 text-center">
        <h1 className="text-foreground text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-3 text-lg font-bold">{t("desc")}</p>
        <p className="text-muted-foreground text-lg font-bold">{t("desc2")}</p>
      </div>

      {/* Search Bar */}
      <div className="mt-6">
        <SearchBar />
        <p className="mx-auto mt-2 max-w-[500px] text-start text-sm">{t("searchExample")}</p>
      </div>
    </section>
  )
}

export default HeroSection

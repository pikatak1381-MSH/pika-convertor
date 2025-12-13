" use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

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
      <div className="mx-auto w-full max-w-[500px]">
        <div className="bg-input-background relative mx-auto mt-6 flex items-center gap-2 rounded-3xl border px-3 py-1">
          <Image
            src="/icons/search.svg"
            alt=""
            width={18}
            height={18}
            className="h-4.5 w-4.5 object-contain"
          />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="placeholder:text-input-placeholder w-full rounded-xl p-1 placeholder:text-sm"
          />
        </div>
        <p className="mt-2 text-start text-sm">{t("searchExample")}</p>
      </div>
    </section>
  )
}

export default HeroSection

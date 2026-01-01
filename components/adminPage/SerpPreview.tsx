"use client"

import { useTranslations } from "next-intl"
import { Globe, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SerpPreviewProps {
  title: string
  description: string
  url: string
  locale: string
}

const SerpPreview = ({ title, description, url, locale }: SerpPreviewProps) => {
  const t = useTranslations("Admin.seo")
  const isRtl = locale === "fa"

  // Google typically shows 50-60 characters for title, ~155-160 for description
  const displayTitle = title || t("noTitle")
  const displayDescription = description || t("noDescription")

  // Calculate if title/description are truncated
  const isTitleTruncated = title.length > 60
  const isDescriptionTruncated = description.length > 155

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Globe className="size-4" />
        {t("serpPreview")}
      </div>

      <div
        className={cn(
          "rounded-lg border bg-white p-4 font-sans",
          isRtl && "text-right"
        )}
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Google-style SERP result */}
        <div className="space-y-1">
          {/* URL breadcrumb */}
          <div className="flex items-center gap-1 text-sm">
            <div className="flex size-6 items-center justify-center rounded-full bg-gray-100">
              <Globe className="size-3 text-gray-600" />
            </div>
            <span className="text-gray-700">pikaconvertor.com</span>
            <ChevronDown className="size-3 text-gray-500" />
          </div>
          <div className="text-xs text-gray-500">{url || "..."}</div>

          {/* Title */}
          <h3
            className={cn(
              "cursor-pointer text-xl leading-tight text-[#1a0dab] hover:underline",
              !title && "italic text-gray-400"
            )}
          >
            {isTitleTruncated ? `${displayTitle.slice(0, 57)}...` : displayTitle}
          </h3>

          {/* Description */}
          <p
            className={cn(
              "text-sm leading-relaxed text-gray-600",
              !description && "italic text-gray-400"
            )}
          >
            {isDescriptionTruncated
              ? `${displayDescription.slice(0, 152)}...`
              : displayDescription}
          </p>
        </div>
      </div>

      {/* Character count warnings */}
      <div className="flex flex-wrap gap-4 text-xs">
        <div
          className={cn(
            "flex items-center gap-1",
            title.length === 0
              ? "text-gray-400"
              : title.length <= 50
                ? "text-green-600"
                : title.length <= 60
                  ? "text-yellow-600"
                  : "text-red-600"
          )}
        >
          <span className="font-medium">{t("titleLength")}:</span>
          <span>
            {title.length}/60 {title.length > 60 && `(${t("tooLong")})`}
          </span>
        </div>

        <div
          className={cn(
            "flex items-center gap-1",
            description.length === 0
              ? "text-gray-400"
              : description.length <= 140
                ? "text-green-600"
                : description.length <= 160
                  ? "text-yellow-600"
                  : "text-red-600"
          )}
        >
          <span className="font-medium">{t("descLength")}:</span>
          <span>
            {description.length}/160{" "}
            {description.length > 160 && `(${t("tooLong")})`}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SerpPreview

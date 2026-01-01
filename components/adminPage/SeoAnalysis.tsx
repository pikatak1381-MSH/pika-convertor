"use client"

import { useMemo } from "react"
import { useTranslations } from "next-intl"
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Type,
  FileText,
  Link2,
  Hash,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SeoAnalysisProps {
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  content: string
  locale: string
}

interface AnalysisItem {
  id: string
  status: "good" | "warning" | "error" | "info"
  message: string
  detail?: string
}

const SeoAnalysis = ({
  metaTitle,
  metaDescription,
  focusKeyword,
  content,
  locale,
}: SeoAnalysisProps) => {
  const t = useTranslations("Admin.seo")

  // Strip HTML tags for text analysis
  const plainContent = useMemo(() => {
    return content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  }, [content])

  // Word count
  const wordCount = useMemo(() => {
    if (!plainContent) return 0
    // Handle both English and Farsi word counting
    return plainContent.split(/\s+/).filter((word) => word.length > 0).length
  }, [plainContent])

  // Extract headings from content
  const headings = useMemo(() => {
    const h2Matches = content.match(/<h2[^>]*>.*?<\/h2>/gi) || []
    const h3Matches = content.match(/<h3[^>]*>.*?<\/h3>/gi) || []
    const h4Matches = content.match(/<h4[^>]*>.*?<\/h4>/gi) || []
    return { h2: h2Matches.length, h3: h3Matches.length, h4: h4Matches.length }
  }, [content])

  // Count links
  const linkCount = useMemo(() => {
    const links = content.match(/<a[^>]*href[^>]*>/gi) || []
    return links.length
  }, [content])

  // Keyword density calculation
  const keywordAnalysis = useMemo(() => {
    if (!focusKeyword || !plainContent) {
      return { count: 0, density: 0 }
    }

    const keyword = focusKeyword.toLowerCase()
    const text = plainContent.toLowerCase()

    // Count keyword occurrences
    const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")
    const matches = text.match(regex) || []

    // Calculate density (occurrences per 100 words)
    const density = wordCount > 0 ? (matches.length / wordCount) * 100 : 0

    return { count: matches.length, density: Math.round(density * 100) / 100 }
  }, [focusKeyword, plainContent, wordCount])

  // Check if keyword is in title
  const keywordInTitle = useMemo(() => {
    if (!focusKeyword || !metaTitle) return false
    return metaTitle.toLowerCase().includes(focusKeyword.toLowerCase())
  }, [focusKeyword, metaTitle])

  // Check if keyword is in description
  const keywordInDescription = useMemo(() => {
    if (!focusKeyword || !metaDescription) return false
    return metaDescription.toLowerCase().includes(focusKeyword.toLowerCase())
  }, [focusKeyword, metaDescription])

  // Generate analysis items
  const analysisItems = useMemo((): AnalysisItem[] => {
    const items: AnalysisItem[] = []

    // Meta Title Analysis
    if (!metaTitle) {
      items.push({
        id: "title-missing",
        status: "error",
        message: t("analysis.titleMissing"),
      })
    } else if (metaTitle.length < 30) {
      items.push({
        id: "title-short",
        status: "warning",
        message: t("analysis.titleShort"),
        detail: `${metaTitle.length}/30`,
      })
    } else if (metaTitle.length > 60) {
      items.push({
        id: "title-long",
        status: "warning",
        message: t("analysis.titleLong"),
        detail: `${metaTitle.length}/60`,
      })
    } else {
      items.push({
        id: "title-good",
        status: "good",
        message: t("analysis.titleGood"),
        detail: `${metaTitle.length} ${t("characters")}`,
      })
    }

    // Meta Description Analysis
    if (!metaDescription) {
      items.push({
        id: "desc-missing",
        status: "error",
        message: t("analysis.descMissing"),
      })
    } else if (metaDescription.length < 120) {
      items.push({
        id: "desc-short",
        status: "warning",
        message: t("analysis.descShort"),
        detail: `${metaDescription.length}/120`,
      })
    } else if (metaDescription.length > 160) {
      items.push({
        id: "desc-long",
        status: "warning",
        message: t("analysis.descLong"),
        detail: `${metaDescription.length}/160`,
      })
    } else {
      items.push({
        id: "desc-good",
        status: "good",
        message: t("analysis.descGood"),
        detail: `${metaDescription.length} ${t("characters")}`,
      })
    }

    // Focus Keyword Analysis
    if (!focusKeyword) {
      items.push({
        id: "keyword-missing",
        status: "warning",
        message: t("analysis.keywordMissing"),
      })
    } else {
      // Keyword in title
      if (keywordInTitle) {
        items.push({
          id: "keyword-title",
          status: "good",
          message: t("analysis.keywordInTitle"),
        })
      } else {
        items.push({
          id: "keyword-title-missing",
          status: "warning",
          message: t("analysis.keywordNotInTitle"),
        })
      }

      // Keyword in description
      if (keywordInDescription) {
        items.push({
          id: "keyword-desc",
          status: "good",
          message: t("analysis.keywordInDesc"),
        })
      } else {
        items.push({
          id: "keyword-desc-missing",
          status: "warning",
          message: t("analysis.keywordNotInDesc"),
        })
      }

      // Keyword density
      if (keywordAnalysis.count === 0) {
        items.push({
          id: "keyword-content",
          status: "error",
          message: t("analysis.keywordNotInContent"),
        })
      } else if (keywordAnalysis.density < 0.5) {
        items.push({
          id: "keyword-density-low",
          status: "warning",
          message: t("analysis.keywordDensityLow"),
          detail: `${keywordAnalysis.density}%`,
        })
      } else if (keywordAnalysis.density > 2.5) {
        items.push({
          id: "keyword-density-high",
          status: "warning",
          message: t("analysis.keywordDensityHigh"),
          detail: `${keywordAnalysis.density}%`,
        })
      } else {
        items.push({
          id: "keyword-density-good",
          status: "good",
          message: t("analysis.keywordDensityGood"),
          detail: `${keywordAnalysis.density}%`,
        })
      }
    }

    // Content Length Analysis
    if (wordCount < 50) {
      items.push({
        id: "content-short",
        status: "error",
        message: t("analysis.contentTooShort"),
        detail: `${wordCount} ${t("words")}`,
      })
    } else if (wordCount < 300) {
      items.push({
        id: "content-medium",
        status: "warning",
        message: t("analysis.contentShort"),
        detail: `${wordCount} ${t("words")}`,
      })
    } else {
      items.push({
        id: "content-good",
        status: "good",
        message: t("analysis.contentGood"),
        detail: `${wordCount} ${t("words")}`,
      })
    }

    // Headings Analysis
    if (headings.h2 === 0 && headings.h3 === 0) {
      items.push({
        id: "headings-missing",
        status: "warning",
        message: t("analysis.noHeadings"),
      })
    } else {
      items.push({
        id: "headings-good",
        status: "good",
        message: t("analysis.hasHeadings"),
        detail: `H2: ${headings.h2}, H3: ${headings.h3}, H4: ${headings.h4}`,
      })
    }

    // Links Analysis
    if (linkCount === 0 && wordCount > 100) {
      items.push({
        id: "links-missing",
        status: "info",
        message: t("analysis.noLinks"),
      })
    } else if (linkCount > 0) {
      items.push({
        id: "links-good",
        status: "good",
        message: t("analysis.hasLinks"),
        detail: `${linkCount} ${t("links")}`,
      })
    }

    return items
  }, [
    metaTitle,
    metaDescription,
    focusKeyword,
    keywordInTitle,
    keywordInDescription,
    keywordAnalysis,
    wordCount,
    headings,
    linkCount,
    t,
  ])

  // Calculate overall score
  const seoScore = useMemo(() => {
    const total = analysisItems.length
    const goodCount = analysisItems.filter((i) => i.status === "good").length
    const warningCount = analysisItems.filter((i) => i.status === "warning").length
    const errorCount = analysisItems.filter((i) => i.status === "error").length

    // Weighted scoring: good = 10, warning = 5, error = 0, info = 7
    const maxScore = total * 10
    const actualScore =
      goodCount * 10 +
      warningCount * 5 +
      analysisItems.filter((i) => i.status === "info").length * 7

    return Math.round((actualScore / maxScore) * 100)
  }, [analysisItems])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return t("scoreGood")
    if (score >= 60) return t("scoreOk")
    return t("scorePoor")
  }

  const getStatusIcon = (status: AnalysisItem["status"]) => {
    switch (status) {
      case "good":
        return <CheckCircle2 className="size-4 text-green-600" />
      case "warning":
        return <AlertCircle className="size-4 text-yellow-600" />
      case "error":
        return <XCircle className="size-4 text-red-600" />
      case "info":
        return <AlertCircle className="size-4 text-blue-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="size-5" />
          {t("seoAnalysis")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Circle */}
        <div className="flex items-center justify-center py-4">
          <div className="relative flex size-24 items-center justify-center">
            <svg className="size-24 -rotate-90 transform">
              <circle
                cx="48"
                cy="48"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="48"
                cy="48"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${(seoScore / 100) * 264} 264`}
                className={getScoreColor(seoScore)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-2xl font-bold", getScoreColor(seoScore))}>{seoScore}</span>
              <span className="text-muted-foreground text-xs">{getScoreLabel(seoScore)}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="bg-muted/50 j-c flex items-center gap-2 rounded-md px-3 py-2">
            <FileText className="text-muted-foreground size-4" />
            <span>
              {wordCount} {t("words")}
            </span>
          </div>
          <div className="bg-muted/50 j-c flex items-center gap-2 rounded-md px-3 py-2">
            <Hash className="text-muted-foreground size-4" />
            <span>
              {headings.h2 + headings.h3 + headings.h4} {t("headings")}
            </span>
          </div>
          <div className="bg-muted/50 j-c flex items-center gap-2 rounded-md px-3 py-2">
            <Link2 className="text-muted-foreground size-4" />
            <span>
              {linkCount} {t("links")}
            </span>
          </div>
          <div className="bg-muted/50 j-c flex items-center gap-2 rounded-md px-3 py-2">
            <TrendingUp className="text-muted-foreground size-4" />
            <span>
              {keywordAnalysis.count}x {t("keyword")}
            </span>
          </div>
        </div>

        {/* Analysis Items */}
        <div className="space-y-2">
          {analysisItems.map((item) => (
            <div
              key={item.id}
              className="hover:bg-muted/50 flex items-start gap-2 rounded-md px-2 py-1.5 text-sm"
            >
              {getStatusIcon(item.status)}
              <div className="flex-1">
                <span>{item.message}</span>
                {item.detail && <span className="text-muted-foreground ms-1">({item.detail})</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SeoAnalysis

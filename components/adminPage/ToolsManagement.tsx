"use client"

import { useState, useMemo, useCallback } from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  FileEdit,
  PlusCircle,
  Edit,
  BarChart3,
  Wrench,
} from "lucide-react"

// Types for tool data
interface Tool {
  id: string
  i18nKey: string
  descriptionKey: string
  icon: string
  categoryId: string
  categoryI18nKey: string
  faStatus: "PUBLISHED" | "DRAFT" | "ARCHIVED" | null
  enStatus: "PUBLISHED" | "DRAFT" | "ARCHIVED" | null
  faContentId: string | null
  enContentId: string | null
}

interface Stats {
  totalTools: number
  published: { fa: number; en: number }
  draft: { fa: number; en: number }
  unpublished: { fa: number; en: number }
}

interface Category {
  id: string
  i18nKey: string
}

interface ToolsManagementProps {
  tools: Tool[]
  stats: Stats
  categories: Category[]
}

// Filter status types
type StatusFilter = "all" | "published" | "unpublished" | "draft"

const ToolsManagement = ({ tools, stats, categories }: ToolsManagementProps) => {
  const t = useTranslations("Admin")
  const tCat = useTranslations("CategoriesSection")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [localeFilter, setLocaleFilter] = useState<"fa" | "en">("fa")

  // Get tool status for selected locale (memoized to satisfy React Compiler)
  const getToolStatus = useCallback(
    (tool: Tool): "published" | "draft" | "unpublished" => {
      const status = localeFilter === "fa" ? tool.faStatus : tool.enStatus
      if (status === "PUBLISHED") return "published"
      if (status === "DRAFT") return "draft"
      return "unpublished"
    },
    [localeFilter]
  )

  // Filter tools
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Search filter - search by translated name
      if (searchQuery) {
        const toolName = tCat(tool.i18nKey).toLowerCase()
        const categoryName = tCat(tool.categoryI18nKey).toLowerCase()
        const query = searchQuery.toLowerCase()
        if (
          !toolName.includes(query) &&
          !categoryName.includes(query) &&
          !tool.id.includes(query)
        ) {
          return false
        }
      }

      // Category filter
      if (categoryFilter !== "all" && tool.categoryId !== categoryFilter) {
        return false
      }

      // Status filter
      if (statusFilter !== "all") {
        const toolStatus = getToolStatus(tool)
        if (toolStatus !== statusFilter) {
          return false
        }
      }

      return true
    })
  }, [tools, searchQuery, categoryFilter, statusFilter, getToolStatus, tCat])

  // Get status badge for a tool
  const getStatusBadge = (tool: Tool) => {
    const status = getToolStatus(tool)
    switch (status) {
      case "published":
        return (
          <Badge variant="default" className="bg-green-600">
            <CheckCircle className="me-1 size-3" />
            {t("status.published")}
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="secondary" className="border-yellow-400 bg-yellow-50 text-yellow-600">
            <FileEdit className="me-1 size-3" />
            {t("status.draft")}
          </Badge>
        )
      case "unpublished":
        return (
          <Badge variant="outline" className="border-orange-400 text-orange-600">
            <XCircle className="me-1 size-3" />
            {t("tools.unpublished")}
          </Badge>
        )
    }
  }

  // Get category badge
  const getCategoryBadge = (tool: Tool) => {
    return (
      <Badge variant="outline" className="text-muted-foreground">
        {tCat(tool.categoryI18nKey)}
      </Badge>
    )
  }

  // Get action button based on status
  const getActionButton = (tool: Tool) => {
    const contentId = localeFilter === "fa" ? tool.faContentId : tool.enContentId
    const status = getToolStatus(tool)

    if (status === "unpublished") {
      // No content exists
      return (
        <Button className="w-full" size="sm" asChild>
          <Link
            href={`/${locale}/admin/content/new?calculator=${tool.id}&category=${tool.categoryId}&locale=${localeFilter}`}
          >
            <PlusCircle className="me-1 size-4" />
            {t("tools.addContent")}
          </Link>
        </Button>
      )
    } else {
      // Content exists - edit
      return (
        <Button className="w-full" size="sm" variant="outline" asChild>
          <Link href={`/${locale}/admin/content/${contentId}`}>
            <Edit className="me-1 size-4" />
            {t("edit")}
          </Link>
        </Button>
      )
    }
  }

  return (
    <div className="space-y-6" dir={dir}>
      {/* Statistics Section */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Total Tools */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("tools.allTools")}</CardTitle>
            <Wrench className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTools}</div>
            <p className="text-muted-foreground text-xs">{t("tools.totalInSystem")}</p>
          </CardContent>
        </Card>

        {/* Published */}
        <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">
              {t("status.published")}
            </CardTitle>
            <CheckCircle className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {localeFilter === "fa" ? stats.published.fa : stats.published.en} / {stats.totalTools}
            </div>
            <p className="text-xs text-green-600/80">
              {localeFilter === "fa" ? "فارسی" : "English"}
            </p>
          </CardContent>
        </Card>

        {/* Drafts */}
        <Card className="border-yellow-200 bg-yellow-50/50 dark:border-yellow-900 dark:bg-yellow-950/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
              {t("status.draft")}
            </CardTitle>
            <FileEdit className="size-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
              {localeFilter === "fa" ? stats.draft.fa : stats.draft.en} / {stats.totalTools}
            </div>
            <p className="text-xs text-yellow-600/80">
              {localeFilter === "fa" ? "فارسی" : "English"}
            </p>
          </CardContent>
        </Card>

        {/* Unpublished */}
        <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-900 dark:bg-orange-950/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-400">
              {t("tools.unpublished")}
            </CardTitle>
            <XCircle className="size-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">
              {localeFilter === "fa" ? stats.unpublished.fa : stats.unpublished.en} /{" "}
              {stats.totalTools}
            </div>
            <p className="text-xs text-orange-600/80">
              {localeFilter === "fa" ? "فارسی" : "English"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <BarChart3 className="size-4" />
              {t("tools.seoProgress")}
            </CardTitle>
            <span className="text-muted-foreground text-sm">
              {localeFilter === "fa"
                ? `${stats.published.fa + stats.draft.fa} / ${stats.totalTools}`
                : `${stats.published.en + stats.draft.en} / ${stats.totalTools}`}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="flex h-full">
              {/* Published portion */}
              <div
                className="bg-green-500 transition-all"
                style={{
                  width: `${((localeFilter === "fa" ? stats.published.fa : stats.published.en) / stats.totalTools) * 100}%`,
                }}
              />
              {/* Draft portion */}
              <div
                className="bg-yellow-500 transition-all"
                style={{
                  width: `${((localeFilter === "fa" ? stats.draft.fa : stats.draft.en) / stats.totalTools) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-green-500" />
              <span>{t("status.published")}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-yellow-500" />
              <span>{t("status.draft")}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-gray-300 dark:bg-gray-600" />
              <span>{t("tools.unpublished")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative min-w-[200px] flex-1">
              <Search className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2" />
              <Input
                placeholder={t("tools.searchTools")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-9"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="me-2 size-4" />
                <SelectValue placeholder={t("tools.filterByCategory")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("tools.allCategories")}</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {tCat(cat.i18nKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("filterByStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allStatuses")}</SelectItem>
                <SelectItem value="published">{t("status.published")}</SelectItem>
                <SelectItem value="draft">{t("status.draft")}</SelectItem>
                <SelectItem value="unpublished">{t("tools.unpublished")}</SelectItem>
              </SelectContent>
            </Select>

            {/* Locale Filter */}
            <Select value={localeFilter} onValueChange={(v) => setLocaleFilter(v as "fa" | "en")}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fa">فارسی</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="text-muted-foreground mt-4 text-sm">
            {t("tools.showingTools", { count: filteredTools.length, total: tools.length })}
          </div>
        </CardContent>
      </Card>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">{t("tools.noToolsFound")}</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className={cn(
                "flex flex-col justify-between transition-all hover:shadow-md",
                getToolStatus(tool) === "published" && "border-green-300 dark:border-green-900",
                getToolStatus(tool) === "draft" && "border-yellow-300 dark:border-yellow-900",
                getToolStatus(tool) === "unpublished" && "border-orange-300 dark:border-orange-900"
              )}
            >
              <CardHeader className="">
                <div className="flex items-start justify-start gap-2">
                  <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tool.icon} alt="" className="size-5 dark:invert" />
                  </div>
                  <CardTitle className="line-clamp-2 text-base">{tCat(tool.i18nKey)}</CardTitle>
                  {/* Tool icon */}
                </div>
              </CardHeader>
              <CardContent className="w-full space-y-3">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  {getCategoryBadge(tool)}
                  {getStatusBadge(tool)}
                </div>

                {/* Tool ID */}
                <p className="text-muted-foreground text-center font-mono text-xs">{tool.id}</p>

                {/* Action Button */}
                <div className="w-full pt-2">{getActionButton(tool)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ToolsManagement

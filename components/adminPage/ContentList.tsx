"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, Search, Filter, Target } from "lucide-react"

interface ContentItem {
  id: string
  calculatorId: string
  categoryId: string
  locale: string
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  updatedAt: string
  focusKeyword?: string | null
  author: {
    name: string | null
    username: string
  }
}

interface ContentListProps {
  contents: ContentItem[]
  userRole?: string
}

const ContentList = ({ contents, userRole }: ContentListProps) => {
  const t = useTranslations("Admin")
  const locale = useLocale()
  const router = useRouter()

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [localeFilter, setLocaleFilter] = useState<string>("all")

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [contentToDelete, setContentToDelete] = useState<ContentItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <Badge variant="default" className="bg-green-600">
            {t("status.published")}
          </Badge>
        )
      case "DRAFT":
        return <Badge variant="secondary">{t("status.draft")}</Badge>
      case "ARCHIVED":
        return <Badge variant="outline">{t("status.archived")}</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getCalculatorName = (calculatorId: string, categoryId: string) => {
    return `${calculatorId} (${categoryId})`
  }

  // Filter contents
  const filteredContents = contents.filter((content) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesCalculator = content.calculatorId.toLowerCase().includes(query)
      const matchesCategory = content.categoryId.toLowerCase().includes(query)
      const matchesKeyword = content.focusKeyword?.toLowerCase().includes(query)
      if (!matchesCalculator && !matchesCategory && !matchesKeyword) {
        return false
      }
    }

    // Status filter
    if (statusFilter !== "all" && content.status !== statusFilter) {
      return false
    }

    // Locale filter
    if (localeFilter !== "all" && content.locale !== localeFilter) {
      return false
    }

    return true
  })

  const handleDeleteClick = (content: ContentItem) => {
    setContentToDelete(content)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!contentToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/content/${contentToDelete.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.refresh()
      } else {
        const data = await response.json()
        alert(data.error || t("messages.error"))
      }
    } catch {
      alert(t("messages.error"))
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setContentToDelete(null)
    }
  }

  return (
    <div className="space-y-4" dir="rtl">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <Search className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ps-9"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="me-2 size-4" />
            <SelectValue placeholder={t("filterByStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStatuses")}</SelectItem>
            <SelectItem value="PUBLISHED">{t("status.published")}</SelectItem>
            <SelectItem value="DRAFT">{t("status.draft")}</SelectItem>
            <SelectItem value="ARCHIVED">{t("status.archived")}</SelectItem>
          </SelectContent>
        </Select>

        {/* Locale Filter */}
        <Select value={localeFilter} onValueChange={setLocaleFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={t("filterByLocale")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allLocales")}</SelectItem>
            <SelectItem value="fa">فارسی</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-muted-foreground text-sm">
        {filteredContents.length} / {contents.length} {t("content")}
      </div>

      {/* Table */}
      {filteredContents.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">{t("noContent")}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">{t("table.calculator")}</TableHead>
              <TableHead className="text-center">{t("table.locale")}</TableHead>
              <TableHead className="text-center">{t("seo.focusKeyword")}</TableHead>
              <TableHead className="text-center">{t("table.status")}</TableHead>
              <TableHead className="text-center">{t("table.author")}</TableHead>
              <TableHead className="text-center">{t("table.updatedAt")}</TableHead>
              <TableHead className="text-center">{t("table.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContents.map((content) => (
              <TableRow key={content.id}>
                <TableCell className="text-center font-medium">
                  {getCalculatorName(content.calculatorId, content.categoryId)}
                </TableCell>
                <TableCell className="text-center">
                  {content.locale === "fa" ? "فارسی" : "English"}
                </TableCell>
                <TableCell className="text-center">
                  {content.focusKeyword ? (
                    <div className="flex items-center gap-1">
                      <Target className="text-muted-foreground size-3" />
                      <span className="max-w-[120px] truncate text-sm">{content.focusKeyword}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-center">{getStatusBadge(content.status)}</TableCell>
                <TableCell className="text-center">
                  {content.author.name || content.author.username}
                </TableCell>
                <TableCell className="text-center">{formatDate(content.updatedAt)}</TableCell>
                <TableCell className="text-end">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/${locale}/admin/content/${content.id}`}>
                        <Edit className="size-4" />
                      </Link>
                    </Button>
                    {userRole === "ADMIN" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClick(content)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("delete")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("messages.confirmDelete")}
              {contentToDelete && (
                <span className="mt-2 block font-medium">
                  {contentToDelete.calculatorId} ({contentToDelete.locale})
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "..." : t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ContentList

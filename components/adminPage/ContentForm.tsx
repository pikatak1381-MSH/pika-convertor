"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CalculatorSelector from "./CalculatorSelector"
import LocaleSelector from "./LocaleSelector"
import RichTextEditor from "./RichTextEditor"
import SerpPreview from "./SerpPreview"
import SeoAnalysis from "./SeoAnalysis"
import { Save, Send, FileText, Search, Share2, Code, Settings, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContentFormProps {
  initialData?: {
    id: string
    calculatorId: string
    categoryId: string
    locale: string
    content: string
    metaTitle: string | null
    metaDescription: string | null
    focusKeyword?: string | null
    canonicalUrl?: string | null
    ogTitle?: string | null
    ogDescription?: string | null
    ogImage?: string | null
    twitterTitle?: string | null
    twitterDescription?: string | null
    twitterImage?: string | null
    schemaType?: string | null
    schemaData?: string | null
    noIndex?: boolean
    noFollow?: boolean
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  }
  isEditing?: boolean
  // Default values for pre-populating form (from Tools Management page)
  defaultValues?: {
    calculatorId: string
    categoryId: string
    contentLocale: string
  }
}

const SCHEMA_TYPES = [
  { value: "WebApplication", label: "Web Application" },
  { value: "FAQPage", label: "FAQ Page" },
  { value: "HowTo", label: "How To" },
  { value: "Article", label: "Article" },
  { value: "SoftwareApplication", label: "Software Application" },
]

const ContentForm = ({ initialData, isEditing = false, defaultValues }: ContentFormProps) => {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("Admin")
  const ts = useTranslations("Admin.seo")
  const dir = locale === "fa" ? "rtl" : "ltr"

  // Determine initial values - prioritize initialData (editing), then defaultValues (from query params)
  const initCalcId = initialData?.calculatorId || defaultValues?.calculatorId || ""
  const initCatId = initialData?.categoryId || defaultValues?.categoryId || ""
  const initLocale = initialData?.locale || defaultValues?.contentLocale || "fa"

  // Basic fields
  const [calculatorValue, setCalculatorValue] = useState(
    initCatId && initCalcId ? `${initCatId}:${initCalcId}` : ""
  )
  const [categoryId, setCategoryId] = useState(initCatId)
  const [calculatorId, setCalculatorId] = useState(initCalcId)
  const [contentLocale, setContentLocale] = useState(initLocale)
  const [content, setContent] = useState(initialData?.content || "")
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "")
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "")

  // SEO fields
  const [focusKeyword, setFocusKeyword] = useState(initialData?.focusKeyword || "")
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || "")

  // Open Graph fields
  const [ogTitle, setOgTitle] = useState(initialData?.ogTitle || "")
  const [ogDescription, setOgDescription] = useState(initialData?.ogDescription || "")
  const [ogImage, setOgImage] = useState(initialData?.ogImage || "")

  // Twitter fields
  const [twitterTitle, setTwitterTitle] = useState(initialData?.twitterTitle || "")
  const [twitterDescription, setTwitterDescription] = useState(
    initialData?.twitterDescription || ""
  )
  const [twitterImage, setTwitterImage] = useState(initialData?.twitterImage || "")

  // Schema.org fields
  const [schemaType, setSchemaType] = useState(initialData?.schemaType || "")
  const [schemaData, setSchemaData] = useState(initialData?.schemaData || "")

  // Indexing fields
  const [noIndex, setNoIndex] = useState(initialData?.noIndex || false)
  const [noFollow, setNoFollow] = useState(initialData?.noFollow || false)

  // Form state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("content")

  const handleCalculatorChange = (calcId: string, catId: string) => {
    setCalculatorId(calcId)
    setCategoryId(catId)
    setCalculatorValue(`${catId}:${calcId}`)
  }

  // Generate page URL for preview
  const pageUrl = calculatorId
    ? `https://pikaconvertor.com/${contentLocale}/${categoryId}/${calculatorId}`
    : ""

  const handleSubmit = async (status: "DRAFT" | "PUBLISHED") => {
    if (!calculatorId || !categoryId) {
      setError(t("errors.selectCalculator"))
      return
    }

    if (!content.trim()) {
      setError(t("errors.contentRequired"))
      return
    }

    setLoading(true)
    setError("")

    try {
      const url = isEditing ? `/api/admin/content/${initialData?.id}` : "/api/admin/content"

      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorId,
          categoryId,
          locale: contentLocale,
          content,
          metaTitle: metaTitle || null,
          metaDescription: metaDescription || null,
          focusKeyword: focusKeyword || null,
          canonicalUrl: canonicalUrl || null,
          ogTitle: ogTitle || null,
          ogDescription: ogDescription || null,
          ogImage: ogImage || null,
          twitterTitle: twitterTitle || null,
          twitterDescription: twitterDescription || null,
          twitterImage: twitterImage || null,
          schemaType: schemaType || null,
          schemaData: schemaData || null,
          noIndex,
          noFollow,
          status,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save")
      }

      router.push(`/${locale}/admin/content`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : t("messages.error"))
    } finally {
      setLoading(false)
    }
  }

  // Copy meta to OG/Twitter
  const copyMetaToSocial = () => {
    if (metaTitle && !ogTitle) setOgTitle(metaTitle)
    if (metaDescription && !ogDescription) setOgDescription(metaDescription)
    if (metaTitle && !twitterTitle) setTwitterTitle(metaTitle)
    if (metaDescription && !twitterDescription) setTwitterDescription(metaDescription)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Main Content Area */}
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? t("editContent") : t("newContent")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs dir={dir} value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6 grid w-full grid-cols-5 gap-1">
                <TabsTrigger value="content" className="gap-1">
                  <FileText className="size-3.5" />
                  <span className="hidden sm:inline">{ts("tabContent")}</span>
                </TabsTrigger>
                <TabsTrigger value="seo" className="gap-1">
                  <Search className="size-3.5" />
                  <span className="hidden sm:inline">{ts("tabSeo")}</span>
                </TabsTrigger>
                <TabsTrigger value="social" className="gap-1">
                  <Share2 className="size-3.5" />
                  <span className="hidden sm:inline">{ts("tabSocial")}</span>
                </TabsTrigger>
                <TabsTrigger value="schema" className="gap-1">
                  <Code className="size-3.5" />
                  <span className="hidden sm:inline">{ts("tabSchema")}</span>
                </TabsTrigger>
                <TabsTrigger value="advanced" className="gap-1">
                  <Settings className="size-3.5" />
                  <span className="hidden sm:inline">{ts("tabAdvanced")}</span>
                </TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent dir={dir} value="content" className="space-y-6">
                {/* Calculator and Locale Selection */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t("selectCalculator")}</Label>
                    <CalculatorSelector
                      value={calculatorValue}
                      onChange={handleCalculatorChange}
                      disabled={isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t("selectLocale")}</Label>
                    <LocaleSelector
                      value={contentLocale}
                      onChange={setContentLocale}
                      disabled={isEditing}
                    />
                  </div>
                </div>

                {/* Rich Text Editor */}
                <div className="space-y-2">
                  <Label>{t("content_body")}</Label>
                  <RichTextEditor
                    content={content}
                    onChange={setContent}
                    locale={contentLocale}
                    placeholder={t("placeholders.content")}
                  />
                </div>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-6">
                {/* Focus Keyword */}
                <div className="space-y-2">
                  <Label htmlFor="focusKeyword" className="flex items-center gap-2">
                    <Target className="size-4" />
                    {ts("focusKeyword")}
                  </Label>
                  <Input
                    id="focusKeyword"
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value.slice(0, 100))}
                    placeholder={ts("focusKeywordPlaceholder")}
                  />
                  <p className="text-muted-foreground text-xs">{ts("focusKeywordHelp")}</p>
                </div>

                {/* Meta Title */}
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">
                    {t("content_title")}
                    <span
                      className={cn(
                        "ms-2 text-sm",
                        metaTitle.length > 60
                          ? "text-red-500"
                          : metaTitle.length > 50
                            ? "text-yellow-500"
                            : "text-muted-foreground"
                      )}
                    >
                      ({metaTitle.length}/70)
                    </span>
                  </Label>
                  <Input
                    id="metaTitle"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value.slice(0, 70))}
                    placeholder={t("placeholders.metaTitle")}
                  />
                </div>

                {/* Meta Description */}
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">
                    {t("content_description")}
                    <span
                      className={cn(
                        "ms-2 text-sm",
                        metaDescription.length > 160
                          ? "text-red-500"
                          : metaDescription.length > 140
                            ? "text-yellow-500"
                            : "text-muted-foreground"
                      )}
                    >
                      ({metaDescription.length}/160)
                    </span>
                  </Label>
                  <Textarea
                    id="metaDescription"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
                    placeholder={t("placeholders.metaDescription")}
                    rows={3}
                  />
                </div>

                {/* SERP Preview */}
                <SerpPreview
                  title={metaTitle}
                  description={metaDescription}
                  url={pageUrl}
                  locale={contentLocale}
                />

                {/* Canonical URL */}
                <div className="space-y-2">
                  <Label htmlFor="canonicalUrl">{ts("canonicalUrl")}</Label>
                  <Input
                    id="canonicalUrl"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder={ts("canonicalUrlPlaceholder")}
                    dir="ltr"
                  />
                  <p className="text-muted-foreground text-xs">{ts("canonicalUrlHelp")}</p>
                </div>
              </TabsContent>

              {/* Social Tab */}
              <TabsContent value="social" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{ts("openGraph")}</h3>
                  <Button type="button" variant="outline" size="sm" onClick={copyMetaToSocial}>
                    {ts("copyFromMeta")}
                  </Button>
                </div>

                {/* OG Title */}
                <div className="space-y-2">
                  <Label htmlFor="ogTitle">
                    {ts("ogTitle")}
                    <span className="text-muted-foreground ms-2 text-sm">
                      ({ogTitle.length}/95)
                    </span>
                  </Label>
                  <Input
                    id="ogTitle"
                    value={ogTitle}
                    onChange={(e) => setOgTitle(e.target.value.slice(0, 95))}
                    placeholder={ts("ogTitlePlaceholder")}
                  />
                </div>

                {/* OG Description */}
                <div className="space-y-2">
                  <Label htmlFor="ogDescription">
                    {ts("ogDescription")}
                    <span className="text-muted-foreground ms-2 text-sm">
                      ({ogDescription.length}/200)
                    </span>
                  </Label>
                  <Textarea
                    id="ogDescription"
                    value={ogDescription}
                    onChange={(e) => setOgDescription(e.target.value.slice(0, 200))}
                    placeholder={ts("ogDescriptionPlaceholder")}
                    rows={3}
                  />
                </div>

                {/* OG Image */}
                <div className="space-y-2">
                  <Label htmlFor="ogImage">{ts("ogImage")}</Label>
                  <Input
                    id="ogImage"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    placeholder={ts("ogImagePlaceholder")}
                    dir="ltr"
                  />
                  <p className="text-muted-foreground text-xs">{ts("ogImageHelp")}</p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="mb-4 text-lg font-medium">{ts("twitterCard")}</h3>

                  {/* Twitter Title */}
                  <div className="mb-4 space-y-2">
                    <Label htmlFor="twitterTitle">
                      {ts("twitterTitle")}
                      <span className="text-muted-foreground ms-2 text-sm">
                        ({twitterTitle.length}/70)
                      </span>
                    </Label>
                    <Input
                      id="twitterTitle"
                      value={twitterTitle}
                      onChange={(e) => setTwitterTitle(e.target.value.slice(0, 70))}
                      placeholder={ts("twitterTitlePlaceholder")}
                    />
                  </div>

                  {/* Twitter Description */}
                  <div className="mb-4 space-y-2">
                    <Label htmlFor="twitterDescription">
                      {ts("twitterDescription")}
                      <span className="text-muted-foreground ms-2 text-sm">
                        ({twitterDescription.length}/200)
                      </span>
                    </Label>
                    <Textarea
                      id="twitterDescription"
                      value={twitterDescription}
                      onChange={(e) => setTwitterDescription(e.target.value.slice(0, 200))}
                      placeholder={ts("twitterDescriptionPlaceholder")}
                      rows={3}
                    />
                  </div>

                  {/* Twitter Image */}
                  <div className="space-y-2">
                    <Label htmlFor="twitterImage">{ts("twitterImage")}</Label>
                    <Input
                      id="twitterImage"
                      value={twitterImage}
                      onChange={(e) => setTwitterImage(e.target.value)}
                      placeholder={ts("twitterImagePlaceholder")}
                      dir="ltr"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Schema Tab */}
              <TabsContent value="schema" className="space-y-6">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h4 className="mb-2 font-medium text-blue-800">{ts("schemaInfo")}</h4>
                  <p className="text-sm text-blue-700">{ts("schemaInfoDesc")}</p>
                </div>

                {/* Schema Type */}
                <div className="space-y-2">
                  <Label htmlFor="schemaType">{ts("schemaType")}</Label>
                  <Select
                    value={schemaType || "none"}
                    onValueChange={(val) => setSchemaType(val === "none" ? "" : val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={ts.raw("schemaTypePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{ts("noSchema")}</SelectItem>
                      {SCHEMA_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Custom Schema Data */}
                <div className="space-y-2">
                  <Label htmlFor="schemaData">{ts("customSchemaData")}</Label>
                  <Textarea
                    id="schemaData"
                    value={schemaData}
                    onChange={(e) => setSchemaData(e.target.value)}
                    placeholder={ts.raw("schemaDataPlaceholder")}
                    rows={10}
                    className="font-mono text-sm"
                    dir="ltr"
                  />
                  <p className="text-muted-foreground text-xs">{ts("schemaDataHelp")}</p>
                </div>
              </TabsContent>

              {/* Advanced Tab */}
              <TabsContent value="advanced" className="space-y-6">
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <h4 className="mb-2 font-medium text-yellow-800">{ts("advancedWarning")}</h4>
                  <p className="text-sm text-yellow-700">{ts("advancedWarningDesc")}</p>
                </div>

                {/* Indexing Controls */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <Label htmlFor="noIndex">{ts("noIndex")}</Label>
                      <p className="text-muted-foreground text-sm">{ts("noIndexDesc")}</p>
                    </div>
                    <Switch id="noIndex" checked={noIndex} onCheckedChange={setNoIndex} />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <Label htmlFor="noFollow">{ts("noFollow")}</Label>
                      <p className="text-muted-foreground text-sm">{ts("noFollowDesc")}</p>
                    </div>
                    <Switch id="noFollow" checked={noFollow} onCheckedChange={setNoFollow} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Error Message */}
            {error && <p className="text-destructive mt-4 text-sm">{error}</p>}

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSubmit("DRAFT")}
                disabled={loading}
              >
                <Save className="me-2 size-4" />
                {t("saveDraft")}
              </Button>

              <Button type="button" onClick={() => handleSubmit("PUBLISHED")} disabled={loading}>
                <Send className="me-2 size-4" />
                {t("publish")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar - SEO Analysis */}
      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <SeoAnalysis
            metaTitle={metaTitle}
            metaDescription={metaDescription}
            focusKeyword={focusKeyword}
            content={content}
            locale={contentLocale}
          />
        </div>
      </div>
    </div>
  )
}

export default ContentForm

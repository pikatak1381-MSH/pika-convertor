import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getTranslations } from "next-intl/server"
import { categories } from "@/app/[locale]/_data/categories"
import ToolsManagement from "@/components/adminPage/ToolsManagement"

export default async function ToolsManagementPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const session = await auth()
  const { locale } = await params

  if (!session?.user) {
    redirect(`/${locale}/admin/login`)
  }

  const t = await getTranslations("Admin")

  // Fetch all SEO content from database
  const contents = await prisma.calculatorContent.findMany({
    select: {
      id: true,
      calculatorId: true,
      categoryId: true,
      locale: true,
      status: true,
    },
  })

  // Create a map for quick lookup: key = "calculatorId-locale"
  const contentMap = new Map(
    contents.map((c) => [`${c.calculatorId}-${c.locale}`, c])
  )

  // Flatten all tools from categories and enrich with SEO status
  const allTools = categories.flatMap((category) =>
    category.subCategories.map((tool) => {
      // Check content status for both locales
      const faContent = contentMap.get(`${tool.id}-fa`)
      const enContent = contentMap.get(`${tool.id}-en`)

      return {
        id: tool.id,
        i18nKey: tool.i18nKey,
        descriptionKey: tool.descriptionKey,
        icon: tool.icon,
        categoryId: category.id,
        categoryI18nKey: category.i18nKey,
        // SEO content status
        faStatus: faContent?.status || null,
        enStatus: enContent?.status || null,
        faContentId: faContent?.id || null,
        enContentId: enContent?.id || null,
      }
    })
  )

  // Calculate statistics
  const totalTools = allTools.length
  const publishedFa = allTools.filter((t) => t.faStatus === "PUBLISHED").length
  const publishedEn = allTools.filter((t) => t.enStatus === "PUBLISHED").length
  const draftFa = allTools.filter((t) => t.faStatus === "DRAFT").length
  const draftEn = allTools.filter((t) => t.enStatus === "DRAFT").length
  const unpublishedFa = allTools.filter((t) => !t.faStatus).length
  const unpublishedEn = allTools.filter((t) => !t.enStatus).length

  const stats = {
    totalTools,
    published: { fa: publishedFa, en: publishedEn },
    draft: { fa: draftFa, en: draftEn },
    unpublished: { fa: unpublishedFa, en: unpublishedEn },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("toolsManagement")}</h1>
      </div>

      <ToolsManagement
        tools={allTools}
        stats={stats}
        categories={categories.map((c) => ({
          id: c.id,
          i18nKey: c.i18nKey,
        }))}
      />
    </div>
  )
}

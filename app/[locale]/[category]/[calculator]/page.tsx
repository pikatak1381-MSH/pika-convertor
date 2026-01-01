import { categories } from "../../_data/categories"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import CalculatorShell from "@/components/calculatorPage/CalculatorShell"
import { CalculatorId, calculatorRegistry } from "@/components/calculators/calculators.registry"
import CalculatorHeader from "@/components/calculatorPage/CalculatorHeader"
import { BreadCrumb } from "@/components/BreadCrumbs"
import SeoContent from "@/components/calculatorPage/SeoContent"
import { prisma } from "@/lib/prisma"
import { Metadata } from "next"

interface CalculatorProps {
  params: Promise<{
    locale: string
    calculator: string
    category: string
  }>
}

// Generating metadata from SEO content in database
export async function generateMetadata({ params }: CalculatorProps): Promise<Metadata> {
  const { calculator, locale, category } = await params

  // Use findFirst with status filter since findUnique doesn't support non-unique fields in where
  const content = await prisma.calculatorContent.findFirst({
    where: {
      calculatorId: calculator,
      locale,
      status: "PUBLISHED",
    },
  })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pikaconverter.com"
  const pageUrl = `${baseUrl}/${locale}/${category}/${calculator}`

  // Default OG image if none provided
  const defaultOgImage = `${baseUrl}/og-image.png`

  const metadata: Metadata = {}

  // Basic metadata
  if (content?.metaTitle) {
    metadata.title = content.metaTitle
  }
  if (content?.metaDescription) {
    metadata.description = content.metaDescription
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contentAny = content as any
  if (contentAny?.focusKeyword) {
    metadata.keywords = contentAny.focusKeyword
  }

  // Canonical URL
  metadata.alternates = {
    canonical: contentAny?.canonicalUrl || pageUrl,
  }

  // Robots directive (new fields - will work after migration)
  const robotsDirectives: string[] = []
  if (contentAny?.noIndex) robotsDirectives.push("noindex")
  if (contentAny?.noFollow) robotsDirectives.push("nofollow")
  if (robotsDirectives.length > 0) {
    metadata.robots = robotsDirectives.join(", ")
  }

  // Open Graph
  metadata.openGraph = {
    type: "website",
    url: pageUrl,
    title: contentAny?.ogTitle || content?.metaTitle || undefined,
    description: contentAny?.ogDescription || content?.metaDescription || undefined,
    images: contentAny?.ogImage ? [contentAny.ogImage] : [defaultOgImage],
    siteName: "Pika Convertor",
    locale: locale === "fa" ? "fa_IR" : "en_US",
  }

  // Twitter Card
  metadata.twitter = {
    card: "summary_large_image",
    title: contentAny?.twitterTitle || contentAny?.ogTitle || content?.metaTitle || undefined,
    description:
      contentAny?.twitterDescription ||
      contentAny?.ogDescription ||
      content?.metaDescription ||
      undefined,
    images: contentAny?.twitterImage || contentAny?.ogImage || defaultOgImage,
  }

  return metadata
}

const Calculator = async ({ params }: CalculatorProps) => {
  const { category, calculator, locale } = await params
  const t = await getTranslations("CategoriesSection")

  if (!(calculator in calculatorRegistry)) {
    return notFound()
  }

  const categoryData = categories.find((c) => c.id === category)
  if (!categoryData) return notFound()

  const subCategory = categoryData.subCategories.find((sub) => sub.id === calculator)
  if (!subCategory) return notFound()

  const calculatorDef = calculatorRegistry[calculator as CalculatorId]
  if (!calculatorDef) return notFound()

  // Fetch SEO content from database
  const seoContent = await prisma.calculatorContent.findFirst({
    where: {
      calculatorId: calculator,
      locale,
      status: "PUBLISHED",
    },
  })

  const CalculatorComponent = calculatorDef.component

  // Generate JSON-LD structured data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pikaconverter.com"
  const pageUrl = `${baseUrl}/${locale}/${category}/${calculator}`

  // Default WebApplication schema for calculators
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t(subCategory.i18nKey),
    description: t(subCategory.descriptionKey),
    url: pageUrl,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  // Use custom schema data if provided, otherwise use default
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seoContentAny = seoContent as any
  let schemaData = defaultSchema
  if (seoContentAny?.schemaData) {
    try {
      schemaData = JSON.parse(seoContentAny.schemaData)
    } catch {
      // If parsing fails, use default schema
      schemaData = defaultSchema
    }
  } else if (seoContentAny?.schemaType) {
    // Use schema type to generate appropriate schema
    schemaData = {
      ...defaultSchema,
      "@type": seoContentAny.schemaType,
    }
  }

  return (
    <div className="mt-6">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <BreadCrumb
        locale={locale}
        category={category}
        calculator={calculator}
        categoryLabel={t(categoryData.i18nKey)}
        calculatorLabel={t(subCategory.i18nKey)}
      />
      <section className="mx-auto mt-17.5 text-center">
        {/* Title */}
        <CalculatorHeader
          categoryTitle={t(categoryData.i18nKey)}
          categoryIcon={categoryData.icon}
          subCategoryTitle={t(subCategory.i18nKey)}
          subCategoryDesription={t(subCategory.descriptionKey)}
        />

        {/* Calculator */}
        <CalculatorShell title={t(subCategory.i18nKey)}>
          <CalculatorComponent />
        </CalculatorShell>

        {/* SEO Content */}
        {seoContent?.content && <SeoContent content={seoContent.content} locale={locale} />}
      </section>
    </div>
  )
}

export default Calculator

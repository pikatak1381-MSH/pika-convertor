import Link from "next/link"
import { ChevronLeft, Home } from "lucide-react"
import { useTranslations } from "next-intl"

interface BreadCrumbProps {
  locale: string
  category: string
  calculator: string
  categoryLabel?: string
  calculatorLabel?: string
}

export function BreadCrumb({
  locale,
  category,
  calculator,
  categoryLabel,
  calculatorLabel,
}: BreadCrumbProps) {
  const t = useTranslations("BreadCrumbs")
  const formatSlug = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const categoryDisplay = categoryLabel || formatSlug(category)
  const calculatorDisplay = calculatorLabel || formatSlug(calculator)

  const breadcrumbs = [
    { label: t("home"), href: `/${locale}`, icon: false },
    { label: categoryDisplay, href: `/${locale}/${category}` },
    { label: calculatorDisplay, href: `/${locale}/${category}/${calculator}`, current: true },
  ]

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}${crumb.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && <ChevronLeft className="h-4 w-4 text-gray-400" aria-hidden="true" />}
              {crumb.current ? (
                <span className="font-medium text-gray-900 dark:text-gray-100">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {crumb.icon && <Home className="mr-1 inline h-4 w-4" aria-hidden="true" />}
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import ContentForm from "@/components/adminPage/ContentForm"

export default async function NewContentPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ calculator?: string; category?: string; locale?: string }>
}) {
  const session = await auth()
  const { locale } = await params
  const query = await searchParams

  if (!session?.user) {
    redirect(`/${locale}/admin/login`)
  }

  // Pre-populate form if query params are provided (from Tools Management page)
  const defaultValues = query.calculator && query.category
    ? {
        calculatorId: query.calculator,
        categoryId: query.category,
        contentLocale: query.locale || "fa",
      }
    : undefined

  return <ContentForm defaultValues={defaultValues} />
}

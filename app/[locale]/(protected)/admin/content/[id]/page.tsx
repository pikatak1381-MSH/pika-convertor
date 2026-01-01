import { auth } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ContentForm from "@/components/adminPage/ContentForm"

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const session = await auth()
  const { locale, id } = await params

  if (!session?.user) {
    redirect(`/${locale}/admin/login`)
  }

  const content = await prisma.calculatorContent.findUnique({
    where: { id },
  })

  if (!content) {
    notFound()
  }

  return (
    <ContentForm
      initialData={{
        id: content.id,
        calculatorId: content.calculatorId,
        categoryId: content.categoryId,
        locale: content.locale,
        content: content.content,
        metaTitle: content.metaTitle,
        metaDescription: content.metaDescription,
        status: content.status,
      }}
      isEditing
    />
  )
}

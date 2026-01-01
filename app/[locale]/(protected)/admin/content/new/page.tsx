import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import ContentForm from "@/components/adminPage/ContentForm"

export default async function NewContentPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const session = await auth()
  const { locale } = await params

  if (!session?.user) {
    redirect(`/${locale}/admin/login`)
  }

  return <ContentForm />
}

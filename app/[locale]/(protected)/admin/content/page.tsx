import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getTranslations } from "next-intl/server"
import ContentList from "@/components/adminPage/ContentList"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default async function ContentListPage({
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

  const contents = await prisma.calculatorContent.findMany({
    include: {
      author: {
        select: { name: true, username: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("content")}</h1>
        <Button asChild>
          <Link href={`/${locale}/admin/content/new`}>
            <PlusCircle className="me-2 size-4" />
            {t("newContent")}
          </Link>
        </Button>
      </div>

      <ContentList
        contents={contents.map((c) => ({
          ...c,
          updatedAt: c.updatedAt.toISOString(),
        }))}
        userRole={session.user.role}
      />
    </div>
  )
}

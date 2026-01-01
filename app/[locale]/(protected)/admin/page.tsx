import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Overview from "@/components/adminPage/Overview"

export default async function AdminPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  // Fetch stats
  const [total, published, draft] = await Promise.all([
    prisma.calculatorContent.count(),
    prisma.calculatorContent.count({ where: { status: "PUBLISHED" } }),
    prisma.calculatorContent.count({ where: { status: "DRAFT" } }),
  ])

  return <Overview stats={{ total, published, draft }} />
}

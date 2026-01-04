"use client"

import { useLocale } from "next-intl"
import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader"

interface AdminLayoutProps {
  children: React.ReactNode
  user: {
    id: string
    name?: string | null
    username: string
    role: string
  }
}

const AdminLayout = ({ children, user }: AdminLayoutProps) => {
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  return (
    <div className="bg-background flex min-h-screen" dir={dir}>
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader user={user} />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout

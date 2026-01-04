"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, PlusCircle, Settings } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

const AdminSidebar = () => {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("Admin")
  const dir = locale === "fa" ? "rtl" : "ltr"

  const navItems = [
    {
      href: `/${locale}/admin`,
      label: t("dashboard"),
      icon: LayoutDashboard,
    },
    {
      href: `/${locale}/admin/content`,
      label: t("content"),
      icon: FileText,
    },
    {
      href: `/${locale}/admin/content/new`,
      label: t("newContent"),
      icon: PlusCircle,
    },
    {
      href: `/${locale}/admin/settings`,
      label: t("settings"),
      icon: Settings,
    },
  ]

  return (
    <aside
      className={cn(
        "bg-card sticky top-0 h-screen w-64 border-e",
        dir === "rtl" && "border-r-0 border-l"
      )}
      dir={dir}
    >
      <div className="flex h-16 items-center justify-center border-b px-4">
        <h2 className="text-xl font-bold">{t("adminPanel")}</h2>
      </div>

      <nav className="space-y-2 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                "hover:bg-hover",
                isActive && "bg-secondary-background text-secondary-foreground"
              )}
            >
              <item.icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default AdminSidebar

"use client"

import { useTranslations, useLocale } from "next-intl"
import { LogOut, User } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

interface AdminHeaderProps {
  user: {
    id: string
    name?: string | null
    username: string
    role: string
  }
}

const AdminHeader = ({ user }: AdminHeaderProps) => {
  const locale = useLocale()
  const t = useTranslations("Admin")

  const handleSignOut = () => {
    signOut({ callbackUrl: `/${locale}/admin/login` })
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-2">
        <User className="size-5 text-muted-foreground" />
        <span className="font-medium">{user.name || user.username}</span>
        <span className="rounded-full bg-secondary-background px-2 py-0.5 text-xs">
          {user.role}
        </span>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className="gap-2"
      >
        <LogOut className="size-4" />
        {t("logout")}
      </Button>
    </header>
  )
}

export default AdminHeader

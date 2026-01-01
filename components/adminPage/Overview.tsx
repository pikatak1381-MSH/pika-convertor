"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, Clock } from "lucide-react"

interface OverviewProps {
  stats: {
    total: number
    published: number
    draft: number
  }
}

const Overview = ({ stats }: OverviewProps) => {
  const t = useTranslations("Admin")

  const statCards = [
    {
      title: t("stats.total"),
      value: stats.total,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: t("stats.published"),
      value: stats.published,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: t("stats.draft"),
      value: stats.draft,
      icon: Clock,
      color: "text-yellow-500",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("dashboard")}</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`size-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Overview

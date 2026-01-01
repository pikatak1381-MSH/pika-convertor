import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const contentSchema = z.object({
  calculatorId: z.string().min(1),
  categoryId: z.string().min(1),
  locale: z.enum(["fa", "en"]),
  content: z.string(),
  metaTitle: z.string().max(70).optional().nullable(),
  metaDescription: z.string().max(160).optional().nullable(),
  // SEO Fields
  focusKeyword: z.string().max(100).optional().nullable(),
  canonicalUrl: z.string().max(500).optional().nullable(),
  // Open Graph
  ogTitle: z.string().max(95).optional().nullable(),
  ogDescription: z.string().max(200).optional().nullable(),
  ogImage: z.string().max(500).optional().nullable(),
  // Twitter
  twitterTitle: z.string().max(70).optional().nullable(),
  twitterDescription: z.string().max(200).optional().nullable(),
  twitterImage: z.string().max(500).optional().nullable(),
  // Schema.org
  schemaType: z.string().max(50).optional().nullable(),
  schemaData: z.string().optional().nullable(),
  // Indexing
  noIndex: z.boolean().default(false),
  noFollow: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
})

// GET - List all content
export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const locale = searchParams.get("locale")
  const status = searchParams.get("status")

  const contents = await prisma.calculatorContent.findMany({
    where: {
      ...(locale && { locale }),
      ...(status && { status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" }),
    },
    include: {
      author: {
        select: { name: true, username: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  })

  return NextResponse.json(contents)
}

// POST - Create new content
export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const result = contentSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.issues },
      { status: 400 }
    )
  }

  // Check if content already exists for this calculator + locale
  const existing = await prisma.calculatorContent.findUnique({
    where: {
      calculatorId_locale: {
        calculatorId: result.data.calculatorId,
        locale: result.data.locale,
      },
    },
  })

  if (existing) {
    return NextResponse.json(
      { error: "Content already exists for this calculator and locale" },
      { status: 409 }
    )
  }

  const content = await prisma.calculatorContent.create({
    data: {
      ...result.data,
      authorId: session.user.id,
      publishedAt: result.data.status === "PUBLISHED" ? new Date() : null,
    },
  })

  return NextResponse.json(content, { status: 201 })
}

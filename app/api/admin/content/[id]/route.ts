import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const updateSchema = z.object({
  content: z.string().optional(),
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
  noIndex: z.boolean().optional(),
  noFollow: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
})

// GET - Get single content by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const content = await prisma.calculatorContent.findUnique({
    where: { id },
    include: {
      author: { select: { name: true, username: true } },
    },
  })

  if (!content) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(content)
}

// PUT - Update content
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const result = updateSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.issues },
      { status: 400 }
    )
  }

  // Check if content exists
  const existing = await prisma.calculatorContent.findUnique({
    where: { id },
  })

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const content = await prisma.calculatorContent.update({
    where: { id },
    data: {
      ...result.data,
      publishedAt:
        result.data.status === "PUBLISHED" && !existing.publishedAt
          ? new Date()
          : existing.publishedAt,
    },
  })

  return NextResponse.json(content)
}

// DELETE - Delete content
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Only admins can delete
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id } = await params

  try {
    await prisma.calculatorContent.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
}

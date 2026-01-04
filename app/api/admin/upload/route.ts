import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

// Allowed image types for security
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]
// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024

/**
 * POST - Upload an image file
 * Saves to public/uploads/editor/ directory
 * Returns the public URL of the uploaded image
 */
export async function POST(request: NextRequest) {
  // Check authentication - only logged-in users can upload
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Parse the form data from the request
    const formData = await request.formData()
    const file = formData.get("image") as File | null

    // Validate that a file was provided
    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      )
    }

    // Validate file type for security (prevent uploading malicious files)
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP" },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size: 5MB" },
        { status: 400 }
      )
    }

    // Create a unique filename using timestamp + random string
    // This prevents filename collisions and overwrites
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const filename = `${timestamp}-${randomString}.${extension}`

    // Define the upload directory path
    const uploadDir = path.join(process.cwd(), "public", "uploads", "editor")

    // Ensure the upload directory exists (create if it doesn't)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Convert the file to a buffer and write to disk
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(uploadDir, filename)
    await writeFile(filePath, buffer)

    // Return the public URL that can be used in the editor
    // The URL is relative to the public directory
    const imageUrl = `/uploads/editor/${filename}`

    return NextResponse.json({ url: imageUrl }, { status: 201 })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    )
  }
}

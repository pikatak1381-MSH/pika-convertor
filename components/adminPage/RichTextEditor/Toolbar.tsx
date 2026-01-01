"use client"

import { Editor } from "@tiptap/react"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading2,
  Heading3,
  Heading4,
  Link as LinkIcon,
  Unlink,
  Undo,
  Redo,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCallback, useState } from "react"

interface ToolbarProps {
  editor: Editor | null
  dir: "ltr" | "rtl"
}

const ToolbarButton = ({
  onClick,
  isActive,
  children,
  title,
  disabled,
}: {
  onClick: () => void
  isActive?: boolean
  children: React.ReactNode
  title: string
  disabled?: boolean
}) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={cn("h-8 w-8 p-0", isActive && "bg-secondary-background text-secondary-foreground")}
  >
    {children}
  </Button>
)

const Divider = () => <div className="bg-border mx-1 h-6 w-px" />

const Toolbar = ({ editor, dir }: ToolbarProps) => {
  const [linkUrl, setLinkUrl] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)

  const setLink = useCallback(() => {
    if (!editor) return

    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()

    setLinkUrl("")
    setShowLinkInput(false)
  }, [editor, linkUrl])

  if (!editor) return null

  return (
    <div className="bg-background flex flex-wrap items-center gap-1 border-b p-2">
      {/* Text formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold"
      >
        <Bold className="size-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic"
      >
        <Italic className="size-4" />
      </ToolbarButton>

      <Divider />

      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        <Heading2 className="size-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
      >
        <Heading3 className="size-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        isActive={editor.isActive("heading", { level: 4 })}
        title="Heading 4"
      >
        <Heading4 className="size-4" />
      </ToolbarButton>

      <Divider />

      {/* Alignment - RTL friendly order */}
      {dir === "rtl" ? (
        <>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Center"
          >
            <AlignCenter className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft className="size-4" />
          </ToolbarButton>
        </>
      ) : (
        <>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Center"
          >
            <AlignCenter className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight className="size-4" />
          </ToolbarButton>
        </>
      )}

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        isActive={editor.isActive({ textAlign: "justify" })}
        title="Justify"
      >
        <AlignJustify className="size-4" />
      </ToolbarButton>

      <Divider />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <List className="size-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Ordered List"
      >
        <ListOrdered className="size-4" />
      </ToolbarButton>

      <Divider />

      {/* Link */}
      {showLinkInput ? (
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
            className="h-8 w-48 rounded border px-2 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                setLink()
              }
              if (e.key === "Escape") {
                setShowLinkInput(false)
                setLinkUrl("")
              }
            }}
            autoFocus
          />
          <Button size="sm" onClick={setLink} className="h-8">
            Add
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setShowLinkInput(false)
              setLinkUrl("")
            }}
            className="h-8"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <ToolbarButton
            onClick={() => setShowLinkInput(true)}
            isActive={editor.isActive("link")}
            title="Add Link"
          >
            <LinkIcon className="size-4" />
          </ToolbarButton>

          {editor.isActive("link") && (
            <ToolbarButton
              onClick={() => editor.chain().focus().unsetLink().run()}
              title="Remove Link"
            >
              <Unlink className="size-4" />
            </ToolbarButton>
          )}
        </>
      )}

      <Divider />

      {/* Undo/Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo className="size-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo className="size-4" />
      </ToolbarButton>
    </div>
  )
}

export default Toolbar

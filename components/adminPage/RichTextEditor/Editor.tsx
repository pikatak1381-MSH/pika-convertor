"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Image from "@tiptap/extension-image"
// TextStyle and Color both come from the same package
import { TextStyle, Color } from "@tiptap/extension-text-style"
import Toolbar from "./Toolbar"
import { cn } from "@/lib/utils"

interface EditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  locale?: string
}

const RichTextEditor = ({ content, onChange, placeholder, locale = "fa" }: EditorProps) => {
  const dir = locale === "fa" ? "rtl" : "ltr"
  const defaultAlignment = dir === "rtl" ? "right" : "left"

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "شروع به نوشتن کنید...",
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4",
          "prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-h4:text-base",
          "prose-p:leading-relaxed prose-ul:list-disc prose-ol:list-decimal",
          dir === "rtl" && "text-right"
        ),
        dir: dir,
      },
    },
    immediatelyRender: false,
  })

  return (
    <div className="overflow-hidden rounded-lg border">
      <Toolbar editor={editor} dir={dir} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor

import { cn } from "@/lib/utils"

interface SeoContentProps {
  content: string
  locale: string
}

const SeoContent = ({ content, locale }: SeoContentProps) => {
  const dir = locale === "fa" ? "rtl" : "ltr"

  return (
    <article
      className={cn(
        "mx-auto mt-8 w-full max-w-[794px] rounded-[20px] border bg-white p-6 shadow-md",
        "prose prose-sm max-w-none",
        "prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-h4:text-base",
        "prose-p:leading-relaxed prose-a:text-primary prose-a:underline",
        "prose-ul:list-disc prose-ol:list-decimal",
        dir === "rtl" && "prose-rtl text-right"
      )}
      dir={dir}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default SeoContent

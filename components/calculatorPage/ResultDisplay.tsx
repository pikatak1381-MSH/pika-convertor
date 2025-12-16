import { useTranslations } from "next-intl"
import CopyIcon from "../ui/CopyIcon"
import ShareIcon from "../ui/ShareIcon"

interface ResultDisplayProps {
  result: string
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const t = useTranslations("CategoriesSection")
  return (
    <div className="mt-8 flex w-full max-w-[577px] flex-col gap-4">
      <p className="text-start font-bold">{t("result")}</p>

      <div className="flex items-center gap-4">
        <div className="bg-background w-full rounded-full border p-2">
          <p className="text-foreground font-semibold">{result}</p>
        </div>
        {/* Share and Copy */}
        <button className="group bg-secondary-background flex items-center justify-center rounded-full p-2 transition-colors hover:bg-[#39414d] hover:text-white">
          <ShareIcon className="h-6 w-6" />
        </button>
        <button className="bg-secondary-background flex h-10 w-10 items-center justify-center rounded-full p-2 transition-colors hover:bg-[#39414d] hover:text-white">
          <CopyIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export default ResultDisplay

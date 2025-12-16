import { useTranslations } from "next-intl"
import CopyIcon from "../ui/CopyIcon"
import ShareIcon from "../ui/ShareIcon"

interface ResultDisplayProps {
  result: string
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const t = useTranslations("CategoriesSection")
  return (
      <div className="flex flex-col gap-4 w-full max-w-[577px] mt-8">
        <p className="text-start font-bold">
          {t("result")}
        </p>

        <div className="flex items-center gap-4">
          <div className="w-full border rounded-full bg-background p-2">
            <p className="text-foreground font-semibold">
              {result}
            </p>
          </div>
          {/* Share and Copy */}
          <button 
            className="group flex items-center justify-center p-2 bg-secondary-background rounded-full  hover:bg-[#39414d] hover:text-white transition-colors"
          >
            <ShareIcon className="w-6 h-6" />
          </button>
          <button 
            className="flex items-center justify-center p-2 bg-secondary-background rounded-full w-10 h-10 hover:bg-[#39414d] hover:text-white transition-colors"
          >
            <CopyIcon className="w-6 h-6" />
          </button>
        </div>
      </div>  
  )
}

export default ResultDisplay

import { useTranslations } from "next-intl"
import CopyIcon from "../ui/CopyIcon"
import ShareIcon from "../ui/ShareIcon"
import { copyToClipBoard } from "@/lib/utils/clipboard"
import { useShare } from "@/hooks/useShare"
import { useToast } from "@/hooks/useToast"
import Toast from "../ui/Toast"

interface ResultDisplayProps {
  result: string
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const t = useTranslations("CategoriesSection")
  const { share, canShare } = useShare()
  const { toasts, showToast, hideToast } = useToast()

  // Get title from parent CalculatorShell via DOM
  const getCalculatorTitle = () => {
    if (typeof document !== "undefined") {
      const shell = document.querySelector("[data-calculator-title]")
      return shell?.getAttribute("data-calculator-title") || t("calculatorResult")
    }
    return t("calculatorResult")
  }

  const handleCopy = async () => {
    const success = await copyToClipBoard(result)
    if (success) {
      showToast(t("copiedToClipboard"), "success")
    } else {
      showToast(t("copyFailed"), "error")
    }
  }

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    const shareData = {
      title: getCalculatorTitle(),
      text: `${t("result")}: ${result}`,
      url: url,
    }

    if (canShare) {
      const shared = await share(shareData)
      if (shared) {
      }
    } else {
      //‌ Fallback: copy link to clipboard
      const success = await copyToClipBoard(url)
      if (success) {
      } else {
        showToast(t("shareFailed"), "error")
      }
    }
  }

  return (
    <>
      <div className="mt-8 flex w-full max-w-[577px] flex-col gap-4">
        <p className="text-start font-bold">{t("result")}</p>

        <div className="flex items-center gap-4">
          <div className="bg-background h-11 w-full rounded-full border p-2">
            <p className="text-foreground font-semibold">{result}</p>
          </div>
          {/* Share Button */}
          <button
            className="group bg-secondary-background flex items-center justify-center rounded-full p-2 transition-colors hover:bg-[#39414d] hover:text-white"
            onClick={handleShare}
            aria-label={t("shareResult")}
          >
            <ShareIcon className="h-6 w-6" />
          </button>

          {/* Copy Button */}
          <button
            className="bg-secondary-background flex h-10 w-10 items-center justify-center rounded-full p-2 transition-colors hover:bg-[#39414d] hover:text-white"
            onClick={handleCopy}
            aria-label={t("copyResult")}
          >
            <CopyIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed right-0 bottom-0 z-50 space-y-2 p-4">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </div>
    </>
  )
}

export default ResultDisplay

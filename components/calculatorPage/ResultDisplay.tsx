import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import CopyIcon from "../ui/CopyIcon"
import CheckIcon from "../ui/CheckIcon"
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
  const [copied, setCopied] = useState(false)

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
      setCopied(true)
      showToast(t("copiedToClipboard"), "success")
      setTimeout(() => setCopied(false), 1500) // revert icon after 1.5s
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
      await share(shareData)
    } else {
      const success = await copyToClipBoard(url)
      if (!success) showToast(t("shareFailed"), "error")
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

          {/* Copy Button with animation */}
          <button
            className="bg-secondary-background flex h-10 w-10 items-center justify-center rounded-full p-2 transition-colors hover:bg-[#39414d] hover:text-white"
            onClick={handleCopy}
            aria-label={t("copyResult")}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <CheckIcon className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <CopyIcon className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
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

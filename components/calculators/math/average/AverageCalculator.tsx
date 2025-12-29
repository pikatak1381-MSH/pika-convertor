"use client"

import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion"
import { useState, useMemo } from "react"
import {
  averageCalculators,
  calculateMean,
  calculateMedian,
  calculateMode,
  parseNumbers,
} from "./average.data"
import { AverageMode } from "./average.types"
import ResultDisplay from "@/components/calculatorPage/ResultDisplay"
import Formula from "@/components/calculatorPage/Formula"
import { useTranslations, useLocale } from "next-intl"
import FloatingLabelInput from "@/components/ui/FloatingLabelInput"

const tabVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.25, ease: easeOut },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: easeIn },
  },
}

const AverageCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  const [activeId, setActiveId] = useState<AverageMode>(averageCalculators[0].id)
  const [inputValue, setInputValue] = useState<string>("")

  const calculator = useMemo(() => averageCalculators.find((c) => c.id === activeId)!, [activeId])

  const numbers = useMemo(() => parseNumbers(inputValue), [inputValue])

  const result = useMemo(() => {
    if (numbers.length === 0) return ""

    switch (activeId) {
      case "mean": {
        const mean = calculateMean(numbers)
        return isNaN(mean) ? "" : mean.toLocaleString(undefined, { maximumFractionDigits: 6 })
      }
      case "median": {
        const median = calculateMedian(numbers)
        return isNaN(median) ? "" : median.toLocaleString(undefined, { maximumFractionDigits: 6 })
      }
      case "mode": {
        const modes = calculateMode(numbers)
        if (modes.length === 0) return t("math.average.noMode")
        return modes.join(", ")
      }
      default:
        return ""
    }
  }, [numbers, activeId, t])

  return (
    <div className="mt-4">
      {/* Tabs */}
      <div className="bg-background flex w-fit rounded-[20px] border p-1">
        {averageCalculators.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`text-foreground w-28 rounded-[20px] border border-transparent px-2 py-2 text-sm font-bold transition hover:border-black ${
              activeId === c.id ? "bg-secondary-background hover:border-transparent" : ""
            }`}
          >
            {t(c.labelKey)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          custom={dir}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mt-4 flex flex-col gap-4"
        >
          {/* Input */}
          <FloatingLabelInput
            type="text"
            label={t("math.average.placeholder")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          {/* Numbers count */}
          {numbers.length > 0 && (
            <p className="text-muted-foreground text-sm">
              {t("math.average.count", { count: numbers.length })}
            </p>
          )}

          {/* Result */}
          <ResultDisplay result={result} />

          {/* Formula */}
          <Formula formula={calculator.formula} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default AverageCalculator

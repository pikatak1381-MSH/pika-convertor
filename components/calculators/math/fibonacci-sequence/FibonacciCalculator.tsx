"use client"

import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion"
import { useState, useMemo } from "react"
import {
  fibonacciCalculators,
  generateSequence,
  getNthFibonacci,
  isFibonacci,
  getFibonacciPosition,
} from "./fibonacci.data"
import { FibonacciMode } from "./fibonacci.types"
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

const FibonacciCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  const [activeId, setActiveId] = useState<FibonacciMode>(fibonacciCalculators[0].id)
  const [inputValue, setInputValue] = useState<string>("")

  const calculator = useMemo(() => fibonacciCalculators.find((c) => c.id === activeId)!, [activeId])

  const result = useMemo(() => {
    const num = parseInt(inputValue, 10)
    if (isNaN(num) || inputValue.trim() === "") return ""

    switch (activeId) {
      case "sequence": {
        if (num <= 0 || num > 50) return t("math.fibonacci.invalidCount")
        const sequence = generateSequence(num)
        return sequence.join(", ")
      }
      case "nthNumber": {
        if (num < 0 || num > 70) return t("math.fibonacci.invalidPosition")
        const fibNum = getNthFibonacci(num)
        return t("math.fibonacci.nthResult", { position: num, value: fibNum })
      }
      case "checkFibonacci": {
        if (num < 0) return t("math.fibonacci.invalidNumber")
        const isFib = isFibonacci(num)
        if (isFib) {
          const position = getFibonacciPosition(num) ?? 0
          return t("math.fibonacci.isFibonacci", { number: num, position })
        }
        return t("math.fibonacci.isNotFibonacci", { number: num })
      }
      default:
        return ""
    }
  }, [inputValue, activeId, t])

  return (
    <div className="mt-4">
      {/* Tabs */}
      <div className="bg-background flex w-fit rounded-[20px] border p-1">
        {fibonacciCalculators.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setActiveId(c.id)
              setInputValue("")
            }}
            className={`text-foreground w-36 rounded-[20px] border border-transparent px-2 py-2 text-sm font-bold transition hover:border-black ${
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
            type="number"
            label={t(calculator.inputLabelKey)}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          {/* Result */}
          <ResultDisplay result={result} />

          {/* Formula */}
          <Formula formula={calculator.formula} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default FibonacciCalculator

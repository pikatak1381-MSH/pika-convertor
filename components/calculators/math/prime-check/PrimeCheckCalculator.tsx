"use client"

import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion"
import { useState, useMemo } from "react"
import { checkPrime } from "./primeCheck.data"
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

const PrimeCheckCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  const [inputValue, setInputValue] = useState<string>("")

  const result = useMemo(() => {
    const num = parseInt(inputValue, 10)
    if (isNaN(num) || inputValue.trim() === "") return null
    return checkPrime(num)
  }, [inputValue])

  const resultText = useMemo(() => {
    if (!result) return ""
    if (result.isPrime) {
      return t("math.primeCheck.isPrime", { number: result.number })
    }
    const factorsStr = result.factors?.join(" × ") || ""
    return t("math.primeCheck.isNotPrime", {
      number: result.number,
      factors: factorsStr,
    })
  }, [result, t])

  return (
    <div className="mt-4 flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          custom={dir}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mt-4 flex flex-col gap-4"
        >
          {/* Input */}
          <div className="flex flex-col gap-2">
            <FloatingLabelInput
              type="number"
              label={t("math.primeCheck.enterNumber")}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          {/* Result */}
          <ResultDisplay result={resultText} />

          {/* Formula */}
          <Formula formula="n = p_1^{a_1} \times p_2^{a_2} \times \cdots \times p_k^{a_k}" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PrimeCheckCalculator

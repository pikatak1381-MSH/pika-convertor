"use client"

import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion"
import { useState, useMemo } from "react"
import {
  factorialCalculators,
  factorial,
  doubleFactorial,
  permutation,
  combination,
} from "./factorial.data"
import { FactorialMode } from "./factorial.types"
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

const FactorialCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  const [activeId, setActiveId] = useState<FactorialMode>(factorialCalculators[0].id)
  const [values, setValues] = useState<number[]>([])

  const calculator = useMemo(() => factorialCalculators.find((c) => c.id === activeId)!, [activeId])

  const result = useMemo(() => {
    if (values.length !== calculator.inputs.length) return ""
    if (values.some((v) => isNaN(v))) return ""

    const [n, r] = values

    // Validate input ranges
    if (n < 0 || n > 170) return t("math.factorial.invalidN")
    if (activeId === "permutation" || activeId === "combination") {
      if (r < 0 || r > n) return t("math.factorial.invalidR")
    }

    let calcResult: number

    switch (activeId) {
      case "factorial":
        calcResult = factorial(n)
        break
      case "doubleFactorial":
        calcResult = doubleFactorial(n)
        break
      case "permutation":
        calcResult = permutation(n, r)
        break
      case "combination":
        calcResult = combination(n, r)
        break
      default:
        return ""
    }

    if (isNaN(calcResult) || !isFinite(calcResult)) {
      return t("math.factorial.overflow")
    }

    return calcResult.toLocaleString()
  }, [values, calculator, activeId, t])

  const updateValue = (index: number, value: number) => {
    setValues((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  return (
    <div className="mt-4">
      {/* Tabs */}
      <div className="bg-background flex w-fit flex-wrap rounded-[20px] border p-1">
        {factorialCalculators.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setActiveId(c.id)
              setValues([])
            }}
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
          {/* Inputs */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {calculator.inputs.map((inputKey, index) => (
              <FloatingLabelInput
                key={inputKey}
                type="number"
                label={t(`math.factorial.inputs.${inputKey}`)}
                value={values[index] ?? ""}
                onChange={(e) => updateValue(index, Number(e.target.value))}
              />
            ))}
          </div>

          {/* Result */}
          <ResultDisplay result={result} />

          {/* Formula */}
          <Formula formula={calculator.formula} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default FactorialCalculator

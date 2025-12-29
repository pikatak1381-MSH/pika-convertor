"use client"

import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion"
import { useState, useMemo } from "react"
import { percentageIncreaseCalculators } from "./percentageIncrease.data"
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

const PercentageIncreaseCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  type CalculatorId = (typeof percentageIncreaseCalculators)[number]["id"]

  const [activeId, setActiveId] = useState<CalculatorId>(percentageIncreaseCalculators[0].id)
  const [values, setValues] = useState<number[]>([])

  const calculator = useMemo(
    () => percentageIncreaseCalculators.find((c) => c.id === activeId)!,
    [activeId]
  )

  const result = useMemo(() => {
    if (values.length !== calculator.inputs.length) return ""
    const calcResult = calculator.calculate(values)
    if (typeof calcResult === "string") return calcResult
    return calcResult
  }, [values, calculator])

  const formatResult = (result: number | string): string => {
    if (result === "") return ""
    if (typeof result === "string") return t(`math.percentageIncrease.${result}`)
    if (activeId === "percentageChange") {
      return `${result.toFixed(2)}%`
    }
    return result.toFixed(2)
  }

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
      <div className="bg-background flex w-fit rounded-[20px] border p-1">
        {percentageIncreaseCalculators.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setActiveId(c.id)
              setValues([])
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
          {/* Inputs */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {calculator.inputs.map((inputKey, index) => (
              <FloatingLabelInput
                key={inputKey}
                type="number"
                label={t(`math.percentageIncrease.inputs.${inputKey}`)}
                value={values[index] ?? ""}
                onChange={(e) => updateValue(index, Number(e.target.value))}
              />
            ))}
          </div>

          {/* Result */}
          <ResultDisplay result={formatResult(result)} />

          {/* Formula */}
          <Formula formula={calculator.formula} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PercentageIncreaseCalculator

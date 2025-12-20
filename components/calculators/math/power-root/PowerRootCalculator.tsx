"use client"

import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion"
import { useState, useMemo } from "react"
import { powerRootCalculators } from "./powerRoot.data"
import ResultDisplay from "@/components/calculatorPage/ResultDisplay"
import Formula from "@/components/calculatorPage/Formula"
import { useTranslations, useLocale } from "next-intl"

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

const PowerRootCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  type PercentageId = (typeof powerRootCalculators)[number]["id"]

  const [activeId, setActiveId] = useState<PercentageId>(powerRootCalculators[0].id)
  const [values, setValues] = useState<number[]>([])

  const calculator = useMemo(() => powerRootCalculators.find((c) => c.id === activeId)!, [activeId])

  const result = useMemo(() => {
    if (values.length !== calculator.inputs.length) return ""
    return calculator.calculate(values)
  }, [values, calculator])

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
        {powerRootCalculators.map((c) => (
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
              <input
                key={inputKey}
                type="number"
                placeholder={t(`math.powerRoot.inputs.${inputKey}`)}
                value={values[index] ?? ""}
                onChange={(e) => updateValue(index, Number(e.target.value))}
                className="bg-background border-input placeholder:text-input-secondary-placeholder rounded-full border px-3 py-2 placeholder:text-sm placeholder:font-bold"
              />
            ))}
          </div>

          {/* Result */}
          <ResultDisplay result={String(result)} />

          {/* Formula */}
          <Formula formula={calculator.formula} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PowerRootCalculator

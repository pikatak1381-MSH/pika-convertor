"use client"

import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion"
import { useState, useMemo } from "react"
import { converters, fractionToDecimal, decimalToFraction } from "./fractionsToDecimals.data"
import { ConversionMode } from "./fractionsToDecimals.types"
import ResultDisplay from "@/components/calculatorPage/ResultDisplay"
import Formula from "@/components/calculatorPage/Formula"
import FloatingLabelInput from "@/components/ui/FloatingLabelInput"
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

const FractionsToDecimalsCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  const [activeId, setActiveId] = useState<ConversionMode>(converters[0].id)
  const [values, setValues] = useState<Record<string, string>>({})

  const converter = useMemo(() => converters.find((c) => c.id === activeId)!, [activeId])

  const result = useMemo(() => {
    if (activeId === "fractionToDecimal") {
      const numerator = parseFloat(values.numerator || "")
      const denominator = parseFloat(values.denominator || "")
      if (isNaN(numerator) || isNaN(denominator)) return ""
      const res = fractionToDecimal(numerator, denominator)
      if (typeof res === "string") return t(`math.fractionConverter.${res}`)
      return res.toLocaleString(undefined, { maximumFractionDigits: 10 })
    } else {
      const decimal = parseFloat(values.decimal || "")
      if (isNaN(decimal)) return ""
      const res = decimalToFraction(decimal)
      return res.display
    }
  }, [values, activeId, t])

  const updateValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="mt-4">
      {/* Tabs */}
      <div className="bg-background flex w-fit rounded-[20px] border p-1">
        {converters.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setActiveId(c.id)
              setValues({})
            }}
            className={`text-foreground w-40 rounded-[20px] border border-transparent px-2 py-2 text-sm font-bold transition hover:border-black ${
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
            {converter.inputs.map((inputKey) => (
              <FloatingLabelInput
                key={inputKey}
                type="number"
                label={t(`math.fractionConverter.inputs.${inputKey}`)}
                value={values[inputKey] || ""}
                onChange={(e) => updateValue(inputKey, e.target.value)}
              />
            ))}
          </div>

          {/* Result */}
          <ResultDisplay result={result} />

          {/* Formula */}
          <Formula formula={converter.formula} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default FractionsToDecimalsCalculator

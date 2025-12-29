"use client"

import { motion, AnimatePresence, easeOut } from "framer-motion"
import { useState, useMemo } from "react"
import { calculateTrig, trigFormula } from "./trigonometry.data"
import { AngleUnit } from "./trigonometry.types"
import Formula from "@/components/calculatorPage/Formula"
import FloatingLabelInput from "@/components/ui/FloatingLabelInput"
import RadioGroup from "@/components/ui/RadioGroup"
import { useTranslations } from "next-intl"

const contentVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.25, ease: easeOut },
  },
}

const TrigonometryCalculator = () => {
  const t = useTranslations("Calculators")

  const [inputValue, setInputValue] = useState<string>("")
  const [angleUnit, setAngleUnit] = useState<AngleUnit>("degree")

  const results = useMemo(() => {
    const value = parseFloat(inputValue)
    if (isNaN(value)) return null
    return calculateTrig(value, angleUnit)
  }, [inputValue, angleUnit])

  const resultItems = useMemo(() => {
    if (!results) return []

    const items = [
      { key: "sin", value: results.sin },
      { key: "cos", value: results.cos },
      { key: "tan", value: results.tan },
      { key: "cot", value: results.cot },
      { key: "arcsin", value: results.arcsin },
      { key: "arccos", value: results.arccos },
      { key: "arctan", value: results.arctan },
      { key: "arccot", value: results.arccot },
      {
        key: angleUnit === "degree" ? "radian" : "degree",
        value: results.conversion,
      },
    ]
    return items
  }, [results, angleUnit])

  const formatValue = (value: number | string): string => {
    if (value === "undefined") return t("math.trigonometry.undefined")
    if (typeof value === "number") {
      return value.toLocaleString(undefined, { maximumFractionDigits: 5 })
    }
    return String(value)
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Input */}
      <FloatingLabelInput
        type="number"
        label={t("math.trigonometry.inputPlaceholder")}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* Radio Buttons */}
      <RadioGroup
        name="angleUnit"
        value={angleUnit}
        onChange={setAngleUnit}
        options={[
          { value: "degree", label: t("math.trigonometry.degree") },
          { value: "radian", label: t("math.trigonometry.radian") },
        ]}
      />

      {/* Results Grid */}
      <AnimatePresence mode="wait">
        {results && (
          <motion.div
            key={`${inputValue}-${angleUnit}`}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="mt-4"
          >
            <p className="text-secondary-foreground mb-2 text-start font-bold">
              {t("math.trigonometry.results")}
            </p>
            <div className="bg-secondary-background/30 rounded-2xl border p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {resultItems.map((item) => (
                  <div
                    key={item.key}
                    className="flex flex-nowrap items-center text-start font-semibold"
                  >
                    <span className="text-foreground text-nowrap">
                      {t(`math.trigonometry.${item.key}`)} ={" "}
                    </span>
                    <span className="text-results-foreground" dir="ltr">
                      {formatValue(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Formula */}
      <Formula formula={trigFormula} />
    </div>
  )
}

export default TrigonometryCalculator

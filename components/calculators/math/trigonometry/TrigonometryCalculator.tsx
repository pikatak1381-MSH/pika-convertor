"use client"

import { motion, AnimatePresence, easeOut } from "framer-motion"
import { useState, useMemo } from "react"
import { calculateTrig, trigFormula } from "./trigonometry.data"
import { AngleUnit } from "./trigonometry.types"
import Formula from "@/components/calculatorPage/Formula"
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
      return value.toLocaleString(undefined, { maximumFractionDigits: 10 })
    }
    return String(value)
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Input */}
      <input
        type="number"
        placeholder={t("math.trigonometry.inputPlaceholder")}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-background border-input placeholder:text-input-secondary-placeholder w-full rounded-full border px-3 py-2 placeholder:text-sm placeholder:font-bold"
      />

      {/* Radio Buttons */}
      <div className="flex gap-6">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="angleUnit"
            value="degree"
            checked={angleUnit === "degree"}
            onChange={() => setAngleUnit("degree")}
            className="peer sr-only"
          />
          <span className="peer-checked:border-primary peer-focus:ring-primary border-primary relative flex h-4 w-4 items-center justify-center rounded-full border-2 peer-focus:ring-2">
            <span className="bg-primary h-2 w-2 scale-0 rounded-full transition-transform peer-checked:scale-100"></span>
          </span>
          <span className="text-sm font-medium">{t("math.trigonometry.degree")}</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="angleUnit"
            value="radian"
            checked={angleUnit === "radian"}
            onChange={() => setAngleUnit("radian")}
            className="accent-primary h-4 w-4"
          />
          <span className="text-sm font-medium">{t("math.trigonometry.radian")}</span>
        </label>
      </div>

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
            <div className="bg-secondary-background/30 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {resultItems.map((item) => (
                  <div key={item.key} className="text-start font-semibold">
                    <span className="text-foreground">{t(`math.trigonometry.${item.key}`)} = </span>
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

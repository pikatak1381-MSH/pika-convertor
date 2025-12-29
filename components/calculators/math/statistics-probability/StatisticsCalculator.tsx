"use client"

import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion"
import { useState, useMemo } from "react"
import { DataPoint, SampleType, StatisticsResult } from "./statistics.types"
import { calculateAllStatistics, formatNumber, varianceFormula } from "./statistics.data"
import Formula from "@/components/calculatorPage/Formula"
import { useTranslations, useLocale } from "next-intl"
import { Plus, X } from "lucide-react"
import RadioGroup from "@/components/ui/RadioGroup"
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

const StatisticsCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  const [dataValue, setDataValue] = useState<string>("")
  const [weightValue, setWeightValue] = useState<string>("")
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([])
  const [sampleType, setSampleType] = useState<SampleType>("population")
  const [result, setResult] = useState<StatisticsResult | null>(null)

  const handleAddDataPoint = () => {
    const data = parseFloat(dataValue)
    const weight = parseFloat(weightValue) || 1

    if (isNaN(data)) return

    setDataPoints((prev) => [...prev, { data, weight }])
    setDataValue("")
    setWeightValue("1")
  }

  const handleRemoveDataPoint = (index: number) => {
    setDataPoints((prev) => prev.filter((_, i) => i !== index))
    setResult(null)
  }

  const handleCalculate = () => {
    if (dataPoints.length === 0) return
    const stats = calculateAllStatistics(dataPoints, sampleType)
    setResult(stats)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddDataPoint()
      setWeightValue("")
      setDataValue("")
    }
  }

  const resultItems = useMemo(() => {
    if (!result) return []
    return [
      { labelKey: "math.statistics.variance", value: formatNumber(result.variance) },
      {
        labelKey: "math.statistics.standardDeviation",
        value: formatNumber(result.standardDeviation),
      },
      { labelKey: "math.statistics.arithmeticMean", value: formatNumber(result.arithmeticMean) },
      { labelKey: "math.statistics.geometricMean", value: formatNumber(result.geometricMean) },
      { labelKey: "math.statistics.harmonicMean", value: formatNumber(result.harmonicMean) },
      { labelKey: "math.statistics.weightedMean", value: formatNumber(result.weightedMean) },
      { labelKey: "math.statistics.range", value: formatNumber(result.range) },
      { labelKey: "math.statistics.count", value: result.count.toString() },
      { labelKey: "math.statistics.sum", value: formatNumber(result.sum) },
      { labelKey: "math.statistics.min", value: formatNumber(result.min) },
      { labelKey: "math.statistics.max", value: formatNumber(result.max) },
    ]
  }, [result])

  return (
    <div className="mt-4">
      <AnimatePresence mode="wait">
        <motion.div
          custom={dir}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col gap-4"
        >
          {/* Input Row */}
          <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
            <FloatingLabelInput
              type="number"
              label={t("math.statistics.data")}
              value={dataValue}
              onChange={(e) => setDataValue(e.target.value)}
            />
            <FloatingLabelInput
              type="number"
              label={t("math.statistics.weight")}
              value={weightValue}
              onChange={(e) => setWeightValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleAddDataPoint}
              className="bg-secondary-background hover:bg-secondary-background/80 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              title={t("math.statistics.addData")}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Sample Type Radio Buttons */}
          <RadioGroup
            name="sampleType"
            value={sampleType}
            onChange={setSampleType}
            options={[
              { value: "population", label: t("math.statistics.sample") },
              { value: "sample", label: t("math.statistics.population") },
            ]}
          />

          {/* Data Points Chips */}
          {dataPoints.length > 0 && (
            <div className="flex flex-wrap items-center justify-start gap-2">
              {dataPoints.map((dp, index) => (
                <div
                  key={index}
                  className="bg-background flex w-full max-w-[238px] min-w-[140px] items-center justify-between gap-2 rounded-[20px] border px-4 py-2 font-semibold"
                >
                  <span>
                    W={dp.weight}, D={dp.data}
                  </span>
                  <button
                    onClick={() => handleRemoveDataPoint(index)}
                    className="text-secondary-foreground hover:text-foreground border-primary rounded-full border p-1 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Calculate Button */}
          <div className="mb-4 flex justify-start">
            <button
              onClick={handleCalculate}
              disabled={dataPoints.length === 0}
              className="bg-secondary-foreground text-secondary-background hover:bg-secondary-foreground/90 disabled:bg-muted disabled:text-muted-foreground rounded-full px-6 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed"
            >
              {t("math.statistics.calculate")}
            </button>
          </div>

          {/* Results */}
          {result && (
            <>
              <p className="text-start font-bold">{t("math.statistics.result")}</p>
              <div className="bg-secondary-background/30 rounded-2xl p-4">
                <div className="mb-4 flex items-center gap-2"></div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {resultItems.map((item) => (
                    <div key={item.labelKey} className="text-start font-semibold">
                      <span className="text-foreground">{t(item.labelKey)}= </span>
                      <span className="text-results-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Formula */}
          <Formula
            formula={
              sampleType === "population" ? varianceFormula.population : varianceFormula.sample
            }
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default StatisticsCalculator

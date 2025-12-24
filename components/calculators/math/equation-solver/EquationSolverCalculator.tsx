"use client"

import CalculatorInput from "@/components/ui/CalculatorInput"
import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion"
import { useState, useMemo } from "react"
import { equationSolvers } from "./equationSolver.data"
import ResultDisplay from "@/components/calculatorPage/ResultDisplay"
import Formula from "@/components/calculatorPage/Formula"
import { useTranslations, useLocale } from "next-intl"
import MathXIcon from "@/components/ui/MathXIcon"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

const operatorVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: easeOut },
  },
}

const EquationSolverCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  type EquationId = (typeof equationSolvers)[number]["id"]

  const [activeId, setActiveId] = useState<EquationId>(equationSolvers[0].id)
  const [values, setValues] = useState<Record<number, number>>({})

  const calculator = useMemo(() => equationSolvers.find((c) => c.id === activeId)!, [activeId])

  // Convert record to array for calculation
  const valuesArray = useMemo(() => {
    return Array.from({ length: calculator.inputs.length }, (_, i) => values[i] ?? NaN)
  }, [values, calculator.inputs.length])

  const result = useMemo(() => {
    // Check if all values are filled
    if (valuesArray.some((v) => isNaN(v))) return null
    return calculator.calculate(valuesArray)
  }, [valuesArray, calculator])

  const updateValue = (index: number, value: number) => {
    setValues((prev) => ({
      ...prev,
      [index]: value,
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatResult = (res: any) => {
    if (res === null) return ""
    if (typeof res === "number") return res.toFixed(4)
    if (Array.isArray(res)) {
      // Filter out NaN values and format
      const validRoots = res.filter((r) => !isNaN(r))
      if (validRoots.length === 0) return t("math.equationSolver.noRealSolutions")

      if (validRoots.length === 1) {
        return `x = ${validRoots[0].toFixed(4)}`
      }
      if (validRoots.length === 2) {
        return `x₁ = ${validRoots[0].toFixed(4)}, x₂ = ${validRoots[1].toFixed(4)}`
      }
      if (validRoots.length === 3) {
        return `x₁ = ${validRoots[0].toFixed(4)}, x₂ = ${validRoots[1].toFixed(4)}, x₃ = ${validRoots[2].toFixed(4)}`
      }
    }
    if (typeof res === "object" && "x" in res && "y" in res) {
      if (isNaN(res.x) || isNaN(res.y)) {
        return t("math.equationSolver.noSolution")
      }
      return `x = ${res.x.toFixed(4)}, y = ${res.y.toFixed(4)}`
    }
    return String(res)
  }

  const renderSeparator = (index: number) => {
    if (calculator.id === "linear-one") {
      if (index === 0) {
        return (
          <motion.span
            variants={operatorVariants}
            initial="initial"
            animate="animate"
            className="flex items-center gap-1 px-1 text-4xl font-bold whitespace-nowrap"
          >
            <MathXIcon className="h-4.5 w-7.5" />+
          </motion.span>
        )
      }

      if (index === 1) {
        return (
          <motion.span
            variants={operatorVariants}
            initial="initial"
            animate="animate"
            className="px-1 text-4xl font-bold whitespace-nowrap"
          >
            =
          </motion.span>
        )
      }
    }

    if (calculator.id === "quadratic") {
      if (index === 0) {
        return (
          <motion.span
            variants={operatorVariants}
            initial="initial"
            animate="animate"
            className="px-1 text-4xl font-bold"
          >
            x²
          </motion.span>
        )
      }

      if (index === 1) {
        return (
          <motion.span
            variants={operatorVariants}
            initial="initial"
            animate="animate"
            className="px-1 text-4xl font-bold"
          >
            x +
          </motion.span>
        )
      }

      if (index === 2) {
        return (
          <motion.span
            variants={operatorVariants}
            initial="initial"
            animate="animate"
            className="px-1 text-4xl font-bold"
          >
            = 0
          </motion.span>
        )
      }
    }

    if (calculator.id === "cubic") {
      if (index === 0) {
        return (
          <motion.span
            variants={operatorVariants}
            initial="initial"
            animate="animate"
            className="px-1 text-4xl font-bold"
          >
            x³ +
          </motion.span>
        )
      }

      if (index === 1) {
        return (
          <motion.span
            variants={operatorVariants}
            initial="initial"
            animate="animate"
            className="px-1 text-4xl font-bold"
          >
            x² +
          </motion.span>
        )
      }

      if (index === 2) {
        return (
          <motion.span
            variants={operatorVariants}
            initial="initial"
            animate="animate"
            className="px-1 text-4xl font-bold"
          >
            x +
          </motion.span>
        )
      }

      if (index === 3) {
        return (
          <motion.span
            variants={operatorVariants}
            initial="initial"
            animate="animate"
            className="px-1 text-4xl font-bold"
          >
            = 0
          </motion.span>
        )
      }
    }
  }

  const renderLinearTwoSeparator = (offset: number) => {
    if (offset === 0) {
      return (
        <motion.span
          variants={operatorVariants}
          initial="initial"
          animate="animate"
          className="flex items-center gap-1 px-1 text-4xl font-bold"
        >
          <MathXIcon className="h-4.5 w-7.5" />+
        </motion.span>
      )
    }

    if (offset === 1) {
      return (
        <motion.span
          variants={operatorVariants}
          initial="initial"
          animate="animate"
          className="px-1 text-4xl font-bold"
        >
          =
        </motion.span>
      )
    }

    return null
  }

  const renderLinearRow = (startIndex: number, rowKey: string) => (
    <div key={rowKey} dir="ltr" className="flex items-center justify-center gap-1">
      {[0, 1, 2].map((offset) => {
        const index = startIndex + offset

        return (
          <div key={index} className="flex items-center">
            <CalculatorInput value={values[index] ?? NaN} onChange={(val) => updateValue(index, val)} />

            {renderLinearTwoSeparator(offset)}
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="mt-4">
      <Select
        dir={dir}
        value={activeId}
        onValueChange={(value: EquationId) => {
          setActiveId(value)
          setValues({})
        }}
      >
        <SelectTrigger className="bg-background border-input text-secondary-foreground w-full min-w-0 flex-1 truncate rounded-full border px-3 py-2 text-sm font-bold">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-background text-secondary-foreground rounded-2xl text-sm font-semibold">
          {equationSolvers.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {t(c.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
          <div className="bg-background mx-auto flex w-full flex-col gap-2 rounded-[20px] border py-4.5">
            {calculator.id === "linear-two" ? (
              <>
                {renderLinearRow(0, "row-1")}
                {renderLinearRow(3, "row-2")}
              </>
            ) : (
              <div dir="ltr" className="flex items-center justify-center gap-1">
                {calculator.inputs.map((inputKey, index) => (
                  <div key={inputKey} className="flex items-center">
                    <CalculatorInput value={values[index] ?? NaN} onChange={(val) => updateValue(index, val)} />

                    {renderSeparator(index)}
                  </div>
                ))}
              </div>
            )}
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

export default EquationSolverCalculator

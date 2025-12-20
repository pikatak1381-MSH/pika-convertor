"use client"

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

const EquationSolverCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  type EquationId = (typeof equationSolvers)[number]["id"]

  const [activeId, setActiveId] = useState<EquationId>(equationSolvers[0].id)
  const [values, setValues] = useState<number[]>([])

  const calculator = useMemo(() => equationSolvers.find((c) => c.id === activeId)!, [activeId])

  const result = useMemo(() => {
    if (values.length !== calculator.inputs.length) return null
    if (values.some((v) => isNaN(v))) return null
    return calculator.calculate(values)
  }, [values, calculator])

  const updateValue = (index: number, value: number) => {
    setValues((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatResult = (res: any) => {
    if (res === null) return ""
    if (typeof res === "number") return res.toFixed(4)
    if (Array.isArray(res)) {
      return `x₁ = ${res[0].toFixed(4)}, x₂ = ${res[1].toFixed(4)}`
    }
    if (typeof res === "object" && "x" in res && "y" in res) {
      return `x = ${res.x.toFixed(4)}, y = ${res.y.toFixed(4)}`
    }
    return String(res)
  }

  return (
    <div className="mt-4">
      <Select
        dir={dir}
        value={activeId}
        onValueChange={(value: EquationId) => {
          setActiveId(value)
          setValues([])
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
          <div className="bg-background mx-auto flex w-full items-center justify-center gap-1 rounded-[20px] border py-4.5">
            {calculator.inputs.map((inputKey, index) => (
              <>
                <input
                  key={inputKey}
                  type="number"
                  value={values[index] ?? ""}
                  onChange={(e) => updateValue(index, Number(e.target.value))}
                  className="bg-input-background border-secondary-foreground placeholder:text-input-secondary-placeholder h-13 w-13 rounded-[20px] border placeholder:text-sm placeholder:font-bold"
                />
                {index > 0 && index < 2 && <MathXIcon className="h-6 w-6" />}
              </>
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

export default EquationSolverCalculator

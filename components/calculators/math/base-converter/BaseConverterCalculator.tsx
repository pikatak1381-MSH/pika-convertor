"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion"
import { useState, useMemo } from "react"
import { baseOptions, convertBase } from "./baseConverter.data"
import { BaseSystem } from "./baseConverter.types"
import ResultDisplay from "@/components/calculatorPage/ResultDisplay"
import { useTranslations, useLocale } from "next-intl"
// import Formula from "@/components/calculatorPage/Formula"

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

const BaseConverterCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  const [fromBase, setFromBase] = useState(baseOptions[0].value)
  const [toBase, setToBase] = useState(baseOptions[1].value)
  const [inputValue, setInputValue] = useState<string>("")

  const result = useMemo(() => {
    if (!inputValue || inputValue.trim() === "") return ""

    return convertBase(inputValue, fromBase, toBase)
  }, [inputValue, fromBase, toBase])

  return (
    <div className="mt-4 flex flex-col">
      {/* Base Selectors */}
      <div className="flex items-center gap-2">
        {/* From Base */}
        <Select
          dir={dir}
          value={fromBase.toString()}
          onValueChange={(value) => setFromBase(parseInt(value) as BaseSystem)}
        >
          <SelectTrigger className="bg-background border-input text-secondary-foreground w-full min-w-0 flex-1 truncate rounded-full border px-3 py-2 text-sm font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background text-secondary-foreground rounded-2xl text-sm font-semibold">
            {baseOptions.map((base) => (
              <SelectItem key={base.id} value={base.value.toString()}>
                {t(base.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* To Base */}
        <Select
          dir={dir}
          value={toBase.toString()}
          onValueChange={(value) => setToBase(parseInt(value) as BaseSystem)}
        >
          <SelectTrigger className="bg-background border-input text-secondary-foreground w-full min-w-0 flex-1 truncate rounded-full border px-3 py-2 text-sm font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background text-secondary-foreground rounded-2xl text-sm font-semibold">
            {baseOptions.map((base) => (
              <SelectItem key={base.id} value={base.value.toString()}>
                {t(base.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
            <input
              type="text"
              placeholder={`${t("math.baseConverter.enterValue")}`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              className="bg-background border-input placeholder:text-input-secondary-placeholder focus:ring- rounded-full border px-4 py-3 placeholder:text-sm placeholder:font-bold focus:ring-2 focus:outline-none"
            />
          </div>

          {/* Result */}
          <ResultDisplay result={result || ""} />

          {/* Formula */}
          {/* <Formula formula={String(result)} /> */}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default BaseConverterCalculator

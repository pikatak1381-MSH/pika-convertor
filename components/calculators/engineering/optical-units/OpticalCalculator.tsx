"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { opticalUnitTypes } from "./optical.data"
import { useMemo, useState } from "react"
import { convertValue } from "@/lib/convertValue"
import ResultDisplay from "@/components/calculatorPage/ResultDisplay"
import Formula from "@/components/calculatorPage/Formula"
import SwapIcon from "@/components/ui/SwapIcon"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import FloatingLabelInput from "@/components/ui/FloatingLabelInput"

const OpticalCalculator = () => {
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"
  const t = useTranslations("Calculators")
  const [typeId, setTypeId] = useState(opticalUnitTypes[0].id)
  const [fromUnit, setFromUnit] = useState(opticalUnitTypes[0].units[0].id)
  const [toUnit, setToUnit] = useState(opticalUnitTypes[0].units[1].id)
  const [value, setValue] = useState<number | "">("")

  const converter = useMemo(() => opticalUnitTypes.find((unit) => unit.id === typeId)!, [typeId])

  const result = useMemo(() => {
    if (value === "") return ""
    return convertValue(value, fromUnit, toUnit, converter)
  }, [value, fromUnit, toUnit, converter])

  // Handle swap button
  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  return (
    <div className="mt-4 flex flex-col">
      {/* Converter Type */}
      <Select
        dir={dir}
        value={typeId}
        onValueChange={(newTypeId) => {
          const nextConverter = opticalUnitTypes.find((unit) => unit.id === newTypeId)!
          setTypeId(newTypeId)
          setFromUnit(nextConverter.units[0].id)
          setToUnit(nextConverter.units[1].id)
        }}
      >
        <SelectTrigger className="bg-background border-input text-secondary-foreground w-full min-w-0 flex-1 truncate rounded-full border px-3 py-2 text-sm font-bold">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-background text-secondary-foreground rounded-2xl text-sm font-semibold">
          {opticalUnitTypes.map((unit) => (
            <SelectItem key={unit.id} value={unit.id}>
              {t(unit.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Inputs */}
      <FloatingLabelInput
        type="number"
        value={value}
        label={t("engineering.optical.placeholder")}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-4 max-w-[225px]"
      />
      <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 flex items-center gap-1">
          {/* From Unit */}
          <Select dir={dir} value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger className="bg-background border-input text-secondary-foreground w-full min-w-0 flex-1 truncate rounded-full border px-3 py-2 text-sm font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background text-secondary-foreground rounded-2xl text-sm font-semibold">
              {converter.units.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {t(u.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={handleSwap}
            className="hover:border-secondary-foreground bg-primary text-secondary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-transparent transition-all"
          >
            <SwapIcon />
          </button>

          {/* To Unit */}
          <Select dir={dir} value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger className="bg-background border-input text-secondary-foreground w-full min-w-0 flex-1 truncate rounded-full border px-3 py-2 text-sm font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background text-secondary-foreground rounded-2xl text-sm font-semibold">
              {converter.units.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {t(u.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResultDisplay result={String(result)} />

      <Formula formula="2 + 2 = 4" />
    </div>
  )
}

export default OpticalCalculator

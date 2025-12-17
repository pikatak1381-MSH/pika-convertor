"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { electricityUnitTypes } from "./electricity.data"
import { useMemo, useState } from "react"
import { convertValue } from "@/lib/convertValue"
import ResultDisplay from "@/components/calculatorPage/ResultDisplay"
import Formula from "@/components/calculatorPage/Formula"
import SwapIcon from "@/components/ui/SwapIcon"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"

const CurrentsCalculator = () => {
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"
  const t = useTranslations("Calculators")
  const [typeId, setTypeId] = useState(electricityUnitTypes[0].id)
  const [fromUnit, setFromUnit] = useState(electricityUnitTypes[0].units[0].id)
  const [toUnit, setToUnit] = useState(electricityUnitTypes[0].units[1].id)
  const [value, setValue] = useState(1)

  const converter = useMemo(
    () => electricityUnitTypes.find((unit) => unit.id === typeId)!,
    [typeId]
  )

  const result = useMemo(
    () => convertValue(value, fromUnit, toUnit, converter),
    [value, fromUnit, toUnit, converter]
  )

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
          const nextConverter = electricityUnitTypes.find((unit) => unit.id === newTypeId)!
          setTypeId(newTypeId)
          setFromUnit(nextConverter.units[0].id)
          setToUnit(nextConverter.units[1].id)
        }}
      >
        <SelectTrigger className="bg-background border-input text-secondary-foreground w-full min-w-0 flex-1 truncate rounded-full border px-3 py-2 text-sm font-bold">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-background text-secondary-foreground rounded-2xl text-sm font-semibold">
          {electricityUnitTypes.map((unit) => (
            <SelectItem key={unit.id} value={unit.id}>
              {t(unit.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Inputs */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="bg-background border-input rounded-full border px-3 py-2"
        />

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

export default CurrentsCalculator

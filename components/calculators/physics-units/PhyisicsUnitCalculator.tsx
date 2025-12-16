"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { physicsUnitTypes } from "./physics.data"
import { useMemo, useState } from "react"
import { convertValue } from "@/lib/convertValue"
import ResultDisplay from "@/components/calculatorPage/ResultDisplay"
import Formula from "@/components/calculatorPage/Formula"
import SwapIcon from "@/components/ui/SwapIcon"
import { useTranslations } from "next-intl"

const PhyisicsUnitCalculator = () => {
  const t = useTranslations("Calculators")
  const [typeId, setTypeId] = useState(physicsUnitTypes[0].id)
  const [fromUnit, setFromUnit] = useState(physicsUnitTypes[0].units[0].id)
  const [toUnit, setToUnit] = useState(physicsUnitTypes[0].units[1].id)
  const [value, setValue] = useState(1)

  const converter = useMemo(
    () => physicsUnitTypes.find(unit => unit.id === typeId)!,
    [typeId])

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
    <div className="flex flex-col mt-4">
      {/* Converter Type */}
      <Select
        value={typeId}
        onValueChange={(newTypeId) => {
          const nextConverter = physicsUnitTypes.find(unit => unit.id === newTypeId)!
          setTypeId(newTypeId)
          setFromUnit(nextConverter.units[0].id)
          setToUnit(nextConverter.units[1].id)
        }}
      >
        <SelectTrigger className="w-full rounded-full bg-background border border-input px-3 py-2 truncate flex-1 min-w-0 text-sm font-bold text-secondary-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-background rounded-2xl text-sm font-semibold text-secondary-foreground">
          {physicsUnitTypes.map(unit => (
            <SelectItem key={unit.id} value={unit.id}>
              {t(unit.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <input
          type="number"
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="rounded-full bg-background border border-input px-3 py-2"
        />
        
        <div className="flex items-center col-span-2 gap-1">
          {/* From Unit */}
          <Select
            value={fromUnit}
            onValueChange={setFromUnit}
          >
            <SelectTrigger className="w-full rounded-full bg-background border border-input px-3 py-2 truncate flex-1 min-w-0 text-sm font-bold text-secondary-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background rounded-2xl text-sm font-semibold text-secondary-foreground">
              {converter.units.map(u => (
                <SelectItem key={u.id} value={u.id}>
                  {t(u.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={handleSwap}
            className="flex items-center justify-center w-8 h-8 rounded-full text-[#efc900] hover:bg-primary/50 shrink-0"
          >
            <SwapIcon className="" />
          </button>

          {/* To Unit */}
          <Select
            value={toUnit}
            onValueChange={setToUnit}
          >
            <SelectTrigger className="w-full rounded-full bg-background border border-input px-3 py-2 truncate flex-1 min-w-0 text-sm font-bold text-secondary-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background rounded-2xl text-sm font-semibold text-secondary-foreground">
              {converter.units.map(u => (
                <SelectItem key={u.id} value={u.id}>
                  {t(u.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResultDisplay 
        result={String(result)}
      />

      <Formula 
        formula="2 + 2 = 4"
      />
    </div>
  )
}

export default PhyisicsUnitCalculator
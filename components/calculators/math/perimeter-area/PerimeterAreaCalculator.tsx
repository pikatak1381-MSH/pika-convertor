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
import { calculationTypes, shapes } from "./perimeterArea.data"
import { CalculationType, ShapeId } from "./perimeterArea.types"
import ResultDisplay from "@/components/calculatorPage/ResultDisplay"
import Formula from "@/components/calculatorPage/Formula"
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

const PerimeterAreaCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  const [activeType, setActiveType] = useState<CalculationType>(calculationTypes[0].id)
  const [selectedShape, setSelectedShape] = useState<ShapeId>(shapes[0].id)
  const [values, setValues] = useState<number[]>([])

  const shape = useMemo(() => shapes.find((s) => s.id === selectedShape)!, [selectedShape])

  const result = useMemo(() => {
    if (values.some((v) => isNaN(v) || v === undefined)) return ""

    // For perimeter, we don't need height in most shapes
    const perimeterInputCount = getPerimeterInputCount(selectedShape)
    const areaInputCount = shape.inputs.length

    if (activeType === "perimeter") {
      if (values.length < perimeterInputCount) return ""
      return shape.calculatePerimeter(values)
    } else {
      if (values.length < areaInputCount) return ""
      return shape.calculateArea(values)
    }
  }, [values, shape, activeType, selectedShape])

  const formula = useMemo(() => {
    return activeType === "perimeter" ? shape.perimeterFormula : shape.areaFormula
  }, [activeType, shape])

  const updateValue = (index: number, value: number) => {
    setValues((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const handleTypeChange = (type: CalculationType) => {
    setActiveType(type)
    setValues([])
  }

  const handleShapeChange = (shapeId: ShapeId) => {
    setSelectedShape(shapeId)
    setValues([])
  }

  // Get relevant inputs based on calculation type
  const getRelevantInputs = () => {
    if (activeType === "perimeter") {
      // For perimeter, exclude height-related inputs
      return shape.inputs.filter((input) => !["height"].includes(input.id))
    }
    return shape.inputs
  }

  return (
    <div className="mt-4">
      {/* Tabs for Perimeter/Area */}
      <div className="bg-background flex w-fit rounded-[20px] border p-1">
        {calculationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleTypeChange(type.id)}
            className={`text-foreground w-36 rounded-[20px] border border-transparent px-2 py-2 text-sm font-bold transition hover:border-black ${
              activeType === type.id ? "bg-secondary-background hover:border-transparent" : ""
            }`}
          >
            {t(type.labelKey)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeType}-${selectedShape}`}
          custom={dir}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mt-4 flex flex-col gap-4"
        >
          {/* Shape Selector */}
          <Select
            dir={dir}
            value={selectedShape}
            onValueChange={(value) => handleShapeChange(value as ShapeId)}
          >
            <SelectTrigger className="bg-background border-input text-secondary-foreground w-full rounded-full border px-3 py-2 text-sm font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background text-secondary-foreground rounded-2xl text-sm font-semibold">
              {shapes.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {t(s.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Inputs */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {getRelevantInputs().map((input, index) => (
              <input
                key={input.id}
                type="number"
                placeholder={t(input.labelKey)}
                value={values[index] ?? ""}
                onChange={(e) => updateValue(index, Number(e.target.value))}
                className="bg-background border-input placeholder:text-input-secondary-placeholder rounded-full border px-3 py-2 placeholder:text-sm placeholder:font-bold"
              />
            ))}
          </div>

          {/* Result */}
          <ResultDisplay result={result ? String(Number(result.toFixed(6))) : ""} />

          {/* Formula */}
          <Formula formula={formula} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Helper to determine how many inputs are needed for perimeter calculation
function getPerimeterInputCount(shapeId: ShapeId): number {
  switch (shapeId) {
    case "square":
      return 1
    case "rectangle":
      return 2
    case "triangle":
      return 3 // a, b, c (no height needed)
    case "circle":
      return 1
    case "trapezoid":
      return 4 // a, b, c, d (no height needed)
    case "parallelogram":
      return 2 // base, side (no height needed)
    case "ellipse":
      return 2
    default:
      return 1
  }
}

export default PerimeterAreaCalculator

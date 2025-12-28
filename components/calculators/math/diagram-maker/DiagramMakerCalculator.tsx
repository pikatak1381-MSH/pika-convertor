"use client"

import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion"
import { useState, useMemo, useRef } from "react"
import { equationConfigs } from "./diagramMaker.data"
import { EquationType } from "./diagramMaker.types"
import GraphRenderer from "./GraphRenderer"
import MathButtons from "./MathButtons"
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

const DiagramMakerCalculator = () => {
  const t = useTranslations("Calculators")
  const locale = useLocale()
  const dir = locale === "fa" ? "rtl" : "ltr"

  const [activeType, setActiveType] = useState<EquationType>("cartesian")
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [plotData, setPlotData] = useState<{
    type: EquationType
    equation: string
    xEquation?: string
    yEquation?: string
  } | null>(null)

  // Track focused input for math button insertion
  const focusedInputRef = useRef<string | null>(null)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const config = useMemo(() => equationConfigs.find((c) => c.id === activeType)!, [activeType])

  const handleTypeChange = (type: EquationType) => {
    setActiveType(type)
    setInputs({})
    focusedInputRef.current = null
  }

  const handleInputChange = (inputId: string, value: string) => {
    setInputs((prev) => ({ ...prev, [inputId]: value }))
  }

  const handleMathButtonInsert = (value: string) => {
    const targetInputId = focusedInputRef.current || config.inputs[0]?.id
    if (!targetInputId) return

    const inputElement = inputRefs.current[targetInputId]
    if (inputElement) {
      const start = inputElement.selectionStart || 0
      const end = inputElement.selectionEnd || 0
      const currentValue = inputs[targetInputId] || ""
      const newValue = currentValue.slice(0, start) + value + currentValue.slice(end)

      setInputs((prev) => ({ ...prev, [targetInputId]: newValue }))

      // Restore cursor position after React re-render
      setTimeout(() => {
        inputElement.focus()
        const newCursorPos = start + value.length
        inputElement.setSelectionRange(newCursorPos, newCursorPos)
      }, 0)
    }
  }

  const handleCreate = () => {
    if (activeType === "parametric") {
      setPlotData({
        type: activeType,
        equation: "",
        xEquation: inputs.x || "",
        yEquation: inputs.y || "",
      })
    } else {
      setPlotData({
        type: activeType,
        equation: inputs.equation || "",
      })
    }
  }

  const isCreateDisabled = useMemo(() => {
    if (activeType === "parametric") {
      return !inputs.x?.trim() || !inputs.y?.trim()
    }
    return !inputs.equation?.trim()
  }, [activeType, inputs])

  return (
    <div className="mt-4 flex flex-col gap-6 lg:flex-row">
      {/* Right Panel - Calculator */}
      <div className="w-full lg:w-96">
        {/* Tabs */}
        <div className="bg-background flex w-full flex-wrap rounded-[20px] border p-1">
          {equationConfigs.map((cfg) => (
            <button
              key={cfg.id}
              onClick={() => handleTypeChange(cfg.id)}
              className={`text-foreground flex-1 rounded-[20px] border border-transparent px-2 py-2 text-sm font-bold transition hover:border-black ${
                activeType === cfg.id ? "bg-secondary-background hover:border-transparent" : ""
              }`}
            >
              {t(cfg.labelKey)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            custom={dir}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mt-4 flex flex-col gap-4"
          >
            {/* Math Buttons */}
            <div className="rounded-2xl p-3">
              <MathButtons onInsert={handleMathButtonInsert} />
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-3">
              {config.inputs.map((input) => (
                <div key={input.id} className="flex flex-col gap-1">
                  <label className="text-secondary-foreground text-start font-bold">
                    {t("math.diagramMaker.inputs.equation")}
                  </label>
                  <input
                    ref={(el) => {
                      inputRefs.current[input.id] = el
                    }}
                    type="text"
                    placeholder={input.placeholder}
                    value={inputs[input.id] || ""}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    onFocus={() => {
                      focusedInputRef.current = input.id
                    }}
                    className="bg-background border-input placeholder:text-input-secondary-placeholder rounded-full border px-4 py-3 font-mono text-sm placeholder:font-sans placeholder:text-sm placeholder:font-bold focus:ring-2 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Example */}
            <p className="text-muted-foreground text-sm">
              {t("math.diagramMaker.example")}: {config.example}
            </p>

            {/* Create Button */}
            <button
              onClick={handleCreate}
              disabled={isCreateDisabled}
              className="bg-secondary-foreground text-secondary-background hover:bg-secondary-foreground/90 disabled:bg-muted disabled:text-muted-foreground self-start rounded-full px-4 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed"
            >
              {t("math.diagramMaker.create")}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Left Panel - Graph */}
      <div className="order-2 flex-1 lg:order-2">
        <div className="bg-background sticky top-4 h-[400px] rounded-2xl border lg:h-[500px]">
          {plotData ? (
            <GraphRenderer
              type={plotData.type}
              equation={plotData.equation}
              xEquation={plotData.xEquation}
              yEquation={plotData.yEquation}
            />
          ) : (
            <div className="text-muted-foreground flex h-full items-center justify-center">
              <p className="text-center text-sm">{t("math.diagramMaker.enterEquation")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DiagramMakerCalculator

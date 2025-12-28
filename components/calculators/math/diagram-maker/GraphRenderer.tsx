"use client"

import { useEffect, useRef, useState } from "react"
import { EquationType } from "./diagramMaker.types"
import { defaultDomains } from "./diagramMaker.data"
import { useTranslations } from "next-intl"

interface GraphRendererProps {
  type: EquationType
  equation: string
  xEquation?: string
  yEquation?: string
}

const GraphRenderer = ({ type, equation, xEquation, yEquation }: GraphRendererProps) => {
  const t = useTranslations("Calculators")
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Only run on client side
    if (typeof window === "undefined") return

    // Clear previous content
    containerRef.current.innerHTML = ""

    // Check if we have valid input
    const hasValidInput =
      type === "parametric" ? xEquation?.trim() && yEquation?.trim() : equation?.trim()

    if (!hasValidInput) {
      return
    }

    // Dynamic import to avoid SSR issues
    const loadPlot = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const functionPlot = require("function-plot")
        const options = buildPlotOptions(type, equation, xEquation, yEquation)

        functionPlot({
          target: containerRef.current!,
          width: containerRef.current!.clientWidth,
          height: containerRef.current!.clientHeight || 400,
          xAxis: { domain: defaultDomains.x },
          yAxis: { domain: defaultDomains.y },
          grid: true,
          data: [options],
        })
        setError(null)
      } catch (err) {
        setError(t("math.diagramMaker.invalidEquation"))
        console.error("Graph error:", err)
      }
    }

    loadPlot()
  }, [type, equation, xEquation, yEquation, t])

  return (
    <div className="relative h-full min-h-[400px] w-full">
      <div ref={containerRef} className="bg-background h-full w-full rounded-2xl border" />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-destructive bg-background/80 rounded-lg px-4 py-2 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}

function buildPlotOptions(
  type: EquationType,
  equation: string,
  xEquation?: string,
  yEquation?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  switch (type) {
    case "cartesian":
      return {
        fn: equation,
        graphType: "polyline",
      }
    case "polar":
      return {
        r: equation,
        fnType: "polar",
        graphType: "polyline",
      }
    case "implicit":
      return {
        fn: equation,
        fnType: "implicit",
      }
    case "parametric":
      return {
        x: xEquation,
        y: yEquation,
        fnType: "parametric",
        graphType: "polyline",
        range: defaultDomains.t,
      }
    default:
      return { fn: equation }
  }
}

export default GraphRenderer

declare module "function-plot" {
  interface FunctionPlotDatum {
    fn?: string
    r?: string
    x?: string
    y?: string
    fnType?: "linear" | "parametric" | "implicit" | "polar" | "points" | "vector"
    graphType?: "polyline" | "scatter" | "interval"
    range?: [number, number]
    nSamples?: number
    color?: string
    closed?: boolean
    skipTip?: boolean
    attr?: Record<string, unknown>
  }

  interface FunctionPlotOptions {
    target: HTMLElement | string
    title?: string
    width?: number
    height?: number
    xAxis?: {
      type?: "linear" | "log"
      domain?: [number, number]
      label?: string
    }
    yAxis?: {
      type?: "linear" | "log"
      domain?: [number, number]
      label?: string
    }
    tip?: {
      xLine?: boolean
      yLine?: boolean
      renderer?: (x: number, y: number, index: number) => string
    }
    grid?: boolean
    disableZoom?: boolean
    data: FunctionPlotDatum[]
  }

  interface FunctionPlotInstance {
    root: SVGElement
    meta: {
      xScale: unknown
      yScale: unknown
    }
    build: () => void
    addLink: (...instances: FunctionPlotInstance[]) => void
  }

  function functionPlot(options: FunctionPlotOptions): FunctionPlotInstance

  export default functionPlot
}

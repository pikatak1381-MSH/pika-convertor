export interface DataPoint {
  data: number
  weight: number
}

export type SampleType = "population" | "sample"

export interface StatisticsResult {
  variance: number
  standardDeviation: number
  arithmeticMean: number
  geometricMean: number
  harmonicMean: number
  weightedMean: number
  range: number
  count: number
  sum: number
  min: number
  max: number
}

import { DataPoint, SampleType, StatisticsResult } from "./statistics.types"

/**
 * Calculate weighted mean
 */
export const calculateWeightedMean = (dataPoints: DataPoint[]): number => {
  const totalWeight = dataPoints.reduce((sum, dp) => sum + dp.weight, 0)
  if (totalWeight === 0) return 0
  const weightedSum = dataPoints.reduce((sum, dp) => sum + dp.data * dp.weight, 0)
  return weightedSum / totalWeight
}

/**
 * Calculate arithmetic mean
 */
export const calculateArithmeticMean = (dataPoints: DataPoint[]): number => {
  if (dataPoints.length === 0) return 0
  const sum = dataPoints.reduce((acc, dp) => acc + dp.data, 0)
  return sum / dataPoints.length
}

/**
 * Calculate geometric mean
 */
export const calculateGeometricMean = (dataPoints: DataPoint[]): number => {
  if (dataPoints.length === 0) return 0
  // Check for non-positive values
  if (dataPoints.some((dp) => dp.data <= 0)) return NaN
  const product = dataPoints.reduce((acc, dp) => acc * dp.data, 1)
  return Math.pow(product, 1 / dataPoints.length)
}

/**
 * Calculate harmonic mean
 */
export const calculateHarmonicMean = (dataPoints: DataPoint[]): number => {
  if (dataPoints.length === 0) return 0
  // Check for zero values
  if (dataPoints.some((dp) => dp.data === 0)) return NaN
  const sumOfReciprocals = dataPoints.reduce((acc, dp) => acc + 1 / dp.data, 0)
  return dataPoints.length / sumOfReciprocals
}

/**
 * Calculate variance (population or sample)
 */
export const calculateVariance = (
  dataPoints: DataPoint[],
  sampleType: SampleType
): number => {
  if (dataPoints.length === 0) return 0
  if (sampleType === "sample" && dataPoints.length === 1) return 0

  const mean = calculateWeightedMean(dataPoints)
  const totalWeight = dataPoints.reduce((sum, dp) => sum + dp.weight, 0)

  const squaredDiffSum = dataPoints.reduce((sum, dp) => {
    return sum + dp.weight * Math.pow(dp.data - mean, 2)
  }, 0)

  // For population: divide by N, for sample: divide by N-1
  const divisor = sampleType === "population" ? totalWeight : totalWeight - 1
  return squaredDiffSum / divisor
}

/**
 * Calculate standard deviation
 */
export const calculateStandardDeviation = (
  dataPoints: DataPoint[],
  sampleType: SampleType
): number => {
  return Math.sqrt(calculateVariance(dataPoints, sampleType))
}

/**
 * Calculate range (max - min)
 */
export const calculateRange = (dataPoints: DataPoint[]): number => {
  if (dataPoints.length === 0) return 0
  const values = dataPoints.map((dp) => dp.data)
  return Math.max(...values) - Math.min(...values)
}

/**
 * Calculate all statistics
 */
export const calculateAllStatistics = (
  dataPoints: DataPoint[],
  sampleType: SampleType
): StatisticsResult => {
  if (dataPoints.length === 0) {
    return {
      variance: 0,
      standardDeviation: 0,
      arithmeticMean: 0,
      geometricMean: 0,
      harmonicMean: 0,
      weightedMean: 0,
      range: 0,
      count: 0,
      sum: 0,
      min: 0,
      max: 0,
    }
  }

  const values = dataPoints.map((dp) => dp.data)

  return {
    variance: calculateVariance(dataPoints, sampleType),
    standardDeviation: calculateStandardDeviation(dataPoints, sampleType),
    arithmeticMean: calculateArithmeticMean(dataPoints),
    geometricMean: calculateGeometricMean(dataPoints),
    harmonicMean: calculateHarmonicMean(dataPoints),
    weightedMean: calculateWeightedMean(dataPoints),
    range: calculateRange(dataPoints),
    count: dataPoints.length,
    sum: values.reduce((a, b) => a + b, 0),
    min: Math.min(...values),
    max: Math.max(...values),
  }
}

/**
 * Format number for display
 */
export const formatNumber = (num: number, decimals: number = 4): string => {
  if (isNaN(num) || !isFinite(num)) return "—"
  return Number(num.toFixed(decimals)).toString()
}

/**
 * Variance formula for display
 */
export const varianceFormula = {
  population: "\\sigma^2 = \\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2",
  sample: "s^2 = \\frac{1}{N-1} \\sum_{i=1}^{N} (x_i - \\bar{x})^2",
}

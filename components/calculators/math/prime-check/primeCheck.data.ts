import { PrimeCheckResult } from "./primeCheck.types"

/**
 * Checks if a number is prime
 */
export const isPrime = (n: number): boolean => {
  if (n < 2) return false
  if (n === 2) return true
  if (n % 2 === 0) return false

  const sqrt = Math.sqrt(n)
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false
  }
  return true
}

/**
 * Finds all prime factors of a number
 */
export const findPrimeFactors = (n: number): number[] => {
  if (n < 2) return []

  const factors: number[] = []
  let remaining = n

  // Check for 2
  while (remaining % 2 === 0) {
    factors.push(2)
    remaining /= 2
  }

  // Check for odd factors
  for (let i = 3; i <= Math.sqrt(remaining); i += 2) {
    while (remaining % i === 0) {
      factors.push(i)
      remaining /= i
    }
  }

  // If remaining is greater than 1, it's a prime factor
  if (remaining > 1) {
    factors.push(remaining)
  }

  return factors
}

/**
 * Checks a number and returns detailed result
 */
export const checkPrime = (n: number): PrimeCheckResult => {
  const prime = isPrime(n)
  return {
    isPrime: prime,
    number: n,
    factors: prime ? undefined : findPrimeFactors(n),
  }
}

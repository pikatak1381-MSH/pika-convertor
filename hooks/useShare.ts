"use client"

import { useCallback } from "react"

interface ShareData {
  title?: string
  text?: string
  url?: string
}

export const useShare = () => {
  const canShare = typeof navigator !== "undefined" && "share" in navigator

  const share = useCallback(
    async (data: ShareData): Promise<boolean> => {
      if (canShare && navigator.share) {
        try {
          await navigator.share(data)
          return true
        } catch (error) {
          if ((error as Error).name === "AbortError") {
            // User Cancelled, not an error
            return false
          }
          console.error("Share failed:", error)
          return false
        }
      }
      return false
    },
    [canShare]
  )

  return { share, canShare }
}

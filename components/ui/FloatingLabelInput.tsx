"use client"

import { cn } from "@/lib/utils"
import { forwardRef, useState, InputHTMLAttributes } from "react"

interface FloatingLabelInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "placeholder"
> {
  label: string
  error?: string
}

const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, error, className, value, onFocus, onBlur, type = "text", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    const hasValue = value !== undefined && value !== ""
    const isFloating = isFocused || hasValue

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <div className={cn("relative min-h-13 w-full", className)}>
        <div
          className={cn(
            "relative flex min-h-10 w-full flex-col justify-center rounded-2xl border px-4 py-0.5 transition-all duration-200",
            "border-input bg-background",
            isFocused && "border-secondary-foreground ring-secondary-foreground/20 ring-2",
            error && "border-destructive",
            error && isFocused && "ring-destructive/20"
          )}
        >
          {/* Floating Label */}
          <span
            className={cn(
              "pointer-events-none origin-left text-sm font-bold transition-all duration-200",
              "text-muted-foreground text-right",
              !isFloating && "absolute",
              isFloating && "text-footer-foreground mb-0.5 text-xs font-semibold",
              isFocused && "text-footer-foreground mb-0.5 text-xs font-semibold",
              error && isFocused && "text-destructive"
            )}
          >
            {label}
          </span>

          {/* Input Field - Only visible when floating */}
          <input
            ref={ref}
            type={type}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "w-full bg-transparent text-base font-medium outline-none",
              "text-foreground",
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              !isFloating && "absolute opacity-0",
              isFloating && "opacity-100"
            )}
            {...props}
          />
        </div>
        {error && <p className="text-destructive mt-1 text-xs">{error}</p>}
      </div>
    )
  }
)

FloatingLabelInput.displayName = "FloatingLabelInput"

export default FloatingLabelInput

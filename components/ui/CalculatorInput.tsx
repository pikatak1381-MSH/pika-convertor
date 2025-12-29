"use client"

import { cn } from "@/lib/utils"
import { forwardRef, InputHTMLAttributes } from "react"

interface CalculatorInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  value: string | number
  onChange: (value: number) => void
  allowNegative?: boolean
  allowDecimal?: boolean
  placeholder?: string
}

const CalculatorInput = forwardRef<HTMLInputElement, CalculatorInputProps>(
  (
    {
      value,
      onChange,
      allowNegative = true,
      allowDecimal = true,
      placeholder = "",
      className,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value

      // Allow empty string
      if (inputValue === "" || inputValue === "-") {
        onChange(NaN)
        return
      }

      // Validate input based on settings
      const regex = allowNegative
        ? allowDecimal
          ? /^-?\d*\.?\d*$/
          : /^-?\d*$/
        : allowDecimal
          ? /^\d*\.?\d*$/
          : /^\d*$/

      if (regex.test(inputValue)) {
        const numValue = parseFloat(inputValue)
        onChange(isNaN(numValue) ? NaN : numValue)
      }
    }

    // Display empty string if value is NaN, otherwise show the value
    const displayValue = isNaN(Number(value)) ? "" : String(value)

    return (
      <input
        ref={ref}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "bg-input-background border-secondary-foreground text-secondary-foreground placeholder:text-muted-foreground",
          "h-13 w-13 rounded-[20px] border text-center text-sm font-bold",
          "transition-colors outline-none",
          "focus:border-secondary-foreground focus:ring-secondary-foreground/20 focus:ring-2",
          // Hide spinner arrows
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          className
        )}
        {...props}
      />
    )
  }
)

CalculatorInput.displayName = "CalculatorInput"

export default CalculatorInput

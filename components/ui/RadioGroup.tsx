"use client"

import { cn } from "@/lib/utils"

export interface RadioOption<T extends string> {
  value: T
  label: string
}

interface RadioGroupProps<T extends string> {
  options: RadioOption<T>[]
  value: T
  onChange: (value: T) => void
  name: string
  className?: string
  optionClassName?: string
}

function RadioGroup<T extends string>({
  options,
  value,
  onChange,
  name,
  className,
  optionClassName,
}: RadioGroupProps<T>) {
  return (
    <div className={cn("flex gap-6", className)}>
      {options.map((option) => {
        const isSelected = value === option.value

        return (
          <label
            key={option.value}
            className={cn("flex cursor-pointer items-center gap-2", optionClassName)}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span
              className={cn(
                "bg-background relative flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors",
                isSelected ? "border-primary" : "border"
              )}
            >
              <span
                className={cn(
                  "bg-primary h-2 w-2 rounded-full transition-transform",
                  isSelected ? "scale-100" : "scale-0"
                )}
              />
            </span>
            <span className="text-base font-semibold">{option.label}</span>
          </label>
        )
      })}
    </div>
  )
}

export default RadioGroup

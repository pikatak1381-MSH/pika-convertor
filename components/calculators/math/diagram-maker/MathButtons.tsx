"use client"

import { mathButtons } from "./diagramMaker.data"

interface MathButtonsProps {
  onInsert: (value: string) => void
}

const MathButtons = ({ onInsert }: MathButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      {mathButtons.map((btn) => (
        <button
          key={btn.id}
          onClick={() => onInsert(btn.insert)}
          title={btn.title}
          className="bg-secondary-background hover:bg-secondary-background/80 text-foreground min-w-10 rounded-lg border border-black px-2 py-1.5 text-sm font-medium transition-colors"
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}

export default MathButtons

import Image from "next/image"

interface CalculatorHeroProps {
  categoryTitle: string
  categoryIcon: string
  subCategoryTitle: string
  subCategoryDesription: string
}

const CalculatorHero: React.FC<CalculatorHeroProps> = ({
  categoryTitle,
  categoryIcon,
  subCategoryTitle,
  subCategoryDesription,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center gap-2 text-center">
        <div className="bg-primary h-9 w-9 rounded p-1">
          <Image
            src={categoryIcon}
            alt={categoryTitle}
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
        <h1 className="text-secondary-foreground text-2xl font-bold">
          {categoryTitle} - {subCategoryTitle}
        </h1>
      </div>

      <p className="text-category-description mt-3 text-lg font-bold">{subCategoryDesription}</p>
    </div>
  )
}

export default CalculatorHero

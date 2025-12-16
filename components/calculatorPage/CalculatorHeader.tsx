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
                <div className="flex items-center justify-center text-center gap-2">
                    <div className="bg-primary w-9 h-9 rounded p-1">
                        <Image 
                            src={categoryIcon}
                            alt={categoryTitle}
                            width={36}
                            height={36}
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-secondary-foreground">
                        {subCategoryTitle} - {subCategoryTitle}
                    </h1>
                </div>

                <p className="text-category-description text-lg font-bold mt-3">
                    {subCategoryDesription}
                </p>
            </div>
  )
}

export default CalculatorHero
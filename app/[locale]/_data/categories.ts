export type SubCategory = {
  id: string
  i18nKey: string
  descriptionKey: string
  icon: string
  isNew?: boolean
}

export type Category = {
  id: string
  i18nKey: string
  descriptionKey: string
  icon: string
  subCategories: SubCategory[]
  isNew?: boolean
}

export const categories: Category[] = [
  {
    id: "engineering",
    i18nKey: "categories.engineering",
    descriptionKey: "categoriesDescriptions.engineering",
    icon: "/icons/categories/engineering.svg",
    subCategories: [
      {
        id: "physics-units",
        i18nKey: "sub.engineering.physicsUnits.title",
        descriptionKey: "sub.engineering.physicsUnits.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "fluids-units",
        i18nKey: "sub.engineering.fluids.title",
        descriptionKey: "sub.engineering.fluids.description",
        icon: "/icons/categories/flow.svg",
      },
      {
        id: "electricity-units",
        i18nKey: "sub.engineering.electricity.title",
        descriptionKey: "sub.engineering.electricity.description",
        icon: "/icons/categories/electric.svg",
      },
      {
        id: "magnetism-units",
        i18nKey: "sub.engineering.magnetism.title",
        descriptionKey: "sub.engineering.magnetism.description",
        icon: "/icons/categories/magnet.svg",
      },
      {
        id: "optical-units",
        i18nKey: "sub.engineering.optical.title",
        descriptionKey: "sub.engineering.optical.description",
        icon: "/icons/categories/light.svg",
      },
      {
        id: "thermal-units",
        i18nKey: "sub.engineering.thermal.title",
        descriptionKey: "sub.engineering.thermal.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "radiology-units",
        i18nKey: "sub.engineering.radiology.title",
        descriptionKey: "sub.engineering.radiology.description",
        icon: "/icons/categories/light.svg",
      },
    ],
  },

  {
    id: "math",
    i18nKey: "categories.math",
    descriptionKey: "categoriesDescriptions.math",
    icon: "/icons/categories/math.svg",
    subCategories: [
      {
        id: "percentage",
        i18nKey: "sub.math.percentage.title",
        descriptionKey: "sub.math.percentage.description",
        icon: "/icons/categories/percentage.svg",
      },
      {
        id: "power-root",
        i18nKey: "sub.math.powerRoot.title",
        descriptionKey: "sub.math.powerRoot.description",
        icon: "/icons/categories/root.svg",
      },
      {
        id: "log",
        i18nKey: "sub.math.logarithm.title",
        descriptionKey: "sub.math.logarithm.description",
        icon: "/icons/categories/log.svg",
      },
      {
        id: "equation-solver",
        i18nKey: "sub.math.equationSolver.title",
        descriptionKey: "sub.math.equationSolver.description",
        icon: "/icons/categories/equation.svg",
      },
      {
        id: "base-converter",
        i18nKey: "sub.math.baseConverter.title",
        descriptionKey: "sub.math.baseConverter.description",
        icon: "/icons/categories/index.svg",
      },
      {
        id: "prime-check",
        i18nKey: "sub.math.primeCheck.title",
        descriptionKey: "sub.math.primeCheck.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "perimeter-area",
        i18nKey: "sub.math.perimeterArea.title",
        descriptionKey: "sub.math.perimeterArea.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "fibonacci",
        i18nKey: "sub.math.fibonacci.title",
        descriptionKey: "sub.math.fibonacci.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "factorial",
        i18nKey: "sub.math.factorial.title",
        descriptionKey: "sub.math.factorial.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "average",
        i18nKey: "sub.math.average.title",
        descriptionKey: "sub.math.average.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "diagram-maker",
        i18nKey: "sub.math.diagramMaker.title",
        descriptionKey: "sub.math.diagramMaker.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "probability",
        i18nKey: "sub.math.probability.title",
        descriptionKey: "sub.math.probability.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "matrix-vector",
        i18nKey: "sub.math.matrixVector.title",
        descriptionKey: "sub.math.matrixVector.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "decimal-to-fraction",
        i18nKey: "sub.math.decimalToFraction.title",
        descriptionKey: "sub.math.decimalToFraction.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "slope-calculator",
        i18nKey: "sub.math.slopeCalculator.title",
        descriptionKey: "sub.math.slopeCalculator.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "percentage-increase",
        i18nKey: "sub.math.percentageIncrease.title",
        descriptionKey: "sub.math.percentageIncrease.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "trigonometry",
        i18nKey: "sub.math.trigonometry.title",
        descriptionKey: "sub.math.trigonometry.description",
        icon: "/icons/categories/physics.svg",
      },
    ],
  },

  {
    id: "technology",
    i18nKey: "categories.technology",
    descriptionKey: "categoriesDescriptions.technology",
    icon: "/icons/categories/technology.svg",
    subCategories: [
      {
        id: "password-generator",
        i18nKey: "sub.technology.passwordGenerator.title",
        descriptionKey: "sub.technology.passwordGenerator.description",
        icon: "/icons/categories/password.svg",
      },
      {
        id: "my-ip",
        i18nKey: "sub.technology.myIp.title",
        descriptionKey: "sub.technology.myIp.description",
        icon: "/icons/categories/ip-address.svg",
      },
      {
        id: "gpa-converter",
        i18nKey: "sub.technology.gpaConverter.title",
        descriptionKey: "sub.technology.gpaConverter.description",
        icon: "/icons/categories/score.svg",
      },
      {
        id: "barcode-generator",
        i18nKey: "sub.technology.barcodeGenerator.title",
        descriptionKey: "sub.technology.barcodeGenerator.description",
        icon: "/icons/categories/barcode.svg",
      },
      {
        id: "whatsapp-link",
        i18nKey: "sub.technology.whatsappLink.title",
        descriptionKey: "sub.technology.whatsappLink.description",
        icon: "/icons/categories/whatsapp.svg",
      },
      {
        id: "utm-link",
        i18nKey: "sub.technology.utmLink.title",
        descriptionKey: "sub.technology.utmLink.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "qr-code",
        i18nKey: "sub.technology.qrCode.title",
        descriptionKey: "sub.technology.qrCode.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "domain-checker",
        i18nKey: "sub.technology.domainChecker.title",
        descriptionKey: "sub.technology.domainChecker.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "hash-generator",
        i18nKey: "sub.technology.hashGenerator.title",
        descriptionKey: "sub.technology.hashGenerator.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "text-to-binary",
        i18nKey: "sub.technology.textToBinary.title",
        descriptionKey: "sub.technology.textToBinary.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "schema-builder",
        i18nKey: "sub.technology.schemaBuilder.title",
        descriptionKey: "sub.technology.schemaBuilder.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "schema-finder",
        i18nKey: "sub.technology.schemaFinder.title",
        descriptionKey: "sub.technology.schemaFinder.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "meta-finder",
        i18nKey: "sub.technology.metaFinder.title",
        descriptionKey: "sub.technology.metaFinder.description",
        icon: "/icons/categories/physics.svg",
      },
    ],
  },

  {
    id: "files",
    i18nKey: "categories.files",
    descriptionKey: "categoriesDescriptions.files",
    icon: "/icons/categories/file.svg",
    subCategories: [
      {
        id: "text-voice",
        i18nKey: "sub.files.textVoice.title",
        descriptionKey: "sub.files.textVoice.description",
        icon: "/icons/categories/voice.svg",
      },
      {
        id: "image-to-text",
        i18nKey: "sub.files.imageToText.title",
        descriptionKey: "sub.files.imageToText.description",
        icon: "/icons/categories/png-to-text.svg",
      },
      {
        id: "file-converter",
        i18nKey: "sub.files.fileConverter.title",
        descriptionKey: "sub.files.fileConverter.description",
        icon: "/icons/categories/file-transfer.svg",
      },
      {
        id: "pdf-merge",
        i18nKey: "sub.files.pdfMerge.title",
        descriptionKey: "sub.files.pdfMerge.description",
        icon: "/icons/categories/merge-pdf.svg",
      },
    ],
  },

  {
    id: "time",
    i18nKey: "categories.time",
    descriptionKey: "categoriesDescriptions.time",
    icon: "/icons/categories/time.svg",
    subCategories: [
      {
        id: "date-conversion",
        i18nKey: "sub.time.dateConversion.title",
        descriptionKey: "sub.time.dateConversion.description",
        icon: "/icons/categories/data-swap.svg",
      },
      {
        id: "date-difference",
        i18nKey: "sub.time.dateDifference.title",
        descriptionKey: "sub.time.dateDifference.description",
        icon: "/icons/categories/duration.svg",
      },
      {
        id: "minutes-to-hours",
        i18nKey: "sub.time.minutesToHours.title",
        descriptionKey: "sub.time.minutesToHours.description",
        icon: "/icons/categories/hour.svg",
      },
      {
        id: "stopwatch",
        i18nKey: "sub.time.stopwatch.title",
        descriptionKey: "sub.time.stopwatch.description",
        icon: "/icons/categories/stopwatch.svg",
      },
      {
        id: "prayer-times",
        i18nKey: "sub.time.prayerTimes.title",
        descriptionKey: "sub.time.prayerTimes.description",
        icon: "/icons/categories/islamic-time.svg",
      },
      {
        id: "age-calculator",
        i18nKey: "sub.time.ageCalculator.title",
        descriptionKey: "sub.time.ageCalculator.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "persian-new-year",
        i18nKey: "sub.time.persianNewYear.title",
        descriptionKey: "sub.time.persianNewYear.description",
        icon: "/icons/categories/physics.svg",
      },
    ],
  },

  {
    id: "health",
    i18nKey: "categories.health",
    descriptionKey: "categoriesDescriptions.health",
    icon: "/icons/categories/health.svg",
    subCategories: [
      {
        id: "bmi",
        i18nKey: "sub.health.bmi.title",
        descriptionKey: "sub.health.bmi.description",
        icon: "/icons/categories/bmi.svg",
      },
      {
        id: "ideal-weight",
        i18nKey: "sub.health.idealWeight.title",
        descriptionKey: "sub.health.idealWeight.description",
        icon: "/icons/categories/duration.svg",
      },
      {
        id: "calorie",
        i18nKey: "sub.health.calorie.title",
        descriptionKey: "sub.health.calorie.description",
        icon: "/icons/categories/hour.svg",
      },
      {
        id: "pregnancy",
        i18nKey: "sub.health.pregnancy.title",
        descriptionKey: "sub.health.pregnancy.description",
        icon: "/icons/categories/baby.svg",
      },
      {
        id: "steps-to-km",
        i18nKey: "sub.health.stepsToKm.title",
        descriptionKey: "sub.health.stepsToKm.description",
        icon: "/icons/categories/step.svg",
      },
      {
        id: "bmr",
        i18nKey: "sub.health.bmr.title",
        descriptionKey: "sub.health.bmr.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "bodyWater",
        i18nKey: "sub.health.bodyWater.title",
        descriptionKey: "sub.time.bodyWater.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "protein",
        i18nKey: "sub.health.protein.title",
        descriptionKey: "sub.time.protein.description",
        icon: "/icons/categories/physics.svg",
      },
    ],
  },

  {
    id: "location",
    i18nKey: "categories.location",
    descriptionKey: "categoriesDescriptions.location",
    icon: "/icons/categories/map.svg",
    subCategories: [
      {
        id: "city-distance",
        i18nKey: "sub.location.cityDistance.title",
        descriptionKey: "sub.location.cityDistance.description",
        icon: "/icons/categories/distance.svg",
      },
      {
        id: "area-length",
        i18nKey: "sub.location.areaLength.title",
        descriptionKey: "sub.location.areaLength.description",
        icon: "/icons/categories/ruler.svg",
      },
      {
        id: "coordinates",
        i18nKey: "sub.location.coordinates.title",
        descriptionKey: "sub.location.coordinates.description",
        icon: "/icons/categories/gps.svg",
      },
    ],
  },

  {
    id: "numbers",
    i18nKey: "categories.numbers",
    descriptionKey: "categoriesDescriptions.numbers",
    icon: "/icons/categories/number.svg",
    subCategories: [
      {
        id: "fa-to-en",
        i18nKey: "sub.numbers.faToEn.title",
        descriptionKey: "sub.numbers.faToEn.description",
        icon: "/icons/categories/convert.svg",
      },
      {
        id: "en-to-fa",
        i18nKey: "sub.numbers.enToFa.title",
        descriptionKey: "sub.numbers.enToFa.description",
        icon: "/icons/categories/convert.svg",
      },
      {
        id: "random-number",
        i18nKey: "sub.numbers.randomNumber.title",
        descriptionKey: "sub.numbers.randomNumber.description",
        icon: "/icons/categories/shuffle.svg",
      },
      {
        id: "fa-to-cn",
        i18nKey: "sub.numbers.faToCn.title",
        descriptionKey: "sub.numbers.faToCn.title",
        icon: "/icons/categories/chinese.svg",
      },
      {
        id: "fa-to-ar",
        i18nKey: "sub.numbers.faToAr.title",
        descriptionKey: "sub.numbers.faToAr.description",
        icon: "/icons/categories/arabic.svg",
      },
    ],
  },

  {
    id: "finance",
    i18nKey: "categories.finance",
    descriptionKey: "categoriesDescriptions.finance",
    icon: "/icons/categories/finance.svg",
    subCategories: [
      {
        id: "currency-units",
        i18nKey: "sub.finance.currencyUnits.title",
        descriptionKey: "sub.finance.currencyUnits.description",
        icon: "/icons/categories/currency.svg",
      },
      {
        id: "loan-calculator",
        i18nKey: "sub.finance.loanCalculator.title",
        descriptionKey: "sub.finance.loanCalculator.description",
        icon: "/icons/categories/loan.svg",
      },
      {
        id: "bank-interest",
        i18nKey: "sub.finance.bankInterest.title",
        descriptionKey: "sub.finance.bankInterest.description",
        icon: "/icons/categories/bank-deposite.svg",
      },
      {
        id: "gold-price",
        i18nKey: "sub.finance.goldPrice.title",
        descriptionKey: "sub.finance.goldPrice.description",
        icon: "/icons/categories/gold.svg",
      },
      {
        id: "transfer-cost",
        i18nKey: "sub.finance.transferCost.title",
        descriptionKey: "sub.finance.transferCost.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "realestate-commission",
        i18nKey: "sub.finance.realEstateCommission.title",
        descriptionKey: "sub.finance.realEstateCommission.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "savings",
        i18nKey: "sub.finance.savings.title",
        descriptionKey: "sub.finance.savings.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "bonus",
        i18nKey: "sub.finance.bonus.title",
        descriptionKey: "sub.finance.bonus.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "rent-calculator",
        i18nKey: "sub.finance.rentCalculator.title",
        descriptionKey: "sub.finance.rentCalculator.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "exchange-rates",
        i18nKey: "sub.finance.exchangeRates.title",
        descriptionKey: "sub.finance.exchangeRates.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "check-maturity",
        i18nKey: "sub.finance.checkMaturity.title",
        descriptionKey: "sub.finance.checkMaturity.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "check-maturity",
        i18nKey: "sub.finance.vatTax.title",
        descriptionKey: "sub.finance.vatTax.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "check-maturity",
        i18nKey: "sub.finance.profitMargin.title",
        descriptionKey: "sub.finance.profitMargin.description",
        icon: "/icons/categories/physics.svg",
      },
    ],
  },

  {
    id: "legal",
    i18nKey: "categories.legal",
    descriptionKey: "categoriesDescriptions.legal",
    icon: "/icons/categories/law.svg",
    subCategories: [
      {
        id: "government-fee",
        i18nKey: "sub.legal.governmentFee.title",
        descriptionKey: "sub.legal.governmentFee.description",
        icon: "/icons/categories/data-swap.svg",
      },
      {
        id: "notary-cost",
        i18nKey: "sub.legal.notaryCost.title",
        descriptionKey: "sub.legal.notaryCost.description",
        icon: "/icons/categories/duration.svg",
      },
      {
        id: "insurance-rights",
        i18nKey: "sub.legal.insuranceRights.title",
        descriptionKey: "sub.legal.insuranceRights.description",
        icon: "/icons/categories/hour.svg",
      },
      {
        id: "mahr-calculator",
        i18nKey: "sub.legal.mahrCalculator.title",
        descriptionKey: "sub.legal.mahrCalculator.description",
        icon: "/icons/categories/stopwatch.svg",
      },
      {
        id: "arbitration-fee",
        i18nKey: "sub.legal.arbitrationFee.title",
        descriptionKey: "sub.legal.arbitrationFee.description",
        icon: "/icons/categories/arbitration.svg",
      },
      {
        id: "lawsuit-cost",
        i18nKey: "sub.legal.lawsuitCost.title",
        descriptionKey: "sub.legal.lawsuitCost.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "late-penalty",
        i18nKey: "sub.legal.latePenalty.title",
        descriptionKey: "sub.legal.latePenalty.description",
        icon: "/icons/categories/physics.svg",
      },
      {
        id: "expert-fee",
        i18nKey: "sub.legal.expertFee.title",
        descriptionKey: "sub.legal.expertFee.description",
        icon: "/icons/categories/arbitration.svg",
      },
    ],
  },
]

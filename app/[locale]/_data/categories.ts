export type SubCategory = {
  id: string        
  i18nKey: string
  icon: string
  isNew?: boolean     
}

export type Category = {
  id: string        
  i18nKey: string    
  icon: string      
  subCategories: SubCategory[]
  isNew?: boolean
}

export const categories: Category[] = [
  {
    id: "engineering",
    i18nKey: "categories.engineering",
    icon: "/icons/categories/engineering.svg",
    subCategories: [
      { id: "physics-units", i18nKey: "sub.engineering.physicsUnits", icon: "/icons/categories/physics.svg" },
      { id: "currents", i18nKey: "sub.engineering.currents", icon: "/icons/categories/flow.svg" },
      { id: "electricity", i18nKey: "sub.engineering.electricity", icon: "/icons/categories/electric.svg" },
      { id: "magnetic", i18nKey: "sub.engineering.magnetic", icon: "/icons/categories/magnet.svg" },
      { id: "optical", i18nKey: "sub.engineering.optical", icon: "/icons/categories/light.svg" },
      { id: "thermal", i18nKey: "sub.engineering.thermal", icon: "/icons/categories/physics.svg" },
      { id: "radiology", i18nKey: "sub.engineering.radiology", icon: "/icons/categories/light.svg" } // Icons till here are correct
    ]
  },

  {
    id: "math",
    i18nKey: "categories.math",
    icon: "/icons/categories/math.svg",
    subCategories: [
      { id: "percentage", i18nKey: "sub.math.percentage", icon: "/icons/categories/percentage.svg" },
      { id: "power-root", i18nKey: "sub.math.powerRoot", icon: "/icons/categories/root.svg" },
      { id: "logarithm", i18nKey: "sub.math.logarithm", icon: "/icons/categories/log.svg" },
      { id: "equation-solver", i18nKey: "sub.math.equationSolver", icon: "/icons/categories/equation.svg" },
      { id: "base-converter", i18nKey: "sub.math.baseConverter", icon: "/icons/categories/index.svg" }, // Icons till here are correct
      { id: "prime-check", i18nKey: "sub.math.primeCheck", icon: "/icons/categories/physics.svg" },
      { id: "perimeter-area", i18nKey: "sub.math.perimeterArea", icon: "/icons/categories/physics.svg" },
      { id: "fibonacci", i18nKey: "sub.math.fibonacci", icon: "/icons/categories/physics.svg" },
      { id: "factorial", i18nKey: "sub.math.factorial", icon: "/icons/categories/physics.svg" },
      { id: "statistics", i18nKey: "sub.math.statistics", icon: "/icons/categories/physics.svg" },
      { id: "plotting", i18nKey: "sub.math.plotting", icon: "/icons/categories/physics.svg" },
      { id: "probability", i18nKey: "sub.math.probability", icon: "/icons/categories/physics.svg" },
      { id: "matrix-vector", i18nKey: "sub.math.matrixVector", icon: "/icons/categories/physics.svg" },
      { id: "decimal-to-fraction", i18nKey: "sub.math.decimalToFraction", icon: "/icons/categories/physics.svg" },
      { id: "slope-calculator", i18nKey: "sub.math.slopeCalculator", icon: "/icons/categories/physics.svg" },
      { id: "percentage-increase", i18nKey: "sub.math.percentageIncrease", icon: "/icons/categories/physics.svg" },
      { id: "trigonometry", i18nKey: "sub.math.trigonometry", icon: "/icons/categories/physics.svg" }
    ]
  },

  {
    id: "technology",
    i18nKey: "categories.technology",
    icon: "/icons/categories/technology.svg",
    subCategories: [
      { id: "password-generator", i18nKey: "sub.technology.passwordGenerator", icon: "/icons/categories/password.svg" },
      { id: "my-ip", i18nKey: "sub.technology.myIp", icon: "/icons/categories/ip-address.svg" },
      { id: "gpa-converter", i18nKey: "sub.technology.gpaConverter", icon: "/icons/categories/score.svg" },
      { id: "barcode-generator", i18nKey: "sub.technology.barcodeGenerator", icon: "/icons/categories/barcode.svg" },
      { id: "whatsapp-link", i18nKey: "sub.technology.whatsappLink", icon: "/icons/categories/whatsapp.svg" }, // Icons till here are correct
      { id: "utm-link", i18nKey: "sub.technology.utmLink", icon: "/icons/categories/physics.svg" },
      { id: "qr-code", i18nKey: "sub.technology.qrCode", icon: "/icons/categories/physics.svg" },
      { id: "domain-checker", i18nKey: "sub.technology.domainChecker", icon: "/icons/categories/physics.svg" },
      { id: "hash-generator", i18nKey: "sub.technology.hashGenerator", icon: "/icons/categories/physics.svg" },
      { id: "text-to-binary", i18nKey: "sub.technology.textToBinary", icon: "/icons/categories/physics.svg" },
      { id: "schema-builder", i18nKey: "sub.technology.schemaBuilder", icon: "/icons/categories/physics.svg" },
      { id: "schema-finder", i18nKey: "sub.technology.schemaFinder", icon: "/icons/categories/physics.svg" },
      { id: "meta-finder", i18nKey: "sub.technology.metaFinder", icon: "/icons/categories/physics.svg" }
    ]
  },

  {
    id: "files",
    i18nKey: "categories.files",
    icon: "/icons/categories/file.svg",
    subCategories: [
      { id: "text-voice", i18nKey: "sub.files.textVoice", icon: "/icons/categories/voice.svg" },
      { id: "image-to-text", i18nKey: "sub.files.imageToText", icon: "/icons/categories/png-to-text.svg" },
      { id: "file-converter", i18nKey: "sub.files.fileConverter", icon: "/icons/categories/file-transfer.svg" },
      { id: "pdf-merge", i18nKey: "sub.files.pdfMerge", icon: "/icons/categories/merge-pdf.svg" } // Icons till here are correct
    ]
  },

  {
    id: "time",
    i18nKey: "categories.time",
    icon: "/icons/categories/time.svg",
    subCategories: [
      { id: "date-conversion", i18nKey: "sub.time.dateConversion", icon: "/icons/categories/data-swap.svg" },
      { id: "date-difference", i18nKey: "sub.time.dateDifference", icon: "/icons/categories/duration.svg" },
      { id: "minutes-to-hours", i18nKey: "sub.time.minutesToHours", icon: "/icons/categories/hour.svg" },
      { id: "stopwatch", i18nKey: "sub.time.stopwatch", icon: "/icons/categories/stopwatch.svg" },
      { id: "prayer-times", i18nKey: "sub.time.prayerTimes", icon: "/icons/categories/islamic-time.svg" }, // Icons till here are correct
      { id: "age-calculator", i18nKey: "sub.time.ageCalculator", icon: "/icons/categories/physics.svg" },
      { id: "persian-new-year", i18nKey: "sub.time.persianNewYear", icon: "/icons/categories/physics.svg" }
    ]
  },

  {
    id: "finance",
    i18nKey: "categories.finance",
    icon: "/icons/categories/financial.svg",
    subCategories: [
      { id: "currency-units", i18nKey: "sub.finance.currencyUnits", icon: "/icons/categories/currency.svg" },
      { id: "loan-calculator", i18nKey: "sub.finance.loanCalculator", icon: "/icons/categories/loan.svg" },
      { id: "bank-interest", i18nKey: "sub.finance.bankInterest", icon: "/icons/categories/deposit.svg" },
      { id: "gold-price", i18nKey: "sub.finance.goldPrice", icon: "/icons/categories/gold.svg" },
      { id: "invoice", i18nKey: "sub.finance.invoice", icon: "/icons/categories/invoice.svg" }, // Icons till here are correct
      { id: "transfer-cost", i18nKey: "sub.finance.transferCost", icon: "/icons/categories/physics.svg" }, 
      { id: "real-estate-commission", i18nKey: "sub.finance.realEstateCommission", icon: "/icons/categories/physics.svg" },
      { id: "savings", i18nKey: "sub.finance.savings", icon: "/icons/categories/physics.svg" },
      { id: "bonus", i18nKey: "sub.finance.bonus", icon: "/icons/categories/physics.svg" },
      { id: "rent-calculator", i18nKey: "sub.finance.rentCalculator", icon: "/icons/categories/physics.svg" },
      { id: "exchange-rates", i18nKey: "sub.finance.exchangeRates", icon: "/icons/categories/physics.svg" },
      { id: "check-maturity", i18nKey: "sub.finance.checkMaturity", icon: "/icons/categories/physics.svg" },
      { id: "vat-tax", i18nKey: "sub.finance.vatTax", icon: "/icons/categories/physics.svg" },
      { id: "profit-margin", i18nKey: "sub.finance.profitMargin", icon: "/icons/categories/physics.svg" }
    ]
  },

  {
    id: "location",
    i18nKey: "categories.location",
    icon: "/icons/categories/map.svg",
    subCategories: [
      { id: "city-distance", i18nKey: "sub.location.cityDistance", icon: "/icons/categories/distance.svg" },
      { id: "area-length", i18nKey: "sub.location.areaLength", icon: "/icons/categories/ruler.svg" },
      { id: "coordinates", i18nKey: "sub.location.coordinates", icon: "/icons/categories/gps.svg" }
    ]
  },

  {
    id: "legal",
    i18nKey: "categories.legal",
    icon: "/icons/categories/law.svg",
    subCategories: [
      { id: "government-fee", i18nKey: "sub.legal.governmentFee", icon: "/icons/categories/government-fee.svg" },
      { id: "notary-cost", i18nKey: "sub.legal.notaryCost", icon: "/icons/categories/notary.svg" },
      { id: "insurance-rights", i18nKey: "sub.legal.insuranceRights", icon: "/icons/categories/insurance.svg" },
      { id: "mahr-calculator", i18nKey: "sub.legal.mahrCalculator", icon: "/icons/categories/mahr.svg" },
      { id: "arbitration-fee", i18nKey: "sub.legal.arbitrationFee", icon: "/icons/categories/arbitration-fee.svg" }, // Icons till here are correct
      { id: "lawsuit-cost", i18nKey: "sub.legal.lawsuitCost", icon: "/icons/categories/physics.svg" },
      { id: "late-penalty", i18nKey: "sub.legal.latePenalty", icon: "/icons/categories/physics.svg" },
      { id: "expert-fee", i18nKey: "sub.legal.expertFee", icon: "/icons/categories/physics.svg" }
    ]
  },

  {
    id: "health",
    i18nKey: "categories.health",
    icon: "/icons/categories/health.svg",
    subCategories: [
      { id: "bmi", i18nKey: "sub.health.bmi", icon: "/icons/categories/bmi.svg" },
      { id: "ideal-weight", i18nKey: "sub.health.idealWeight", icon: "/icons/categories/weight.svg" },
      { id: "calorie", i18nKey: "sub.health.calorie", icon: "/icons/categories/calorie.svg" },
      { id: "pregnancy", i18nKey: "sub.health.pregnancy", icon: "/icons/categories/baby.svg" },
      { id: "steps-to-km", i18nKey: "sub.health.stepsToKm", icon: "/icons/categories/step.svg" }, // Icons till here are correct
      { id: "bmr", i18nKey: "sub.health.bmr", icon: "/icons/categories/physics.svg" },
      { id: "body-water", i18nKey: "sub.health.bodyWater", icon: "/icons/categories/physics.svg" },
      { id: "protein", i18nKey: "sub.health.protein", icon: "/icons/categories/physics.svg" }
    ]
  },

  {
    id: "numbers",
    i18nKey: "categories.numbers",
    icon: "/icons/categories/number.svg",
    subCategories: [
      { id: "fa-to-en", i18nKey: "sub.numbers.faToEn", icon: "/icons/categories/convert.svg" },
      { id: "en-to-fa", i18nKey: "sub.numbers.enToFa", icon: "/icons/categories/convert.svg" },
      { id: "random-number", i18nKey: "sub.numbers.randomNumber", icon: "/icons/categories/shuffle.svg" },
      { id: "fa-to-cn", i18nKey: "sub.numbers.faToCn", icon: "/icons/categories/chinese.svg" },
      { id: "fa-to-ar", i18nKey: "sub.numbers.faToAr", icon: "/icons/categories/arabic.svg" }
    ]
  }
]

import { CalculatorDefinition } from "./radiology.types"

export const radiologyUnitTypes: CalculatorDefinition[] = [
  /* Radiation – Dose Equivalent */
  {
    id: "radiation-dose-equivalent",
    labelKey: "engineering.radiology.radiation.title",
    kind: "linear",
    baseUnit: "sievert",
    units: [
      { id: "sievert", labelKey: "engineering.radiology.radiation.units.sievert", factor: 1 },
      {
        id: "millisievert",
        labelKey: "engineering.radiology.radiation.units.millisievert",
        factor: 1e-3,
      },
      {
        id: "microsievert",
        labelKey: "engineering.radiology.radiation.units.microsievert",
        factor: 1e-6,
      },
      { id: "rem", labelKey: "engineering.radiology.radiation.units.rem", factor: 0.01 },
      { id: "millirem", labelKey: "engineering.radiology.radiation.units.millirem", factor: 1e-5 },
    ],
  },

  /* Radiation Exposure */
  {
    id: "radiation-exposure",
    labelKey: "engineering.radiology.radiationExposure.title",
    kind: "linear",
    baseUnit: "coulomb-per-kg",
    units: [
      {
        id: "coulomb-per-kg",
        labelKey: "engineering.radiology.radiationExposure.units.cPerKg",
        factor: 1,
      },
      {
        id: "roentgen",
        labelKey: "engineering.radiology.radiationExposure.units.roentgen",
        factor: 2.58e-4,
      },
    ],
  },

  /* Radiation Activity */
  {
    id: "radiation-activity",
    labelKey: "engineering.radiology.radiationActivity.title",
    kind: "linear",
    baseUnit: "becquerel",
    units: [
      {
        id: "becquerel",
        labelKey: "engineering.radiology.radiationActivity.units.becquerel",
        factor: 1,
      },
      {
        id: "kilobecquerel",
        labelKey: "engineering.radiology.radiationActivity.units.kilobecquerel",
        factor: 1e3,
      },
      {
        id: "megabecquerel",
        labelKey: "engineering.radiology.radiationActivity.units.megabecquerel",
        factor: 1e6,
      },
      {
        id: "gigabecquerel",
        labelKey: "engineering.radiology.radiationActivity.units.gigabecquerel",
        factor: 1e9,
      },
      {
        id: "curie",
        labelKey: "engineering.radiology.radiationActivity.units.curie",
        factor: 3.7e10,
      },
      {
        id: "millicurie",
        labelKey: "engineering.radiology.radiationActivity.units.millicurie",
        factor: 3.7e7,
      },
    ],
  },

  /* Radiation – Absorbed Dose */
  {
    id: "radiation-absorbed-dose",
    labelKey: "engineering.radiology.radiationAbsorbedDose.title",
    kind: "linear",
    baseUnit: "gray",
    units: [
      { id: "gray", labelKey: "engineering.radiology.radiationAbsorbedDose.units.gray", factor: 1 },
      {
        id: "milligray",
        labelKey: "engineering.radiology.radiationAbsorbedDose.units.milligray",
        factor: 1e-3,
      },
      {
        id: "microgray",
        labelKey: "engineering.radiology.radiationAbsorbedDose.units.microgray",
        factor: 1e-6,
      },
      {
        id: "rad",
        labelKey: "engineering.radiology.radiationAbsorbedDose.units.rad",
        factor: 0.01,
      },
    ],
  },
]

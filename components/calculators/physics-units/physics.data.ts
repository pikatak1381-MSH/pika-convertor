import { CalculatorDefinition } from "./physics.types"

export const physicsUnitTypes: CalculatorDefinition[] = [
  /* =========================== Linear =========================== */
  // Angular Acceleration
  {
    id: "angular-acceleration",
    labelKey: "engineering.physics.angularAcceleration.title",
    kind: "linear",
    baseUnit: "rad-per-s2",
    units: [
      {
        id: "rad-per-s2",
        labelKey: "engineering.physics.angularAcceleration.units.radPerS2",
        factor: 1,
      },
      {
        id: "deg-per-s2",
        labelKey: "engineering.physics.angularAcceleration.units.degPerS2",
        factor: Math.PI / 180,
      },
      {
        id: "rev-per-s2",
        labelKey: "engineering.physics.angularAcceleration.units.revPerS2",
        factor: 2 * Math.PI,
      },
      {
        id: "rev-per-min2",
        labelKey: "engineering.physics.angularAcceleration.units.revPerMin2",
        factor: (2 * Math.PI) / 3600,
      },
      {
        id: "rpm-per-s",
        labelKey: "engineering.physics.angularAcceleration.units.rpmPerS",
        factor: (2 * Math.PI) / 60,
      },
      {
        id: "rpm-per-min",
        labelKey: "engineering.physics.angularAcceleration.units.rpmPerMin",
        factor: (2 * Math.PI) / 3600,
      },
    ],
  },

  /* Torque */
  {
    id: "torque",
    labelKey: "engineering.physics.torque.title",
    kind: "linear",
    baseUnit: "newton-meter",
    units: [
      { id: "newton-meter", labelKey: "engineering.physics.torque.units.nm", factor: 1 },
      {
        id: "kilogram-force-meter",
        labelKey: "engineering.physics.torque.units.kgfm",
        factor: 9.80665,
      },
      { id: "pound-foot", labelKey: "engineering.physics.torque.units.lbft", factor: 1.355817948 },
      { id: "pound-inch", labelKey: "engineering.physics.torque.units.lbin", factor: 0.112984829 },
    ],
  },

  /* Density */
  {
    id: "density",
    labelKey: "engineering.physics.density.title",
    kind: "linear",
    baseUnit: "kg-per-m3",
    units: [
      { id: "kg-per-m3", labelKey: "engineering.physics.density.units.kgPerM3", factor: 1 },
      { id: "g-per-cm3", labelKey: "engineering.physics.density.units.gPerCm3", factor: 1000 },
      { id: "g-per-ml", labelKey: "engineering.physics.density.units.gPerMl", factor: 1000 },
      {
        id: "lb-per-ft3",
        labelKey: "engineering.physics.density.units.lbPerFt3",
        factor: 16.018463,
      },
    ],
  },

  /* Data Storage */
  {
    id: "data-storage",
    labelKey: "engineering.physics.dataStorage.title",
    kind: "linear",
    baseUnit: "byte",
    units: [
      { id: "bit", labelKey: "engineering.physics.dataStorage.units.bit", factor: 1 / 8 },
      { id: "byte", labelKey: "engineering.physics.dataStorage.units.byte", factor: 1 },

      // Decimal
      { id: "kilobyte", labelKey: "engineering.physics.dataStorage.units.kb", factor: 1_000 },
      { id: "megabyte", labelKey: "engineering.physics.dataStorage.units.mb", factor: 1_000_000 },
      {
        id: "gigabyte",
        labelKey: "engineering.physics.dataStorage.units.gb",
        factor: 1_000_000_000,
      },
    ],
  },

  /* Speed */
  {
    id: "speed",
    labelKey: "engineering.physics.speed.title",
    kind: "linear",
    baseUnit: "m-per-s",
    units: [
      { id: "m-per-s", labelKey: "engineering.physics.speed.units.mps", factor: 1 },
      { id: "km-per-h", labelKey: "engineering.physics.speed.units.kmph", factor: 1 / 3.6 },
      { id: "mile-per-h", labelKey: "engineering.physics.speed.units.mph", factor: 0.44704 },
      { id: "ft-per-s", labelKey: "engineering.physics.speed.units.ftps", factor: 0.3048 },
      { id: "knot", labelKey: "engineering.physics.speed.units.knot", factor: 0.514444 },
    ],
  },

  /* Force */
  {
    id: "force",
    labelKey: "engineering.physics.force.title",
    kind: "linear",
    baseUnit: "newton",
    units: [
      { id: "newton", labelKey: "engineering.physics.force.units.newton", factor: 1 },
      { id: "kilogram-force", labelKey: "engineering.physics.force.units.kgf", factor: 9.80665 },
      { id: "pound-force", labelKey: "engineering.physics.force.units.lbf", factor: 4.448221615 },
    ],
  },

  /* =========================== Affine =========================== */
  // Temperature
  {
    id: "temperature",
    labelKey: "engineering.physics.temperature.title",
    kind: "affine",
    baseUnit: "kelvin",
    units: [
      {
        id: "kelvin",
        labelKey: "engineering.physics.temperature.units.kelvin",
        factor: 1,
        offset: 0,
      },
      {
        id: "celsius",
        labelKey: "engineering.physics.temperature.units.celsius",
        factor: 1,
        offset: 273.15,
      },
      {
        id: "fahrenheit",
        labelKey: "engineering.physics.temperature.units.fahrenheit",
        factor: 5 / 9,
        offset: 459.67,
      },
    ],
  },

  /* =========================== Affine =========================== */
  // Fuel Consumption
  {
    id: "fuelConsumption",
    labelKey: "engineering.physics.fuelConsumption.title",
    kind: "custom",
    baseUnit: "l-per-100km",
    units: [
      { id: "l-per-100km", labelKey: "engineering.physics.fuelConsumption.units.lPer100km" },
      { id: "mpg-us", labelKey: "engineering.physics.fuelConsumption.units.MPG" },
    ],
    convert(value, from, to) {
      if (from === "l-per-100km" && to === "mpg-us") {
        return 235.215 / value
      }
      if (from === "mpg-us" && to === "l-per-100km") {
        return 235.215 / value
      }
      return value
    },
  },
]

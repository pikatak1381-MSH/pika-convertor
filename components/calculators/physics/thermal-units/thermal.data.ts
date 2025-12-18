import { CalculatorDefinition } from "./thermal.types"

export const thermalUnitTypes: CalculatorDefinition[] = [
  /* Temperature Interval */
  {
    id: "temperature-interval",
    labelKey: "engineering.thermal.temperatureInterval.title",
    kind: "linear",
    baseUnit: "kelvin",
    units: [
      { id: "kelvin", labelKey: "engineering.thermal.temperatureInterval.units.kelvin", factor: 1 },
      {
        id: "celsius",
        labelKey: "engineering.thermal.temperatureInterval.units.celsius",
        factor: 1,
      },
      {
        id: "fahrenheit",
        labelKey: "engineering.thermal.temperatureInterval.units.fahrenheit",
        factor: 5 / 9,
      },
    ],
  },

  /* engineering.thermal Resistance */
  {
    id: "engineering.thermal-resistance",
    labelKey: "engineering.thermal.thermalResistance.title",
    kind: "linear",
    baseUnit: "kelvin-per-watt",
    units: [
      {
        id: "kelvin-per-watt",
        labelKey: "engineering.thermal.thermalResistance.units.kPerW",
        factor: 1,
      },
      {
        id: "celsius-per-watt",
        labelKey: "engineering.thermal.thermalResistance.units.cPerW",
        factor: 1,
      },
    ],
  },

  /* Specific Heat Capacity */
  {
    id: "specific-heat-capacity",
    labelKey: "engineering.thermal.specificHeatCapacity.title",
    kind: "linear",
    baseUnit: "joule-per-kg-k",
    units: [
      {
        id: "joule-per-kg-k",
        labelKey: "engineering.thermal.specificHeatCapacity.units.jPerKgK",
        factor: 1,
      },
      {
        id: "kilojoule-per-kg-k",
        labelKey: "engineering.thermal.specificHeatCapacity.units.kjPerKgK",
        factor: 1e3,
      },
      {
        id: "calorie-per-g-c",
        labelKey: "engineering.thermal.specificHeatCapacity.units.calPerGC",
        factor: 4186.8,
      },
    ],
  },

  /* Heat Flux Density */
  {
    id: "heat-flux-density",
    labelKey: "engineering.thermal.heatFluxDensity.title",
    kind: "linear",
    baseUnit: "watt-per-m2",
    units: [
      {
        id: "watt-per-m2",
        labelKey: "engineering.thermal.heatFluxDensity.units.wPerM2",
        factor: 1,
      },
      {
        id: "kilowatt-per-m2",
        labelKey: "engineering.thermal.heatFluxDensity.units.kwPerM2",
        factor: 1e3,
      },
    ],
  },

  /* engineering.thermal Expansion */
  {
    id: "engineering.thermal-expansion",
    labelKey: "engineering.thermal.thermalExpansion.title",
    kind: "linear",
    baseUnit: "per-kelvin",
    units: [
      {
        id: "per-kelvin",
        labelKey: "engineering.thermal.thermalExpansion.units.perK",
        factor: 1,
      },
      {
        id: "per-celsius",
        labelKey: "engineering.thermal.thermalExpansion.units.perC",
        factor: 1,
      },
    ],
  },

  /* engineering.thermal Conductivity */
  {
    id: "engineering.thermal-conductivity",
    labelKey: "engineering.thermal.thermalConductivity.title",
    kind: "linear",
    baseUnit: "watt-per-m-k",
    units: [
      {
        id: "watt-per-m-k",
        labelKey: "engineering.thermal.thermalConductivity.units.wPerMK",
        factor: 1,
      },
      {
        id: "watt-per-m-c",
        labelKey: "engineering.thermal.thermalConductivity.units.wPerMC",
        factor: 1,
      },
    ],
  },

  /* Heat Density */
  {
    id: "heat-density",
    labelKey: "engineering.thermal.heatDensity.title",
    kind: "linear",
    baseUnit: "joule-per-m3",
    units: [
      {
        id: "joule-per-m3",
        labelKey: "engineering.thermal.heatDensity.units.jPerM3",
        factor: 1,
      },
      {
        id: "kilojoule-per-m3",
        labelKey: "engineering.thermal.heatDensity.units.kjPerM3",
        factor: 1e3,
      },
    ],
  },

  /* Heat Transfer Coefficient */
  {
    id: "heat-transfer-coefficient",
    labelKey: "engineering.thermal.heatTransferCoefficient.title",
    kind: "linear",
    baseUnit: "watt-per-m2-k",
    units: [
      {
        id: "watt-per-m2-k",
        labelKey: "engineering.thermal.heatTransferCoefficient.units.wPerM2K",
        factor: 1,
      },
      {
        id: "watt-per-m2-c",
        labelKey: "engineering.thermal.heatTransferCoefficient.units.wPerM2C",
        factor: 1,
      },
    ],
  },

  /* Fuel Efficiency – Mass */
  {
    id: "fuel-efficiency-mass",
    labelKey: "engineering.thermal.fuelEfficiencyMass.title",
    kind: "linear",
    baseUnit: "kg-per-joule",
    units: [
      {
        id: "kg-per-joule",
        labelKey: "engineering.thermal.fuelEfficiencyMass.units.kgPerJ",
        factor: 1,
      },
      {
        id: "kg-per-megajoule",
        labelKey: "engineering.thermal.fuelEfficiencyMass.units.kgPerMJ",
        factor: 1e-6,
      },
    ],
  },

  /* Fuel Efficiency – Volume */
  {
    id: "fuel-efficiency-volume",
    labelKey: "engineering.thermal.fuelEfficiencyVolume.title",
    kind: "linear",
    baseUnit: "m3-per-joule",
    units: [
      {
        id: "m3-per-joule",
        labelKey: "engineering.thermal.fuelEfficiencyVolume.units.m3PerJ",
        factor: 1,
      },
      {
        id: "liter-per-megajoule",
        labelKey: "engineering.thermal.fuelEfficiencyVolume.units.lPerMJ",
        factor: 1e-9,
      },
    ],
  },
]

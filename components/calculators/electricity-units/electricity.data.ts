import { CalculatorDefinition } from "./electricity.types"

export const electricityUnitTypes: CalculatorDefinition[] = [
  /* Electric Charge */
  {
    id: "charge",
    labelKey: "engineering.electricity.charge.title",
    kind: "linear",
    baseUnit: "coulomb",
    units: [
      { id: "coulomb", labelKey: "engineering.electricity.charge.units.coulomb", factor: 1 },
      {
        id: "millicoulomb",
        labelKey: "engineering.electricity.charge.units.millicoulomb",
        factor: 1e-3,
      },
      {
        id: "microcoulomb",
        labelKey: "engineering.electricity.charge.units.microcoulomb",
        factor: 1e-6,
      },
      {
        id: "ampere-hour",
        labelKey: "engineering.electricity.charge.units.ampereHour",
        factor: 3600,
      },
    ],
  },

  /* Electric Current */
  {
    id: "current",
    labelKey: "engineering.electricity.current.title",
    kind: "linear",
    baseUnit: "ampere",
    units: [
      { id: "ampere", labelKey: "engineering.electricity.current.units.ampere", factor: 1 },
      {
        id: "milliampere",
        labelKey: "engineering.electricity.current.units.milliampere",
        factor: 1e-3,
      },
      {
        id: "microampere",
        labelKey: "engineering.electricity.current.units.microampere",
        factor: 1e-6,
      },
    ],
  },

  /* Electric Potential */
  {
    id: "electric-potential",
    labelKey: "engineering.electricity.electricPotential.title",
    kind: "linear",
    baseUnit: "volt",
    units: [
      { id: "volt", labelKey: "engineering.electricity.electricPotential.units.volt", factor: 1 },
      {
        id: "millivolt",
        labelKey: "engineering.electricity.electricPotential.units.millivolt",
        factor: 1e-3,
      },
      {
        id: "kilovolt",
        labelKey: "engineering.electricity.electricPotential.units.kilovolt",
        factor: 1e3,
      },
    ],
  },

  /* Electric Field Strength */
  {
    id: "electric-field-strength",
    labelKey: "engineering.electricity.electricFieldStrength.title",
    kind: "linear",
    baseUnit: "volt-per-meter",
    units: [
      {
        id: "volt-per-meter",
        labelKey: "engineering.electricity.electricFieldStrength.units.vPerM",
        factor: 1,
      },
      {
        id: "kilovolt-per-meter",
        labelKey: "engineering.electricity.electricFieldStrength.units.kvPerM",
        factor: 1e3,
      },
    ],
  },

  /* Electric Resistance */
  {
    id: "electric-resistance",
    labelKey: "engineering.electricity.electricResistance.title",
    kind: "linear",
    baseUnit: "ohm",
    units: [
      { id: "ohm", labelKey: "engineering.electricity.electricResistance.units.ohm", factor: 1 },
      {
        id: "milliohm",
        labelKey: "engineering.electricity.electricResistance.units.milliohm",
        factor: 1e-3,
      },
      {
        id: "kiloohm",
        labelKey: "engineering.electricity.electricResistance.units.kiloohm",
        factor: 1e3,
      },
      {
        id: "megaohm",
        labelKey: "engineering.electricity.electricResistance.units.megaohm",
        factor: 1e6,
      },
    ],
  },

  /* Electric Conductance */
  {
    id: "electric-conductance",
    labelKey: "engineering.electricity.electricConductance.title",
    kind: "linear",
    baseUnit: "siemens",
    units: [
      {
        id: "siemens",
        labelKey: "engineering.electricity.electricConductance.units.siemens",
        factor: 1,
      },
      {
        id: "millisiemens",
        labelKey: "engineering.electricity.electricConductance.units.millisiemens",
        factor: 1e-3,
      },
      {
        id: "microsiemens",
        labelKey: "engineering.electricity.electricConductance.units.microsiemens",
        factor: 1e-6,
      },
    ],
  },

  /* Electric Resistivity */
  {
    id: "electric-resistivity",
    labelKey: "engineering.electricity.electricResistivity.title",
    kind: "linear",
    baseUnit: "ohm-meter",
    units: [
      {
        id: "ohm-meter",
        labelKey: "engineering.electricity.electricResistivity.units.ohmMeter",
        factor: 1,
      },
      {
        id: "ohm-centimeter",
        labelKey: "engineering.electricity.electricResistivity.units.ohmCm",
        factor: 0.01,
      },
    ],
  },

  /* Electric Conductivity */
  {
    id: "electric-conductivity",
    labelKey: "engineering.electricity.electricConductivity.title",
    kind: "linear",
    baseUnit: "siemens-per-meter",
    units: [
      {
        id: "siemens-per-meter",
        labelKey: "engineering.electricity.electricConductivity.units.sPerM",
        factor: 1,
      },
      {
        id: "siemens-per-centimeter",
        labelKey: "engineering.electricity.electricConductivity.units.sPerCm",
        factor: 100,
      },
    ],
  },

  /* Capacitance */
  {
    id: "capacitance",
    labelKey: "engineering.electricity.capacitance.title",
    kind: "linear",
    baseUnit: "farad",
    units: [
      { id: "farad", labelKey: "engineering.electricity.capacitance.units.farad", factor: 1 },
      {
        id: "millifarad",
        labelKey: "engineering.electricity.capacitance.units.millifarad",
        factor: 1e-3,
      },
      {
        id: "microfarad",
        labelKey: "engineering.electricity.capacitance.units.microfarad",
        factor: 1e-6,
      },
      {
        id: "nanofarad",
        labelKey: "engineering.electricity.capacitance.units.nanofarad",
        factor: 1e-9,
      },
      {
        id: "picofarad",
        labelKey: "engineering.electricity.capacitance.units.picofarad",
        factor: 1e-12,
      },
    ],
  },

  /* Inductance */
  {
    id: "inductance",
    labelKey: "engineering.electricity.inductance.title",
    kind: "linear",
    baseUnit: "henry",
    units: [
      { id: "henry", labelKey: "engineering.electricity.inductance.units.henry", factor: 1 },
      {
        id: "millihenry",
        labelKey: "engineering.electricity.inductance.units.millihenry",
        factor: 1e-3,
      },
      {
        id: "microhenry",
        labelKey: "engineering.electricity.inductance.units.microhenry",
        factor: 1e-6,
      },
    ],
  },

  /* Charge Densities */
  {
    id: "linear-charge-density",
    labelKey: "engineering.electricity.linearChargeDensity.title",
    kind: "linear",
    baseUnit: "coulomb-per-meter",
    units: [
      {
        id: "coulomb-per-meter",
        labelKey: "engineering.electricity.linearChargeDensity.units.cPerM",
        factor: 1,
      },
    ],
  },

  {
    id: "surface-charge-density",
    labelKey: "engineering.electricity.surfaceChargeDensity.title",
    kind: "linear",
    baseUnit: "coulomb-per-m2",
    units: [
      {
        id: "coulomb-per-m2",
        labelKey: "engineering.electricity.surfaceChargeDensity.units.cPerM2",
        factor: 1,
      },
    ],
  },

  {
    id: "volume-charge-density",
    labelKey: "engineering.electricity.volumeChargeDensity.title",
    kind: "linear",
    baseUnit: "coulomb-per-m3",
    units: [
      {
        id: "coulomb-per-m3",
        labelKey: "engineering.electricity.volumeChargeDensity.units.cPerM3",
        factor: 1,
      },
    ],
  },

  /* Current Densities */
  {
    id: "linear-current-density",
    labelKey: "engineering.electricity.linearCurrentDensity.title",
    kind: "linear",
    baseUnit: "ampere-per-meter",
    units: [
      {
        id: "ampere-per-meter",
        labelKey: "engineering.electricity.linearCurrentDensity.units.aPerM",
        factor: 1,
      },
    ],
  },

  {
    id: "surface-current-density",
    labelKey: "engineering.electricity.surfaceCurrentDensity.title",
    kind: "linear",
    baseUnit: "ampere-per-m2",
    units: [
      {
        id: "ampere-per-m2",
        labelKey: "engineering.electricity.surfaceCurrentDensity.units.aPerM2",
        factor: 1,
      },
    ],
  },
]

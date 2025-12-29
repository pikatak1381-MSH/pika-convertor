import { CalculatorDefinition } from "./magnetism.types"

export const magnetismUnitsTypes: CalculatorDefinition[] = [
  /* Magnetomotive Force */
  {
    id: "magnetomotive-force",
    labelKey: "engineering.magnetism.magnetomotiveForce.title",
    kind: "linear",
    baseUnit: "ampere-turn",
    units: [
      {
        id: "ampere-turn",
        labelKey: "engineering.magnetism.magnetomotiveForce.units.ampereTurn",
        factor: 1,
      },
      {
        id: "kiloampere-turn",
        labelKey: "engineering.magnetism.magnetomotiveForce.units.kiloampereTurn",
        factor: 1e3,
      },
    ],
  },

  /* Magnetic Flux */
  {
    id: "magnetic-flux",
    labelKey: "engineering.magnetism.magneticFlux.title",
    kind: "linear",
    baseUnit: "weber",
    units: [
      { id: "weber", labelKey: "engineering.magnetism.magneticFlux.units.weber", factor: 1 },
      {
        id: "milliweber",
        labelKey: "engineering.magnetism.magneticFlux.units.milliweber",
        factor: 1e-3,
      },
      {
        id: "microweber",
        labelKey: "engineering.magnetism.magneticFlux.units.microweber",
        factor: 1e-6,
      },
      {
        id: "maxwell",
        labelKey: "engineering.magnetism.magneticFlux.units.maxwell",
        factor: 1e-8,
      },
    ],
  },

  /* Magnetic Field Strength */
  {
    id: "magnetic-field-strength",
    labelKey: "engineering.magnetism.magneticFieldStrength.title",
    kind: "linear",
    baseUnit: "ampere-per-meter",
    units: [
      {
        id: "ampere-per-meter",
        labelKey: "engineering.magnetism.magneticFieldStrength.units.aPerM",
        factor: 1,
      },
      {
        id: "ampere-turn-per-meter",
        labelKey: "engineering.magnetism.magneticFieldStrength.units.atPerM",
        factor: 1,
      },
      {
        id: "oersted",
        labelKey: "engineering.magnetism.magneticFieldStrength.units.oersted",
        factor: 79.5774715,
      },
    ],
  },

  /* Magnetic Flux Density */
  {
    id: "magnetic-flux-density",
    labelKey: "engineering.magnetism.magneticFluxDensity.title",
    kind: "linear",
    baseUnit: "tesla",
    units: [
      { id: "tesla", labelKey: "engineering.magnetism.magneticFluxDensity.units.tesla", factor: 1 },
      {
        id: "millitesla",
        labelKey: "engineering.magnetism.magneticFluxDensity.units.millitesla",
        factor: 1e-3,
      },
      {
        id: "microtesla",
        labelKey: "engineering.magnetism.magneticFluxDensity.units.microtesla",
        factor: 1e-6,
      },
      {
        id: "gauss",
        labelKey: "engineering.magnetism.magneticFluxDensity.units.gauss",
        factor: 1e-4,
      },
    ],
  },
]

import { CalculatorDefinition } from "./fluids.types"

export const fluidsUnitTypes: CalculatorDefinition[] = [
  /* Volumetric Flow */
  {
    id: "flow",
    labelKey: "engineering.fluids.flow.title",
    kind: "linear",
    baseUnit: "m3-per-s",
    units: [
      { id: "m3-per-s", labelKey: "engineering.fluids.flow.units.m3PerS", factor: 1 },
      { id: "m3-per-h", labelKey: "engineering.fluids.flow.units.m3PerH", factor: 1 / 3600 },
      { id: "l-per-s", labelKey: "engineering.fluids.flow.units.lPerS", factor: 1e-3 },
      { id: "l-per-min", labelKey: "engineering.fluids.flow.units.lPerMin", factor: 1e-3 / 60 },
      { id: "gpm-us", labelKey: "engineering.fluids.flow.units.gpmUS", factor: 0.00378541 / 60 },
    ],
  },

  /* Mass Flow */
  {
    id: "mass-flow",
    labelKey: "engineering.fluids.massFlow.title",
    kind: "linear",
    baseUnit: "kg-per-s",
    units: [
      { id: "kg-per-s", labelKey: "engineering.fluids.massFlow.units.kgPerS", factor: 1 },
      { id: "kg-per-h", labelKey: "engineering.fluids.massFlow.units.kgPerH", factor: 1 / 3600 },
      { id: "g-per-s", labelKey: "engineering.fluids.massFlow.units.gPerS", factor: 1e-3 },
      {
        id: "lb-per-h",
        labelKey: "engineering.fluids.massFlow.units.lbPerH",
        factor: 0.453592 / 3600,
      },
    ],
  },

  /* Molar Flow */
  {
    id: "molar-flow",
    labelKey: "engineering.fluids.molarFlow.title",
    kind: "linear",
    baseUnit: "mol-per-s",
    units: [
      { id: "mol-per-s", labelKey: "engineering.fluids.molarFlow.units.molPerS", factor: 1 },
      { id: "mol-per-h", labelKey: "engineering.fluids.molarFlow.units.molPerH", factor: 1 / 3600 },
      {
        id: "kmol-per-h",
        labelKey: "engineering.fluids.molarFlow.units.kmolPerH",
        factor: 1000 / 3600,
      },
    ],
  },

  /* Molar Concentration */
  {
    id: "molar-concentration",
    labelKey: "engineering.fluids.molarConcentration.title",
    kind: "linear",
    baseUnit: "mol-per-m3",
    units: [
      {
        id: "mol-per-m3",
        labelKey: "engineering.fluids.molarConcentration.units.molPerM3",
        factor: 1,
      },
      {
        id: "mol-per-l",
        labelKey: "engineering.fluids.molarConcentration.units.molPerL",
        factor: 1000,
      },
      {
        id: "kmol-per-m3",
        labelKey: "engineering.fluids.molarConcentration.units.kmolPerM3",
        factor: 1000,
      },
    ],
  },

  /* Dynamic Viscosity */
  {
    id: "dynamic-viscosity",
    labelKey: "engineering.fluids.dynamicViscosity.title",
    kind: "linear",
    baseUnit: "pa-s",
    units: [
      { id: "pa-s", labelKey: "engineering.fluids.dynamicViscosity.units.paS", factor: 1 },
      { id: "poise", labelKey: "engineering.fluids.dynamicViscosity.units.poise", factor: 0.1 },
      {
        id: "centipoise",
        labelKey: "engineering.fluids.dynamicViscosity.units.centipoise",
        factor: 0.001,
      },
    ],
  },

  /* Kinematic Viscosity */
  {
    id: "kinematic-viscosity",
    labelKey: "engineering.fluids.kinematicViscosity.title",
    kind: "linear",
    baseUnit: "m2-per-s",
    units: [
      { id: "m2-per-s", labelKey: "engineering.fluids.kinematicViscosity.units.m2PerS", factor: 1 },
      {
        id: "stokes",
        labelKey: "engineering.fluids.kinematicViscosity.units.stokes",
        factor: 1e-4,
      },
      {
        id: "centistokes",
        labelKey: "engineering.fluids.kinematicViscosity.units.centistokes",
        factor: 1e-6,
      },
    ],
  },

  /* Surface Tension */
  {
    id: "surface-tension",
    labelKey: "engineering.fluids.surfaceTension.title",
    kind: "linear",
    baseUnit: "n-per-m",
    units: [
      { id: "n-per-m", labelKey: "engineering.fluids.surfaceTension.units.nPerM", factor: 1 },
      {
        id: "dyn-per-cm",
        labelKey: "engineering.fluids.surfaceTension.units.dynPerCm",
        factor: 0.001,
      },
    ],
  },

  /* Mass Flux Density */
  {
    id: "mass-flux-density",
    labelKey: "engineering.fluids.massFluxDensity.title",
    kind: "linear",
    baseUnit: "kg-per-m2-s",
    units: [
      {
        id: "kg-per-m2-s",
        labelKey: "engineering.fluids.massFluxDensity.units.kgPerM2S",
        factor: 1,
      },
      {
        id: "kg-per-m2-h",
        labelKey: "engineering.fluids.massFluxDensity.units.kgPerM2H",
        factor: 1 / 3600,
      },
    ],
  },

  /* Permeability */
  {
    id: "permeability",
    labelKey: "engineering.fluids.permeability.title",
    kind: "linear",
    baseUnit: "m2",
    units: [
      { id: "m2", labelKey: "engineering.fluids.permeability.units.m2", factor: 1 },
      {
        id: "darcy",
        labelKey: "engineering.fluids.permeability.units.darcy",
        factor: 9.869233e-13,
      },
      {
        id: "millidarcy",
        labelKey: "engineering.fluids.permeability.units.millidarcy",
        factor: 9.869233e-16,
      },
    ],
  },
]

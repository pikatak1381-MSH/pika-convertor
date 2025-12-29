import { CalculatorDefinition } from "./optical.types"

const SPEED_OF_LIGHT = 299_792_458 // m/s

export const opticalUnitTypes: CalculatorDefinition[] = [
  /* Luminance */
  {
    id: "luminance",
    labelKey: "engineering.optics.luminance.title",
    kind: "linear",
    baseUnit: "cd-per-m2",
    units: [
      { id: "cd-per-m2", labelKey: "engineering.optics.luminance.units.cdPerM2", factor: 1 },
      {
        id: "nit",
        labelKey: "engineering.optics.luminance.units.nit",
        factor: 1,
      },
      {
        id: "stilb",
        labelKey: "engineering.optics.luminance.units.stilb",
        factor: 1e4,
      },
    ],
  },

  /* Illuminance */
  {
    id: "illuminance",
    labelKey: "engineering.optics.illuminance.title",
    kind: "linear",
    baseUnit: "lux",
    units: [
      { id: "lux", labelKey: "engineering.optics.illuminance.units.lux", factor: 1 },
      { id: "kilolux", labelKey: "engineering.optics.illuminance.units.kilolux", factor: 1e3 },
      {
        id: "foot-candle",
        labelKey: "engineering.optics.illuminance.units.footCandle",
        factor: 10.76391,
      },
    ],
  },

  /* Luminous Intensity */
  {
    id: "luminous-intensity",
    labelKey: "engineering.optics.luminousIntensity.title",
    kind: "linear",
    baseUnit: "candela",
    units: [
      { id: "candela", labelKey: "engineering.optics.luminousIntensity.units.candela", factor: 1 },
      {
        id: "millicandela",
        labelKey: "engineering.optics.luminousIntensity.units.millicandela",
        factor: 1e-3,
      },
      {
        id: "kilocandela",
        labelKey: "engineering.optics.luminousIntensity.units.kilocandela",
        factor: 1e3,
      },
    ],
  },

  /* Digital Image Resolution */
  {
    id: "digital-image-resolution",
    labelKey: "engineering.optics.digitalImageResolution.title",
    kind: "linear",
    baseUnit: "dpi",
    units: [
      { id: "dpi", labelKey: "engineering.optics.digitalImageResolution.units.dpi", factor: 1 },
      {
        id: "dpcm",
        labelKey: "engineering.optics.digitalImageResolution.units.dpcm",
        factor: 2.54,
      },
      {
        id: "ppmm",
        labelKey: "engineering.optics.digitalImageResolution.units.ppmm",
        factor: 25.4,
      },
    ],
  },

  /* Frequency ↔ Wavelength */
  {
    id: "frequency-wavelength",
    labelKey: "engineering.optics.frequencyWavelength.title",
    kind: "custom",
    baseUnit: "hz",
    units: [
      { id: "hz", labelKey: "engineering.optics.frequencyWavelength.units.hz" },
      { id: "khz", labelKey: "engineering.optics.frequencyWavelength.units.khz" },
      { id: "mhz", labelKey: "engineering.optics.frequencyWavelength.units.mhz" },
      { id: "thz", labelKey: "engineering.optics.frequencyWavelength.units.thz" },
      { id: "meter", labelKey: "engineering.optics.frequencyWavelength.units.meter" },
      { id: "nanometer", labelKey: "engineering.optics.frequencyWavelength.units.nanometer" },
    ],
    convert(value, from, to) {
      const toHz = (v: number, u: string) => {
        if (u === "hz") return v
        if (u === "khz") return v * 1e3
        if (u === "mhz") return v * 1e6
        if (u === "thz") return v * 1e12
        if (u === "meter") return SPEED_OF_LIGHT / v
        if (u === "nanometer") return SPEED_OF_LIGHT / (v * 1e-9)
        return v
      }

      const fromHz = (v: number, u: string) => {
        if (u === "hz") return v
        if (u === "khz") return v / 1e3
        if (u === "mhz") return v / 1e6
        if (u === "thz") return v / 1e12
        if (u === "meter") return SPEED_OF_LIGHT / v
        if (u === "nanometer") return (SPEED_OF_LIGHT / v) * 1e9
        return v
      }

      const hz = toHz(value, from)
      return fromHz(hz, to)
    },
  },
]

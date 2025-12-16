import { CalculatorDefinition } from "./physics.types";

export const physicsUnitTypes: CalculatorDefinition[] = [
    /* Angular Acceleration */
    {
        id: "angular-acceleration",
        labelKey: "physics.angularAcceleration.title",
        kind: "linear",
        baseUnit: "rad-per-s2",
        units: [
            { id: "rad-per-s2", labelKey: "physics.angularAcceleration.units.radPerS2", factor: 1 },
            { id: "deg-per-s2", labelKey: "physics.angularAcceleration.units.degPerS2", factor: Math.PI / 180 },
            { id: "rev-per-s2", labelKey: "physics.angularAcceleration.units.revPerS2", factor: 2 * Math.PI },
            { id: "rev-per-min2", labelKey: "physics.angularAcceleration.units.revPerMin2", factor: (2 * Math.PI) / 3600 },
            { id: "rpm-per-s", labelKey: "physics.angularAcceleration.units.rpmPerS", factor: (2 * Math.PI) / 60 },
            { id: "rpm-per-min", labelKey: "physics.angularAcceleration.units.rpmPerMin", factor: (2 * Math.PI) / 3600 },
        ],
    },

    /* Temperature */
    {
        id: "temperature",
        labelKey: "physics.temperature.title",
        kind: "affine",
        baseUnit: "kelvin",
        units: [
            { id: "kelvin", labelKey: "physics.temperature.units.kelvin", factor: 1, offset: 0 },
            { id: "celsius", labelKey: "physics.temperature.units.celsius", factor: 1, offset: 273.15 },
            { id: "fahrenheit", labelKey: "physics.temperature.units.fahrenheit", factor: 5 / 9, offset: 459.67 },
        ],
    },

    {
        id: "fuelConsumption",
        labelKey: "physics.fuelConsumption.title",
        kind: "custom",
        baseUnit: "l-per-100km",
        units: [
            { id: "l-per-100km", labelKey: "physics.fuelConsumption.units.lPer100km" },
            { id: "mpg-us", labelKey: "physics.fuelConsumption.units.MPG" },
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

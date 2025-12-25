export type BaseSystem = number & { __brand: "BaseSystem" }

export interface BaseOption {
  id: string
  value: BaseSystem
  labelKey: string
}

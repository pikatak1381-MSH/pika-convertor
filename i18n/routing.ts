import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["fa", "en"],
  defaultLocale: "fa",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/convertor": "/convertor",
    "/convertors": "/convertors",
    "/contact": "/contact",
    "/api": "/api",
  },
})

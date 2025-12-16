import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["fa", "en"],
  defaultLocale: "fa",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/[category]": "/[category]",
    "/[category]/[calculator]": "/[category]/[calculator]",
    "/contact": "/contact",
    "/api": "/api",
  },
})

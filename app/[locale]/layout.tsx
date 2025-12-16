import type { Metadata } from "next"
import { Geist } from "next/font/google"
import localFont from "next/font/local"
import "@/style/globals.css"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { locales, localeDirections } from "@/i18n/config"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import Providers from "./Providers"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const yekanBakhFont = localFont({
  src: [
    {
      path: "../../public/fonts/YekanBakhFaNum-VF.woff2",
      weight: "200 300 400 500 600 700 800",
      style: "normal",
    },
  ],
  variable: "--font-yekanbakh",
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Pika Convertor",
  description: "Pikatak's Convertor Web Application",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest"
      },
    ],
  },
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  // Validating locale
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Fetching messages for the current locale
  const direction = localeDirections[locale as keyof typeof localeDirections]

  return (
    <html
      lang={locale}
      dir={direction}
      className={
        locale === "fa" ? `${yekanBakhFont.variable} font-fa` : `${geistSans.variable} font-en`
      }
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <NextIntlClientProvider>
          <Providers>
              <Header />
                <main 
                  className="flex flex-col relative mx-auto w-full max-w-7xl min-h-[calc(100vh-110px)] px-4 pt-27.5 sm:px-6 lg:px-8"
                >
                  <div className="flex-1">
                    {children}
                  </div>
                </main>
              <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

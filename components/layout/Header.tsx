"use client"

import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { useState } from "react"
import { routing } from "@/i18n/routing"
import MegaMenu from "../megaMenu/MegaMenu"

type AppPathnames = keyof typeof routing.pathnames

type NavLink = {
  key: string
  label: string
  href: AppPathnames
}

const Header = () => {
  const t = useTranslations("Header")
  const [activeLink, setActiveLink] = useState("")

  const navLinks: NavLink[] = [
    { href: "/api", label: t("api"), key: "api" },
    { href: "/contact", label: t("contact"), key: "contact" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-header-background text-header-foreground fixed top-0 right-0 left-0 z-50 transition-all duration-500"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-27.5 items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="z-10">
              <Link href="/" className="block">
                <Image
                  className="h-auto w-43.75 object-contain"
                  width={175}
                  height={34}
                  src="/logos/pika-convertor-logo.svg"
                  alt="Pika Convertor Logo"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center md:flex">
              <div className="relative group">
                <button
                  onMouseEnter={() => setActiveLink("convertors")}
                  onMouseLeave={() => setActiveLink("")}
                  className="text-md relative flex items-center gap-2 p-2 font-medium transition-colors duration-300"
                >
                  <Image
                    src="/icons/categories.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="size-full object-contain"
                  />
                  {t("convertors")}
                  <motion.span
                    className="bg-primary absolute right-0 bottom-0 left-0 h-0.5 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: activeLink === "convertors" ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </button>

                <MegaMenu />
              </div>

              <div className="mx-5 h-4 w-px bg-white/60" />

              <div className="flex items-center gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-center"
                  >
                    <Link
                      href={link.href}
                      onMouseEnter={() => setActiveLink(link.key)}
                      onMouseLeave={() => setActiveLink("")}
                      className={`text-md group relative flex items-center px-2 py-2 font-medium transition-colors duration-300`}
                    >
                      {link.label}
                      <motion.span
                        className="bg-primary absolute right-0 bottom-0 left-0 h-0.5 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: activeLink === link.key ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center gap-4">
            <button className="hover:bg-[#d1d5db]/50 h-6 w-6 cursor-pointer rounded-xl transition-colors">
              <Image
                src="/icons/theme-switch.svg"
                alt=""
                width={24}
                height={24}
                className="size-full object-contain"
              />
            </button>

            <button className="h-6 w-6 cursor-pointer">
              <Image
                src="/icons/lang-switch.svg"
                alt=""
                width={24}
                height={24}
                className="size-full object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header

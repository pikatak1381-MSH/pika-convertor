"use client"

import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
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
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const megaMenuButtonRef = useRef<HTMLButtonElement>(null)

  const navLinks: NavLink[] = [
    { href: "/api", label: t("api"), key: "api" },
    { href: "/contact", label: t("contact"), key: "contact" },
  ]

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        megaMenuButtonRef.current &&
        !megaMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMegaMenuOpen(false)
      }
    }

    if (isMegaMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMegaMenuOpen])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const closeMegaMenu = () => {
    setIsMegaMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-header-background text-header-foreground sticky top-0 right-0 left-0 z-50 mx-auto w-full px-2 transition-all duration-500"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-27.5">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="z-10">
              <Link href="/" className="block">
                <Image
                  className="h-auto w-32 object-contain md:w-43.75"
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
              <div className="relative">
                <button
                  ref={megaMenuButtonRef}
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  onMouseEnter={() => {
                    setActiveLink("convertors")
                    setIsMegaMenuOpen(true)
                  }}
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
                      scaleX: activeLink === "convertors" || isMegaMenuOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </button>

                <AnimatePresence>
                  {isMegaMenuOpen && (
                    <MegaMenu ref={megaMenuRef} onClose={closeMegaMenu} onMouseLeave={() => setIsMegaMenuOpen(false)} />
                  )}
                </AnimatePresence>
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
                      href="/"
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
            <button className="h-6 w-6 cursor-pointer rounded-xl transition-colors hover:bg-[#d1d5db]/50">
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

            {/* Mobile Hamburger Menu */}
            <button
              className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-1.5 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0,
                }}
                className="h-0.5 w-5 rounded-full bg-white"
              />
              <motion.span
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                className="h-0.5 w-5 rounded-full bg-white"
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0,
                }}
                className="h-0.5 w-5 rounded-full bg-white"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MegaMenu
            ref={megaMenuRef}
            onClose={closeMobileMenu}
            isMobile
          />
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header

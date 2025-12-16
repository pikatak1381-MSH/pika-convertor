import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

const FOOTER_LINKS = [
  { id: "privacy-policy", i18nKey: "links.privacyPolicy", href: "/" },
  { id: "terms-of-use", i18nKey: "links.termsOfUse", href: "/" },
  { id: "contact-us", i18nKey: "links.contactUs", href: "/" },
  { id: "support-us", i18nKey: "links.supportUs", href: "/" },
]

const Footer = () => {
  const t = useTranslations("Footer")
  return (
    <footer className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="bg-footer-background container mx-auto mt-20 mb-5 flex min-h-[167px] flex-col justify-center rounded-[80px]">
        <div className="mx-auto w-full max-w-md pt-6">
          <p className="pb-5 text-sm font-bold text-black">{t("title")}</p>

          <nav>
            <ul className="text-footer-foreground flex items-center justify-center gap-8">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    href="/"
                    className="hover:text-secondary-foreground text-sm transition-colors"
                  >
                    {t(link.i18nKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <hr className="my-4 border-[#39414D]" />

          <p className="text-foreground text-center">{t("pikaConvertor")}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

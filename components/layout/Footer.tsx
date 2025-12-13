import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

const FOOTER_LINKS = [
      { id: "privacy-policy", i18nKey: "links.privacyPolicy", href: "/" },
      { id: "terms-of-use", i18nKey: "links.termsOfUse", href: "/" },
      { id: "contact-us", i18nKey: "links.contactUs", href: "/" },
      { id: "support-us", i18nKey: "links.supportUs", href: "/" }
]

const Footer = () => {
    const t = useTranslations("Footer")
  return (
    <footer className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
            className="container mx-auto flex flex-col justify-center bg-footer-background min-h-[167px] rounded-[80px] mt-20 mb-5"
        >
            <div className="w-full max-w-md mx-auto pt-6">
                <p className="text-black font-bold text-sm pb-5">
                    {t("title")}
                </p>

                <nav>
                    <ul
                        className="flex items-center justify-center gap-8 text-footer-foreground"
                    >
                        {FOOTER_LINKS.map((link) => (
                            <li key={link.id}>
                                <Link
                                    href="/"
                                    className="hover:text-secondary-foreground transition-colors text-sm"
                                >
                                    {t(link.i18nKey)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <hr className="border-[#39414D] my-4" />

                <p className="text-foreground text-center">
                    {t("pikaConvertor")}
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
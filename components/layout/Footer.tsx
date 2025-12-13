
const Footer = () => {
  return (
    <footer className="container flex flex-col justify-center mx-auto w-full max-w-7xl bg-footer-background min-h-[167px] rounded-[80px] mt-20 mb-5">
        <div
            className="w-full max-w-md mx-auto pt-6"
        >
            <p className="text-black font-bold text-sm">سریع‌ترین پلتفرم تبدیل آنلاین — تبدیل واحد، فایل، تاریخ و ابزارهای کاربردی
            </p>

            <nav>
                <ul
                    className="flex items-center gap-8 text-footer-foreground"
                >
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </nav>

            <hr className="border-[#39414D]" />

            <p className="text-foreground text-center">© 2025 پیکا تبدیل</p>
        </div>
    </footer>
  )
}

export default Footer
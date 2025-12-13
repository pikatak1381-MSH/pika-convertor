import CategoriesSection from "@/components/landing/CategoriesSection"
import HeroSection from "@/components/landing/HeroSection"

const Home = () => {
  return (
    <main className="relative mx-auto w-full max-w-7xl px-4 pt-27.5 sm:px-6 lg:px-8">
      <HeroSection />
      <CategoriesSection />
    </main>
  )
}

export default Home

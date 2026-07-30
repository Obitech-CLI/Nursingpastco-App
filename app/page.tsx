import { HomeHeader } from "./components/headers/HomeHeader";
import { Footer } from "./components/Footer";
import "./page.module.css";
import { Hero } from "@/features/home/components/Hero";
import { Offers } from "@/features/home/components/Offers";
import { InstuitionHero } from "@/features/home/components/InstituitionHero";

function HomePage() {
  return (
    <>
    <HomeHeader />
    <main>
      <Hero />
      <Offers />
      <InstuitionHero />
    </main>
    <Footer />
    </>
  )
}

export default HomePage;
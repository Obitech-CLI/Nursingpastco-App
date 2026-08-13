import { HomeHeader } from "./components/headers/HomeHeader";
import styles from "./page.module.css";
import { Hero } from "@/features/home/components/Hero";
import { Offers } from "@/features/home/components/Offers";
import { InstuitionHero } from "@/features/home/components/InstituitionHero";
import { CheckCircle2, PercentCircle } from "lucide-react";
import { SubOffers } from "@/features/home/components/SubOffers";
import { PublicFooter } from "./components/footers/Public";

function HomePage() {
  return (
    <>
    <HomeHeader />
    <main>
      <Hero />
      <Offers />

      <div className={styles.text1}>
        <h4><CheckCircle2 size={50} color="green" /> verified</h4>
      </div>

      <InstuitionHero />

      <div className={styles.text2}>
        more than<br />
        <span style={{color:"red"}}>200,000</span><br/>
        monthly reads<br />
        from thousands of<br />
        <span style={{color:"lightblue"}}>students</span>
      </div>

      <SubOffers />
    </main>
    <PublicFooter />
    </>
  )
}

export default HomePage;
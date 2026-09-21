import styles from "./page.module.css";
import { Hero } from "@/features/home/components/Hero";
import { Offers } from "@/features/home/components/Offers";
import { InstuitionHero } from "@/features/home/components/InstituitionHero";
import { CheckCircle2 } from "lucide-react";
import { SubOffers } from "@/features/home/components/SubOffers";

function HomePage() {
  return (
    <>
    <main>
      <Hero />
      <Offers />

      <div className={styles.text1}>
        <h4><CheckCircle2 size={50} color="green" /> verified</h4>
      </div>

      <InstuitionHero />

      <SubOffers />
    </main>
    </>
  )
}

export default HomePage;
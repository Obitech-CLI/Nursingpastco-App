import { HomeHeader } from "./components/headers/HomeHeader";
import { Footer } from "./components/Footer";
import "./page.module.css";

function HomePage() {
  return (
    <>
    <HomeHeader />
    <main>
      <h1>homepage</h1>
    </main>
    <Footer />
    </>
  )
}

export default HomePage;
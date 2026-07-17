"use client";
import Image from "next/image";
import styles from "../styles.module.css";
import hero from "@/public/hero.png";

function Hero() {
    return (
        <div className={styles.hero}>
            <span>nursingpastco</span>
            <Image
            src={hero}
            alt=""
            className={styles.image}
            />
            <div>
                all african nursing examination past questions
            </div>
        </div>
    )
}

export { Hero }
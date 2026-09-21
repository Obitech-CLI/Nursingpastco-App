"use client";

import Image from "next/image";
import styles from "../styles.module.css";
import hero from "@/public/hero.png";

function Hero() {

    return (
        <div className={styles.hero}>
            <Image
            src={hero}
            alt=""
            className={styles.image}
            loading="eager"
            />
            <h1>
                study for your nursing level exams with confidence.
            </h1>
        </div>
    )
}

export { Hero }
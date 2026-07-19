"use client";
import Image from "next/image";
import styles from "../styles.module.css";
import hero from "@/public/hero.png";
import Link from "next/link";

function Hero() {
    return (
        <div className={styles.hero}>
            <Image
            src={hero}
            alt=""
            className={styles.image}
            />
            <div>
                study for your nursing level exams with confidence.
            </div>
            <Link href="/">login</Link>
        </div>
    )
}

export { Hero }
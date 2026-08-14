"use client";

import Image from "next/image";
import styles from "../styles.module.css";
import hero from "@/public/hero.png";
import { CreateUserButton } from "@/ui/buttons/Create";

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

            <CreateUserButton />
        </div>
    )
}

export { Hero }
"use client";

import Image from "next/image";
import InstituitionHero from "@/public/InstituitionLogo.jpeg";
import styles from "../styles.module.css";
import Link from "next/link";

function InstuitionHero() {
    return (
        <div className={styles.instituitionHero}>
            <Image
            src={InstituitionHero}
            alt=""
            />
            <div>
                <div>
                    <span>we cover</span>
                    <span>a wide range of</span>
                    <span>nursing instituitions</span>
                    <span>across africa</span>
                </div>
                <Link href="">see available instituition</Link>
            </div>
        </div>
    )
}

export { InstuitionHero }
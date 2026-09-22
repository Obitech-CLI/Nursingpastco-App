"use client";

import Image from "next/image";
import InstituitionHero from "@/public/InstituitionLogo.jpeg";
import styles from "../styles.module.css";
import Link from "next/link";
import { Link2 } from "lucide-react";

function InstuitionHero() {
  return (
    <div className={styles.instituitionHero}>
      <Image src={InstituitionHero} alt="" />
      <div className={styles.text1}>
        <div>
          <span>we cover</span>
          <span>a wide range of</span>
          <span>nursing instituitions</span>
          <span>across africa</span>
        </div>
        <Link href="">see available instituition</Link>
      </div>

      <div className={styles.text2}>
        <div>
          more than
          <br />
          <span style={{ color: "red" }}>200,000</span>
          <br />
          monthly reads
          <br />
          from
          <br />
          <span style={{ color: "lightblue" }}>students</span>
        </div>

        <Link href="">
          available instituitions <Link2 />
        </Link>
      </div>
    </div>
  );
}

export { InstuitionHero };

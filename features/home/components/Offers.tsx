"use client";

import { LibraryBig, Files, PenBox, ClipboardList } from "lucide-react";
import styles from "../styles.module.css";
import Link from "next/link";

function Offers() {
    return (
        <section className={styles.offers}>
            <h4>we <span>offer</span></h4>
            <span>all african nursing</span>
            <div>
                <div>
                    <h3><span><Files size={30} color="red"/></span>past questions</h3>
                    <p>we provide examination past questions from different nursing insttuitions.</p>
                    <Link href="/">past questions</Link>
                </div>
                <div>
                    <h3><span><LibraryBig size={30} color="green"/></span>textbooks</h3>
                    <p>we suggest, recommend and provide adequate study materials.</p>
                    <Link href="/">nursing textbooks</Link>
                </div>
                <div>
                    <h3><span><PenBox size={30} color="blue"/></span>contents</h3>
                    <p>we post updated content about nursing related events like jobs, certifications etc.</p>
                    <Link href="/">nursing contents</Link>
                </div>
            </div>
        </section>
    )
}

export { Offers }
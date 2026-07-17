"use client";

import { LibraryBig, Files, PenBox } from "lucide-react";
import styles from "../styles.module.css";

function Offers() {
    return (
        <section className={styles.offers}>
            <h2>all african nursing</h2>

            <div>
                <div>
                    <span><Files size={25} color="red"/></span>
                    <h3>past questions</h3>
                    <p>we provide examination past questions from different nursing insttuitions.</p>
                </div>
                <div>
                    <span><LibraryBig size={25} color="green"/></span>
                    <h3>textbooks</h3>
                    <p>we suggest, recommend and provide adequate study materials.</p>
                </div>
                <div>
                    <span><PenBox size={25} color="blue"/></span>
                    <h3>contents</h3>
                    <p>we post updated content about nursing related events like jobs, certifications etc.</p>
                </div>
            </div>

            <h3>available to read online</h3>
            <h2>exclusive pdfs</h2>
        </section>
    )
}

export { Offers }
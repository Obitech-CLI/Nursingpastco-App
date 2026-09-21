"use client";

import { LibraryBig, Files, PenBox, ClipboardList, Link2, Newspaper } from "lucide-react";
import styles from "../styles.module.css";
import Link from "next/link";

function Offers() {
    return (
        <section className={styles.offers}>
            <h4>we <span>offer</span></h4>
            <span>all african nursing</span>

            <div>
                <div>
                    <div>
                    <h3><span><Files size={30} color="red"/></span>past questions</h3>
                    <p>we provide examination past questions from different nursing insttuitions.</p>
                    </div>
                    <Link href="/">past questions <Link2 /></Link>
                </div>
                <div>
                    <div>
                    <h3><span><PenBox size={30} color="blue"/></span>contents</h3>
                    <p>we post updated content about nursing related events like jobs, certifications etc.</p>
                    </div>
                    <Link href="/">nursing contents<Link2 /></Link>
                </div>
                <div>
                    <div>
                    <h3><span><Newspaper size={30} color="green"/></span>news & updates</h3>
                    <p>we keep you informed on updates with early information in the nursing fields.</p>
                    </div>
                    <Link href="/">news and updates<Link2 /></Link>
                </div>
                <div>
                    <div>
                    <h3><span><LibraryBig size={30} color="green"/></span>recommendations</h3>
                    <p>we recommend career development and essential tools.</p>
                    </div>
                    <Link href="/recommendations">recommendations<Link2 /></Link>
                </div>
            </div>
        </section>
    )
}

export { Offers }
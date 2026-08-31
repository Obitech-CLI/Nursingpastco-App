"use client";
import { BadgeCheck, Bolt, BookOpen, Brain, CalendarCheck2, ChartColumnIncreasingIcon, ClipboardList, Clock3, FileCheck2, Target, Unlock } from "lucide-react";
import styles from "../styles.module.css";

function SubOffers() {
    return (
        <div className={styles.sub_offers}>
            <section>
            <p>Our site provides verified, legitimate and accurate data to help and guide you
            on your path towards a successful nursing career.</p>
            </section>

            <div>
                <div className={styles.card1}>
                    <h2>study real<br />past questions</h2>
                    <ul>
                        <li>
                            <span><ClipboardList /></span>
                            <h4>exam<br />focused</h4>
                        </li>
                        <li>
                            <span><Brain/></span>
                            <h4>better<br />preparation</h4>
                        </li>
                        <li>
                            <span><ChartColumnIncreasingIcon /></span>
                            <h4>higher<br />success</h4>
                        </li>
                    </ul>
                    <div className={styles.overlay}></div>
                </div>

                <div className={styles.card2}>
                    <h2>accurate nursing<br />study materials</h2>
                    <ul>
                        <li>
                            <span><Target /></span>
                            <h4>accurate<br />notes</h4>
                        </li>
                        <li>
                            <span><BookOpen /></span>
                            <h4>relevant<br />topics</h4>
                        </li>
                        <li>
                            <span><BadgeCheck /></span>
                            <h4>quality<br />textbooks</h4>
                        </li>
                    </ul>
                    <div className={styles.overlay}></div>
                </div>

                <div className={styles.card3}>
                    <h2>get regularly<br />updated contents</h2>
                    <ul>
                        <li>
                            <span><CalendarCheck2 /></span>
                            <h4>frequent<br />updates</h4>
                        </li>
                        <li>
                            <span><FileCheck2 /></span>
                            <h4>accurate<br />and reliable</h4>
                        </li>
                        <li>
                            <span><Clock3 /></span>
                            <h4>stay<br />ahead</h4>
                        </li>
                    </ul>
                    <div className={styles.overlay}></div>
                </div>
            </div>

            <h3><Unlock color="tomato" size={50}/>100% free access</h3>
        </div>
    )
}

export { SubOffers }
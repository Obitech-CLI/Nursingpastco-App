"use client";
import { BadgeCheck, Bolt, BookOpen, Brain, CalendarCheck2, ChartColumnIncreasingIcon, ClipboardList, Clock3, FileCheck2, Target, Unlock } from "lucide-react";
import styles from "../styles.module.css";
import WLogo from "@/public/WhiteLogo.png";
import DLogo from "@/public/DarkLogo.png";
import Image from "next/image";

function SubOffers() {
    return (
        <div className={styles.sub_offers}>
            <section>
            <Image src={DLogo} alt="" width={70} height={40}/>
            <p>Our site provides verified, legitimate and accurate data to help and guide you
            on your path towards a successful nursing career.</p>
            </section>

            <div>
                <div>
                    <h2>study real<br />past questions</h2>
                    <ul>
                        <li>
                            <span><ClipboardList /></span>
                            exam<br />focused
                        </li>
                        <li>
                            <span><Brain/></span>
                            better<br />preparation
                        </li>
                        <li>
                            <span><ChartColumnIncreasingIcon /></span>
                            higher<br />success
                        </li>
                    </ul>
                </div>

                <div>
                    <h2>accurate nursing<br />study materials</h2>
                    <ul>
                        <li>
                            <span><Target /></span>
                            accurate<br />notes
                        </li>
                        <li>
                            <span><BookOpen /></span>
                            relevant<br />topics
                        </li>
                        <li>
                            <span><BadgeCheck /></span>
                            quality<br />textbooks
                        </li>
                    </ul>
                </div>

                <div>
                    <h2>get regularly<br />updated contents</h2>
                    <ul>
                        <li>
                            <span><CalendarCheck2 /></span>
                            frequent<br />updates
                        </li>
                        <li>
                            <span><FileCheck2 /></span>
                            accurate<br />and reliable
                        </li>
                        <li>
                            <span><Clock3 /></span>
                            stay<br />ahead
                        </li>
                    </ul>
                </div>
            </div>

            <h3><Unlock color="tomato" size={50}/>100% free access</h3>
        </div>
    )
}

export { SubOffers }
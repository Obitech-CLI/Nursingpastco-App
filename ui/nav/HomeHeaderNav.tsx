"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../ui.module.css";

function HomeHeaderNav() {

    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        document.body.style.overflow = showNav ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [showNav])

    return (
        <div className={styles.home_header_nav}>
        <button type="button" 
        onClick={() => setShowNav(!showNav)}>
            <span>{!showNav ? <Menu size={20}/> : <X />}</span>
            {/*!showNav ? "menu" : "close"*/}
        </button>
        {showNav && (
            <nav>
               <Link href="/instituitions">instituitions</Link>
               <Link href="/">courses</Link>
               <Link href="/">past questions</Link>
            </nav>
        )}
        </div>
    )
}

export { HomeHeaderNav }
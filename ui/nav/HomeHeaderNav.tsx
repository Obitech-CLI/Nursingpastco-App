"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styles from "../ui.module.css";

function HomeHeaderNav() {

    const [showNav, setShowNav] = useState(false);

    return (
        <div className={styles.home_header_nav}>
        <button type="button" 
        onClick={() => setShowNav(!showNav)}>
            {!showNav ? <Menu/> : <X />}
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
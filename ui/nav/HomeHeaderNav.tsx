"use client";

import Link from "next/link";
import { useState } from "react";

function HomeHeaderNav() {

    const [showNav, setShowNav] = useState(false);

    return (
        <>
        <button type="button" 
        onClick={() => setShowNav(!showNav)}>
            {!showNav ? "open" : "close"}
        </button>
        {showNav && (
            <nav>
               <Link href="/instituitions">instituitions</Link>
               <Link href="/">courses</Link>
               <Link href="/">past questions</Link>
            </nav>
        )}
        </>
    )
}

export { HomeHeaderNav }
"use client";

import { HomeHeaderNav } from "@/ui/nav/HomeHeaderNav";
import Image from "next/image";
import DarkLogo from "@/public/DarkLogo.png";

function HomeHeader() {
    return (
        <header>
        <div className="logo">
            <Image src={DarkLogo} alt="" width={60} height={60} style={{objectFit: "contain"}}/>
            nursingpastco
        </div>
        <HomeHeaderNav />
        </header>
    )
}

export { HomeHeader }
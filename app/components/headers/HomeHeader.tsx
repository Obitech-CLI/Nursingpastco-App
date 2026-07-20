"use client";

import { HomeHeaderNav } from "@/ui/nav/HomeHeaderNav";
import Image from "next/image";
import DarkLogo from "@/public/DarkLogo.png";
import { AppTheme } from "@/ui/Theme";

function HomeHeader() {
    return (
        <header>
        <div className="logo">
            <Image src={DarkLogo} alt="" width={60} height={60} style={{objectFit: "contain"}}/>
            nursingpastco
        </div>
        <div className="navs">
            <AppTheme />
            <HomeHeaderNav />
        </div>
        </header>
    )
}

export { HomeHeader }
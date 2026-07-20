"use client";

import { HomeHeaderNav } from "@/ui/nav/HomeHeaderNav";
import Image from "next/image";
import DarkLogo from "@/public/DarkLogo.png";
import WhiteLogo from "@/public/WhiteLogo.png";
import { AppTheme } from "@/ui/Theme";
import { useTheme } from "next-themes";


function HomeHeader() {

    const { theme } = useTheme();

    console.log(theme)
    return (
        <header>
        <div className="logo">
            {theme !== "dark" ? (
                <Image src={DarkLogo} alt="" width={70} height={70} style={{objectFit: "contain"}}/>
            ) : (
                <Image src={WhiteLogo} alt="" width={70} height={70} style={{objectFit: "contain"}}/>
            )}
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
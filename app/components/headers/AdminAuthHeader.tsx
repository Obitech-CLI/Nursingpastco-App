"use client";

import { AppTheme } from "@/ui/Theme";
import { useTheme } from "next-themes";
import Image from "next/image";
import DarkLogo from "@/public/DarkLogo.png";
import WhiteLogo from "@/public/WhiteLogo.png";

function AdminAuthHeader() {

    const { theme } = useTheme();
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
            </div>
        </header>
    )
}

export { AdminAuthHeader }
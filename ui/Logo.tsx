"use client";

import DarkLogo from "@/public/DarkLogo.png";
import WhiteLogo from "@/public/WhiteLogo.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Logo() {

    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])
    
    if (!mounted) return null;

    return (
        <div className="logo">
            <Image src={theme === "light" ? DarkLogo : WhiteLogo} 
            alt="" width={50} height={50} style={{objectFit: "contain"}}
            />
        </div>
    )
}

function LogoWithName() {

    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])
    
    if (!mounted) return null;
    return (
        <div className="logo">
            <Image src={theme === "light" ? DarkLogo : WhiteLogo} 
            alt="" width={70} height={70} style={{objectFit: "contain"}}
            />
            nursingpastco

        </div>
    )
}

export { Logo, LogoWithName }
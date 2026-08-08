"use client";

import { AppTheme } from "@/ui/Theme";
import { useTheme } from "next-themes";
import Image from "next/image";
import DarkLogo from "@/public/DarkLogo.png";
import WhiteLogo from "@/public/WhiteLogo.png";
import { ArrowBigLeft, ArrowLeft, ChevronDown, ChevronUp, LucideHome, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { LogoWithName } from "@/ui/Logo";
import { useState } from "react";

function AdminManageHeader() {

    const router = useRouter();
    const [showNav, setShowNav] = useState(false);

    return (
        <header>
        <div>
            <div>
                <button type="button" onClick={() => router.back()}>
                <ArrowLeft/>
                </button>
                <LogoWithName />
            </div>
            <div>
                <span onClick={() => setShowNav(!showNav)}>
                     {showNav ? <ChevronDown /> : <ChevronUp />}
                </span>
            </div>
        </div>
        
        {showNav && (
            <nav>
                <div>
                    <LucideHome />
                    <AppTheme />
                    <Search size={25}/>
                </div>
            </nav>
        )}
        </header>
    )
}

export { AdminManageHeader }
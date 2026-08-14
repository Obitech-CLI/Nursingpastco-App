"use client";

import { HomeHeaderNav } from "@/ui/nav/HomeHeaderNav";
import { AppTheme } from "@/ui/Theme";
import { LogoWithName } from "@/ui/Logo";
import { ArrowBigLeft, ArrowLeft, ChevronDown, ChevronUp, LucideHome, Search } from "lucide-react";
import { useState } from "react";
import { LoginUserButton } from "@/ui/buttons/Login";


function PublicHeader() {

    const [showNav, setShowNav] = useState(false);

    return (
        <header>
            <div>
                <div>
                    <ArrowLeft />
                    <LogoWithName />
                </div>
                <div>
                    <button onClick={() => setShowNav(!showNav)}>
                     {showNav ? <ChevronDown /> : <ChevronUp />}
                    </button>
                    <LoginUserButton />
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

export { PublicHeader }
"use client";

import { HomeHeaderNav } from "@/ui/nav/HomeHeaderNav";
import { AppTheme } from "@/ui/Theme";
import { LogoWithName } from "@/ui/Logo";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";


function HomeHeader() {

    const [showNav, setShowNav] = useState(false);

    return (
        <header>
            <div>
                <LogoWithName />
                <div>
                    <button onClick={() => setShowNav(!showNav)}>
                     {showNav ? <ChevronDown /> : <ChevronUp />}
                    </button>
                    <button>login</button>
                </div>
            </div>
    
            {showNav && (
            <nav>
                <div>
                    <HomeHeaderNav />
                    <AppTheme />
                    <Search size={25}/>
                </div>
            </nav>
            )}
        </header>
    )
}

export { HomeHeader }
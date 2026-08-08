"use client";

import { AppTheme } from "@/ui/Theme";
import { LogoWithName } from "@/ui/Logo";
import { ChevronDown, ChevronUp, LucideHome, Search } from "lucide-react";
import { useState } from "react";

function AdminDashHeader() {

    const [showNav, setShowNav] = useState(false);

    return (
        <header>
        <div>
            <div>
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

export { AdminDashHeader }
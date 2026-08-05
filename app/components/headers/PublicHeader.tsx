"use client";

import { HomeHeaderNav } from "@/ui/nav/HomeHeaderNav";
import { AppTheme } from "@/ui/Theme";
import { LogoWithName } from "@/ui/Logo";
import { ArrowBigLeft, ArrowLeft, LucideHome, Search } from "lucide-react";


function PublicHeader() {

    return (
        <header>
            <div>
                <LogoWithName />
                <button>login</button>
            </div>
    
            <nav>
                <ArrowLeft />
                <LucideHome />
                <AppTheme />
                <Search size={25}/>
            </nav>
        </header>
    )
}

export { PublicHeader }
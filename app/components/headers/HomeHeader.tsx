"use client";

import { HomeHeaderNav } from "@/ui/nav/HomeHeaderNav";
import { AppTheme } from "@/ui/Theme";
import { LogoWithName } from "@/ui/Logo";
import { Search } from "lucide-react";


function HomeHeader() {

    return (
        <header>
            <div>
                <LogoWithName />
                <button>login</button>
            </div>
    
            <nav>
                <HomeHeaderNav />
                <AppTheme />
                <Search size={25}/>
            </nav>
        </header>
    )
}

export { HomeHeader }
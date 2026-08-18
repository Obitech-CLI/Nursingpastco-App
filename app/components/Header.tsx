"use client";

import { AppTheme } from "@/ui/Theme";
import { LogoWithName } from "@/ui/Logo";
import { ArrowLeft, ChevronDown, ChevronUp, HomeIcon, Search } from "lucide-react";
import { useState } from "react";
import { LoginUserButton } from "@/ui/buttons/Login";
import { MenuButton } from "@/ui/buttons/Menu";
import { usePathname, useRouter } from "next/navigation";


function Header() {

    const [showNav, setShowNav] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const GoHome = () => {
        if (pathname.startsWith("/admin")) {
            router.replace("/admin/dashboard");
        } else {
            router.replace("/");
        }
    }

    const GoBack = () => {
        router.back();
    }

    return (
        <header>
            <div>
                <LogoWithName />
                <div>
                    <button onClick={() => setShowNav(!showNav)}>
                     {showNav ? <ChevronDown /> : <ChevronUp />}
                    </button>
                    {!pathname.startsWith("/admin") && (
                        <LoginUserButton />
                    )}
                </div>
            </div>
    
            {showNav && (
            <nav>
                <div>
                    {pathname !== "/admin/dashboard" && (
                        <>
                        {pathname !== "/" && (
                            <>
                            <button onClick={GoBack}><ArrowLeft /></button>
                            <button onClick={GoHome}><HomeIcon /></button>
                            </>
                        )}
                        </>
                    )}
                    <MenuButton />
                    <AppTheme />
                    <Search size={25}/>
                </div>
            </nav>
            )}
        </header>
    )
}

export { Header }
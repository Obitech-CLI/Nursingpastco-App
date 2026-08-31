"use client";

import { AppTheme } from "@/ui/Theme";
import { LogoWithName } from "@/ui/Logo";
import { ArrowLeft, ChevronDown, ChevronUp, HomeIcon, Search } from "lucide-react";
import { useState } from "react";
import { LoginUserButton } from "@/ui/buttons/Login";
import { MenuButton } from "@/ui/buttons/Menu";
import { usePathname, useRouter } from "next/navigation";
import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";


function Header() {

    const [showNav, setShowNav] = useState(true);
    const { setShowCreateForm, setShowLoginForm } = UseAuthProvider();
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
        history.back();
        setShowCreateForm(false);
        setShowLoginForm(false);
    }

    return (
        <header>
            <div>
                <LogoWithName />
                <div>
                    <button type="button" className="icon" onClick={() => setShowNav(!showNav)}>
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
                    {pathname !== "/" && (
                        <>
                        {pathname !== "/admin/dashboard" && (
                            <>
                            {pathname !== "/admin/login" && (
                                <>
                                <button className="icon" onClick={GoBack}><ArrowLeft /></button>
                                <button className="icon" onClick={GoHome}><HomeIcon /></button>
                                </>
                            )}
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
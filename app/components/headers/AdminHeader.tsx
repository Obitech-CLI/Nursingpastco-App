"use client";

import { AppTheme } from "@/ui/Theme";
import { useTheme } from "next-themes";
import Image from "next/image";
import DarkLogo from "@/public/DarkLogo.png";
import WhiteLogo from "@/public/WhiteLogo.png";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function AdminManageHeader() {

    const { theme } = useTheme();

    const router = useRouter();

    return (
        <header>
        <div className="logo">
            <button type="button" onClick={() => router.back()}>
               <ArrowLeft/>
            </button>
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

export { AdminManageHeader }
import DarkLogo from "@/public/DarkLogo.png";
import WhiteLogo from "@/public/WhiteLogo.png";
import Image from "next/image";
import { useTheme } from "next-themes";

function Logo() {

    const { theme } = useTheme();

    return (
        <div className="logo">
            {theme !== "dark" ? (
                <Image src={DarkLogo} alt="" width={50} height={50} style={{objectFit: "contain"}}/>
            ) : (
                <Image src={WhiteLogo} alt="" width={50} height={50} style={{objectFit: "contain"}}/>
            )}
        </div>
    )
}

function LogoWithName() {

    const { theme } = useTheme();
    
    return (
        <div className="logo">
            {theme !== "dark" ? (
                <Image src={DarkLogo} alt="" width={60} height={60} style={{objectFit: "contain"}}/>
            ) : (
                <Image src={WhiteLogo} alt="" width={60} height={60} style={{objectFit: "contain"}}/>
            )}
            nursingpastco
        </div>
    )
}

export { Logo, LogoWithName }
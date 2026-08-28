"use client";

import Link from "next/link";
import { FaFacebook, FaTelegram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { BsWhatsapp } from "react-icons/bs";
import { GrWhatsapp } from "react-icons/gr";
import { PiWhatsappLogo, PiWhatsappLogoFill } from "react-icons/pi";
import { RiWhatsappFill } from "react-icons/ri";
import Image from "next/image";
import ObitechLogo from "@/public/Obitech Logo.png";

function Footer() {

    const date = new Date();
    const year = date.getFullYear();

    const pathname = usePathname();

    return (
            <footer>
            {!pathname.startsWith("/admin") && (
                <div className="info">
                    <nav>
                        <Link href="/about">about us</Link>
                        <Link href="/contact">contact us</Link>
                        <Link href="/terms">terms / conditions</Link>
                        <Link href="/privacy">privacy / policies</Link>
                    </nav>
                    <div className="sponsor">
                        <span>powered by<br /><em>obitech</em></span>
                        <Image alt="" src={ObitechLogo} width={60} height={60}/>
                    </div>
                    <div>
                        <p>Disclaimer: We are an independent resource and not affiliated with any official nursing body. Materials are for study purposes only.</p>
                        <p style={{margin: "0.5rem 0"}}>&copy; nursingpastco {year}</p>
                    </div>
                </div>
            )}

            {!pathname.startsWith("/admin") ? (
                <>
                <div className="socials">
                   <span>20.1k</span>
                   <div>
                      <Link href=""><FaTiktok size={25} color="#000000"/></Link>
                      <Link href=""><FaYoutube size={25} color="red"/></Link>
                      <Link href=""><FaWhatsapp size={25} color="#00ff00"/></Link>
                   </div>
                </div>
                </>
            ) : (
                <div className="footer">
                <p>&copy; nursingpastco {year}</p>
                </div>
            )}
            </footer>
    )
}

export { Footer }
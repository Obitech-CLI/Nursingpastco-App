"use client";

import Link from "next/link";
import { FaFacebook, FaTelegram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { BsWhatsapp } from "react-icons/bs";
import { GrWhatsapp } from "react-icons/gr";
import { PiWhatsappLogoFill } from "react-icons/pi";
import { RiWhatsappFill } from "react-icons/ri";

function Footer() {

    const date = new Date();
    const year = date.getFullYear();

    const pathname = usePathname();

    return (
            <footer>
            {!pathname.startsWith("/admin") ? (
                <>
                <p>&copy; nursingpastco {year}</p>
                <div className="socials">
                   <span>20.1k</span>
                   <div>
                      <Link href=""><RiWhatsappFill size={30} color="#00ff00"/></Link>
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
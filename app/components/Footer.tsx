"use client";

import Link from "next/link";
import { FaFacebook, FaTelegram, FaTiktok, FaYoutube } from "react-icons/fa";
import { usePathname } from "next/navigation";

function Footer() {

    const date = new Date();
    const year = date.getFullYear();

    const pathname = usePathname();

    return (
            <footer>
            <div className="footer">
                <p style={{
                    marginBottom: (!pathname.startsWith("/admin") || !pathname.startsWith("/user")) ?
                    "1rem" : ""
                }}>&copy; nursingpastco {year}</p>
            </div>
            {(!pathname.startsWith("/admin") || !pathname.startsWith("/user")) && (
                <div className="socials">
                   <span>20.1k</span>
                   <div>
                      <Link href=""><FaFacebook size={25} color="#1877f2"/></Link>
                      <Link href=""><FaTiktok size={20} color="#000000"/></Link>
                      <Link href=""><FaYoutube size={30} color="#ff0000"/></Link> 
                   </div>
                </div>
            )}
            </footer>
    )
}

export { Footer }
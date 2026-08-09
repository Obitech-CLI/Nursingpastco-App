"use client";

import Link from "next/link";
import { FaFacebook, FaTelegram, FaTiktok } from "react-icons/fa";

function PublicFooter() {

    return (
        <footer className="public">
            <span>
                20.1k
            </span>
 
            <div className="socials">
                <Link href=""><FaFacebook size={25} color="#1877f2"/></Link>
                <Link href=""><FaTiktok size={20} color="#000000"/></Link>
                <Link href=""><FaTelegram size={25} color="#229ed9"/></Link> 
            </div>
        </footer>
    )
}

export { PublicFooter }
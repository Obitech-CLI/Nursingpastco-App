"use client";

import { useMenu } from "@/contexts/modals/MenuContext";
import Link from "next/link";
import styles from "../ui.module.css";
import { usePathname } from "next/navigation";
import { File, Heading, School, Sheet } from "lucide-react";

function MenuModal() {

    const { showMenu, setShowMenu } = useMenu();

    const pathname = usePathname();

    {/*closes the menu modal on link navigation */}
    const ResetMenu = () => {
        setShowMenu(false);
    }

    return (
        <>
        {showMenu && (
            <>
            <nav className={styles.menu}>
               {pathname !== "/instituitions" && (
                <Link onClick={ResetMenu} href="/instituitions"><School size={30}/>instituitions</Link>
               )}
               {pathname !== "/courses" && (
                <Link onClick={ResetMenu} href="/courses"><Sheet size={30}/>courses</Link>
               )}
               {pathname !== "/past-questions" && (
                <Link onClick={ResetMenu} href="/past-questions"><File size={30}/>past questions</Link>
               )}
            </nav>
            <div className={styles.overlay}></div>
            </>
        )}
        </>
    )
}

export { MenuModal }
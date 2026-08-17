"use client";

import { useMenu } from "@/contexts/modals/MenuContext";
import Link from "next/link";
import styles from "../ui.module.css";
import { usePathname } from "next/navigation";

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
            <nav className={styles.menu}>
               {pathname !== "/instituitions" && (
                <Link onClick={ResetMenu} href="/instituitions">instituitions</Link>
               )}
               {pathname !== "/courses" && (
                <Link onClick={ResetMenu} href="/courses">courses</Link>
               )}
               {pathname !== "/past-questions" && (
                <Link onClick={ResetMenu} href="/past-questions">past questions</Link>
               )}
               {pathname !== "" && (
                <Link onClick={ResetMenu} href="/contents">contents</Link>
               )}
            </nav>
        )}
        </>
    )
}

export { MenuModal }
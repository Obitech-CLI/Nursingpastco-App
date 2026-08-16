"use client";

import { useMenu } from "@/contexts/modals/MenuContext";
import Link from "next/link";
import styles from "../ui.module.css";

function MenuModal() {

    const { showMenu, setShowMenu } = useMenu();

    {/*closes the menu modal on link navigation */}
    const ResetMenu = () => {
        setShowMenu(false);
    }

    return (
        <>
        {showMenu && (
            <nav className={styles.menu}>
               <Link onClick={ResetMenu} href="/instituitions">instituitions</Link>
               <Link onClick={ResetMenu} href="/courses">courses</Link>
               <Link onClick={ResetMenu} href="/">past questions</Link>
            </nav>
        )}
        </>
    )
}

export { MenuModal }
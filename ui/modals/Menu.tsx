"use client";

import { useMenu } from "@/contexts/modals/MenuContext";
import Link from "next/link";
import styles from "../ui.module.css";
import { usePathname } from "next/navigation";
import { BadgeCheck, BookOpen, ClipboardList, FileText, InboxIcon, RefreshCw, School, Settings2, Settings2Icon, User2, UserCheck2 } from "lucide-react";

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
               <>
               {(!pathname.startsWith("/admin")) && (
                <>
                <Link onClick={ResetMenu} href="/instituitions" 
                className={pathname === "/instituitions" ? "active" : ""}>
                   <span><School size={25}/></span>instituitions
                </Link>

                <Link onClick={ResetMenu} href="/courses"
                className={pathname === "/courses" ? "active" : ""}>
                   <span><BookOpen size={25}/></span>courses
                </Link>

                <Link onClick={ResetMenu} href="/past-questions"
                className={pathname === "/past-questions" ? "active" : ""}>
                   <span><ClipboardList size={25}/></span>past questions
                </Link>

                <Link onClick={ResetMenu} href="/contents"
                className={pathname === "/contents" ? "active" : ""}>
                   <span><FileText size={25}/></span>contents
                </Link>

                <Link onClick={ResetMenu} href="/news"
                className={pathname === "/news" ? "active" : ""}>
                   <span><RefreshCw size={25}/></span>news / updates
                </Link>

                <Link onClick={ResetMenu} href="/recommendations"
                className={pathname === "/recommendations" ? "active" : ""}>
                   <span><BadgeCheck size={25}/></span>recommendations
                </Link>

                </>
               )}

               {pathname.startsWith("/admin") && (
                <>
                <Link onClick={ResetMenu} href="/admin/profile"
                className={pathname === "/admin/profile" ? "active" : ""}>
                  <User2 size={25}/>my profile
                </Link>

                <Link onClick={ResetMenu} href="/admin/manage/subscribers"
                className={pathname === "/admin/manage/subscribers" ? "active" : ""}>
                  <UserCheck2 size={25}/>subscribers
                </Link>
                </>
               )}

               </>
            </nav>
            <div className={styles.overlay}></div>
            </>
        )}
        </>
    )
}

export { MenuModal }
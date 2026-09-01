"use client";

import { useMenu } from "@/contexts/modals/MenuContext";
import Link from "next/link";
import styles from "../ui.module.css";
import { usePathname } from "next/navigation";
import { File, Heading, InboxIcon, School, Settings2, Settings2Icon, Sheet, User2 } from "lucide-react";
import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { useState } from "react";
import { CreateUserType } from "@/types/user";
import { UseUser } from "@/contexts/user/UserProvider";

function MenuModal() {

    const { user } = UseUser();

    const { showMenu, setShowMenu } = useMenu();
    const { setShowCreateForm, setShowLoginForm } = UseAuthProvider();

    const pathname = usePathname();

    {/*closes the menu modal on link navigation */}
    const ResetMenu = () => {
        setShowMenu(false);
        setShowCreateForm(false)
        setShowLoginForm(false);
    }

    return (
        <>
        {showMenu && (
            <>
            <nav className={styles.menu}>
               <>
                {user && (
                    <>
                    <Link onClick={ResetMenu} href="/user/profile" 
                    className={pathname === "/user/profile" ? "active" : ""}>
                        <span><User2 size={25}/></span>my profile
                    </Link>

                    <Link onClick={ResetMenu} href="/user/setting" 
                    className={pathname === "/user/setting" ? "active" : ""}>
                        <span><Settings2Icon size={25}/></span>settings
                    </Link>
                    </>
                )}

               {(!pathname.startsWith("/admin")) && (
                <>

                <Link onClick={ResetMenu} href="/instituitions" 
                className={pathname === "/instituitions" ? "active" : ""}>
                   <span><School size={25}/></span>instituitions
                </Link>

                <Link onClick={ResetMenu} href="/courses"
                className={pathname === "/courses" ? "active" : ""}>
                   <span><Sheet size={25}/></span>courses
                </Link>

                <Link onClick={ResetMenu} href="/past-questions"
                className={pathname === "/past-questions" ? "active" : ""}>
                   <span><File size={25}/></span>past questions
                </Link>

                </>
               )}

               {pathname.startsWith("/admin") && (
                <>
                <Link href=""><User2 />my profile</Link>
                <Link href=""><Settings2 />settings</Link>
                <Link href=""><InboxIcon />messages</Link>
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
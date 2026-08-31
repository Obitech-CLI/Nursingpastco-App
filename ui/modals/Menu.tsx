"use client";

import { useMenu } from "@/contexts/modals/MenuContext";
import Link from "next/link";
import styles from "../ui.module.css";
import { usePathname } from "next/navigation";
import { File, Heading, InboxIcon, School, Settings2, Sheet, User2 } from "lucide-react";
import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";

function MenuModal() {

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

               {(!pathname.startsWith("/admin")) && (
                <>
                {(!pathname.startsWith("/user")) && (
                    <>
                    {pathname !== "/instituitions" && (
                     <Link onClick={ResetMenu} href="/instituitions"><School size={30}/>instituitions</Link>
                    )}
                    {pathname !== "/courses" && (
                    <Link onClick={ResetMenu} href="/courses"><Sheet size={30}/>courses</Link>
                    )}
                   {pathname !== "/past-questions" && (
                   <Link onClick={ResetMenu} href="/past-questions"><File size={30}/>past questions</Link>
                   )}
                    </>
                )}
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
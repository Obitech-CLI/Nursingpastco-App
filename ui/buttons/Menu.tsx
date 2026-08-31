"use client";

import { useMenu } from "@/contexts/modals/MenuContext";
import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { Menu, X } from "lucide-react";
import { useEffect } from "react";

function MenuButton() {

    const { showMenu, setShowMenu } = useMenu();
    const { setShowLoginForm, setShowCreateForm } = UseAuthProvider();

    useEffect(() => {
        document.body.style.overflow = showMenu ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [showMenu])

    return (
        <button className="icon" type="button" 
        onClick={() => {
            setShowMenu(!showMenu);
            setShowCreateForm(false);
            setShowLoginForm(false);

        }}>
            <span>{!showMenu ? <Menu size={25}/> : <X />}</span>
        </button>
    )
}

export { MenuButton }
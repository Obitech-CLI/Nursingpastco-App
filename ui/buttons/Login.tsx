"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { useEffect } from "react";
import styles from "../ui.module.css";

function LoginUserButton() {

    const { showLoginForm, setShowLoginForm } = UseAuthProvider();
    
        useEffect(() => {
            document.body.style.overflow = showLoginForm ? "hidden" : "auto";
        
            return () => {
                    document.body.style.overflow = "auto";
                }
        }, [showLoginForm])

    return (
        <button onClick={() => setShowLoginForm(true)} className="open">
            login
        </button>
    )
}

export { LoginUserButton }
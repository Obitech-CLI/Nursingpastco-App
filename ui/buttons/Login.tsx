"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { useEffect } from "react";

function LoginUserButton() {

    const { showLoginForm, setShowLoginForm } = UseAuthProvider();
    
        useEffect(() => {
            document.body.style.overflow = showLoginForm ? "hidden" : "auto";
        
            return () => {
                    document.body.style.overflow = "auto";
                }
        }, [showLoginForm])

    return (
        <button onClick={() => setShowLoginForm(true)}>
            login
        </button>
    )
}

export { LoginUserButton }
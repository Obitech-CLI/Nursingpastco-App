"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { CreateUserType } from "@/types/user";
import { useEffect, useState } from "react";

function LoginUserButton() {

    const [user] = useState<CreateUserType | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    })

    const { showLoginForm, setShowLoginForm } = UseAuthProvider();
    
        useEffect(() => {
            document.body.style.overflow = showLoginForm ? "hidden" : "auto";
        
            return () => {
                    document.body.style.overflow = "auto";
                }
        }, [showLoginForm])

    if (user) return (
        <div>
            {user.firstname.slice(0, 1).toUpperCase()}
            {user.lastname.slice(0, 1).toUpperCase()}
        </div>
    )

    return (
        <button onClick={() => setShowLoginForm(true)} className="open">
            login
        </button>
    )
}

export { LoginUserButton }
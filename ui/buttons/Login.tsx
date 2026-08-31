"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { UseUser } from "@/contexts/user/UserProvider";
import { useEffect, useState } from "react";

function LoginUserButton() {

    const { user } = UseUser();


    const { showLoginForm, setShowLoginForm } = UseAuthProvider();
    
        useEffect(() => {
            document.body.style.overflow = showLoginForm ? "hidden" : "auto";
        
            return () => {
                    document.body.style.overflow = "auto";
                }
        }, [showLoginForm])

    return (
        <>
        {!user ? (
            <button onClick={() => setShowLoginForm(true)} className="open">
              login
            </button>
        ) : (
            <div className="head-user">
                {user.firstname.slice(0, 1).toUpperCase()}
                {user.lastname.slice(0, 1).toUpperCase()}
            </div>
        )}
        </>
    )
}

export { LoginUserButton }
"use client";

import { LoginUserForm } from "@/features/user/auth/components/LoginForm";
import styles from "../auth.module.css";
import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { X } from "lucide-react";
import { useEffect } from "react";

function LoginUser() {

    const { showLoginForm, setShowCreateForm, setShowLoginForm } = UseAuthProvider();

    useEffect(() => {
                    document.body.style.overflow = showLoginForm ? "hidden" : "auto";
                
                    if (!showLoginForm) {
                        return () => {
                            document.body.style.overflow = "auto";
                        }
                    }
                }, [showLoginForm])

    return (
        <>
        {showLoginForm && (
            <div className={styles.user_auth}>
                <button onClick={() => {
                setShowLoginForm(false);
                setShowCreateForm(false);
               }}>
                <X />
               </button>
               <LoginUserForm />
            </div>
        )}
        </>
    )
}

export default LoginUser;
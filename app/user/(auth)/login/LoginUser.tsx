"use client";

import { LoginUserForm } from "@/features/user/auth/components/LoginForm";
import styles from "../auth.module.css";
import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { X } from "lucide-react";

function LoginUser() {

    const { showLoginForm, setShowCreateForm, setShowLoginForm } = UseAuthProvider();

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
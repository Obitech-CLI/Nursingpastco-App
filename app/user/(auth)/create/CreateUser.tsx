"use client";

import styles from "../auth.module.css";
import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { CreateUserForm } from "@/features/user/auth/components/CreateForm";
import { X } from "lucide-react";
import { useEffect } from "react";

function CreateUser() {

    const { showCreateForm, setShowCreateForm, setShowLoginForm } = UseAuthProvider();

    useEffect(() => {
                    document.body.style.overflow = showCreateForm ? "hidden" : "auto";
                
                    return () => {
                            document.body.style.overflow = "auto";
                        }
                }, [showCreateForm])
    
    return (
        <>
        {showCreateForm && (
            <div className={styles.user_auth}>
                <button onClick={() => {
                setShowLoginForm(false);
                setShowCreateForm(false);
               }}>
                <X />
               </button>
               <CreateUserForm />
            </div>
        )}
        </>
    )
}

export default CreateUser;
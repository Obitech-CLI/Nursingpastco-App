"use client";

import styles from "../auth.module.css";
import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { CreateUserForm } from "@/features/user/auth/components/CreateForm";
import { X } from "lucide-react";

function CreateUser() {

    const { showCreateForm, setShowCreateForm, setShowLoginForm } = UseAuthProvider();
    
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
"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { useEffect } from "react";

function CreateUserButton() {

    const { showCreateForm, setShowCreateForm } = UseAuthProvider();

    useEffect(() => {
        document.body.style.overflow = showCreateForm ? "hidden" : "auto";
    
        return () => {
                document.body.style.overflow = "auto";
            }
    }, [showCreateForm])

    return (
        <button onClick={() => setShowCreateForm(true)}>
            join community
        </button>
    )
}

export { CreateUserButton }
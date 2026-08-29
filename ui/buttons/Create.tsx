"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { Users } from "lucide-react";
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
        <button className="open" onClick={() => setShowCreateForm(true)}>
            join community <Users />
        </button>
    )
}

export { CreateUserButton }
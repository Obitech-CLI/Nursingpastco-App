"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { UseUser } from "@/contexts/user/UserProvider";
import { UseFetch } from "@/hooks/useFetch";
import { InstituitionDataTypes } from "@/types/types";
import { CreateUserType } from "@/types/user";
import { Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function CreateUserButton() {

    const { user } = UseUser();

    const { showCreateForm, setShowCreateForm } = UseAuthProvider();
    
    useEffect(() => {
        document.body.style.overflow = showCreateForm ? "hidden" : "auto";
    
        return () => {
                document.body.style.overflow = "auto";
            }
    }, [showCreateForm])

    return (
        <>
        {!user && (
            <button className="open" onClick={() => setShowCreateForm(true)}>
            join community <Users />
            </button>
        )}
        </>
    )
}

export { CreateUserButton }
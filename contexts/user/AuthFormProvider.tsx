"use client";

import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

type ContextProps = {
    showCreateForm: boolean;
    showLoginForm: boolean;
    setShowCreateForm: React.Dispatch<SetStateAction<boolean>>;
    setShowLoginForm: React.Dispatch<SetStateAction<boolean>>;
}

const AuthFormContext = createContext<ContextProps | null>(null);

function AuthFormProvider({children}:{children:ReactNode}) {

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);

    return (
        <AuthFormContext.Provider value={{
            showCreateForm, showLoginForm, setShowCreateForm, setShowLoginForm
        }}>
            {children}
        </AuthFormContext.Provider>
    )
}

export const UseAuthProvider = () =>
{
    const context = useContext(AuthFormContext);
    if (!context) {
        throw new Error("no context available");
    }

    return context;
}

export { AuthFormProvider }
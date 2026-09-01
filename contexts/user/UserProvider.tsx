"use client"

import UserAuth from "@/lib/user/user.auth";
import { UserType } from "@/types/user";
import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type ContextType = {
    user: UserType | null;
    setUser: React.Dispatch<SetStateAction<UserType | null>>;
}

const UserContext = createContext<ContextType | null>(null);

function UserProvider({children}:{children:ReactNode}) {

    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const getUser = async () =>
            {
                const user = await UserAuth();
                if (!user) {
                    alert("no user")
                }
                setUser(user);
            }
            getUser();
    }, [])

    return (
        <UserContext.Provider value={{
            user, setUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const UseUser = () =>
{
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("no context available");
    }

    return context;
}

export { UserProvider }
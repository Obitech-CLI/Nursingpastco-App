"use client";

import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

interface ShowProps {
    add: boolean;
    view: boolean;
}

type ContextProps = {
    navManageInstituitions: ShowProps;
    setNavManageInstituitions: React.Dispatch<SetStateAction<ShowProps>>;
    navManageCourses: ShowProps;
    setNavManageCourses: React.Dispatch<SetStateAction<ShowProps>>;
}

const ManageNavContext = createContext<ContextProps | null>(null);

function ManageNavProvider({children}:{children: ReactNode}) {

    const [navManageInstituitions, setNavManageInstituitions] = useState({
        add: false,
        view: false,
    });

    const [navManageCourses, setNavManageCourses] = useState({
        add: false,
        view: false,
    });



    return (
        <ManageNavContext.Provider value={{
            navManageInstituitions, setNavManageInstituitions,
            navManageCourses, setNavManageCourses
        }}>
            {children}
        </ManageNavContext.Provider>
    )
}

export const UseManageNav = () =>
{
    const context = useContext(ManageNavContext);
    if (!context) {
        throw new Error("no context available");
    }

    return context;
}

export { ManageNavProvider }
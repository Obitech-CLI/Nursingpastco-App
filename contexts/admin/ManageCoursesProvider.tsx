"use client";

import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

interface ShowProps {
    add: boolean;
    view: boolean;
}

type ContextProps = {
    show: ShowProps;
    setShow: React.Dispatch<SetStateAction<ShowProps>>
}

const ManageCoursesContext = createContext<ContextProps | null>(null);

function ManageCoursesProvider({children}:{children: ReactNode}) {

    const [show, setShow] = useState({
        add: false,
        view: false
    });

    return (
        <ManageCoursesContext.Provider value={{
            show, setShow
        }}>
            {children}
        </ManageCoursesContext.Provider>
    )
}

export const UseManageCourses = () =>
{
    const context = useContext(ManageCoursesContext);
    if (!context) {
        throw new Error("no context available");
    }

    return context;
}

export { ManageCoursesProvider }
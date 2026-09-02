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
    navManagePastQuestions: ShowProps;
    setNavManagePastQuestions: React.Dispatch<SetStateAction<ShowProps>>;
    navManageContents: ShowProps;
    setNavManageContents: React.Dispatch<SetStateAction<ShowProps>>;
    navManageNews: ShowProps;
    setNavManageNews: React.Dispatch<SetStateAction<ShowProps>>;
    navManageRecommend: ShowProps;
    setNavManageRecommend: React.Dispatch<SetStateAction<ShowProps>>;
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

    const [navManagePastQuestions, setNavManagePastQuestions] = useState({
        add: false,
        view: false,
    });

    const [navManageContents, setNavManageContents] = useState({
        add: false,
        view: false,
    });

    const [navManageNews, setNavManageNews] = useState({
        add: false,
        view: false,
    });

    const [navManageRecommend, setNavManageRecommend] = useState({
        add: false,
        view: false,
    });

    return (
        <ManageNavContext.Provider value={{
            navManageInstituitions, setNavManageInstituitions,
            navManageCourses, setNavManageCourses,
            navManagePastQuestions, setNavManagePastQuestions,
            navManageContents, setNavManageContents,
            navManageNews, setNavManageNews,
            navManageRecommend, setNavManageRecommend
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
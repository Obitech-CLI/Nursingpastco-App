"use client";

import { SelectLevel } from "@/features/public/components/SelectLevel";
import { UseFetch } from "@/hooks/useFetch";
import { CourseDataTypes, InstituitionDataTypes } from "@/types/types";
import { LevelOptions } from "@/ui/AppContent";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

interface SearchDataTypes {
    instituition: string;
    level: string;
}

type Props = {
    searchData: SearchDataTypes;
    setSearchData: React.Dispatch<SetStateAction<SearchDataTypes>>
    search: () => void;
    loading: boolean;
}

function SearchCourses({searchData, setSearchData, search, loading}:Props) {

    const [instituitions, setInstituitions] = useState<InstituitionDataTypes[]>([]);


    const [showLevels, setShowLevels] = useState(false);
    const [showInstituitions, setShowInstituitions] = useState(false);

    const fetctInstituitions = UseFetch();

    const [reloadInstituitions, setReloadInstituitions] = useState(0);

    const HandleFetch = async () =>
    {
        const res = await fetctInstituitions.Fetch("/instituitions");
        if (res) {
            if (res.success) {
                setInstituitions(res.instituitions);
            }
        }
    }

    useEffect(() => {
        HandleFetch();
    }, [reloadInstituitions]);

    return (
        <fieldset>
            <legend>search</legend>

            <div onClick={() => setShowInstituitions(!showInstituitions)}>
                {!searchData.instituition ? "instituitions" : searchData.instituition}

                {instituitions.length === 0 && !fetctInstituitions.loading ? (
                    <button onClick={() => {
                        setReloadInstituitions(prev => prev + 1);
                    }}>
                        {!fetctInstituitions.loading ? "reload" : <ClipLoader size={15}/>}
                    </button>
                ) : (null)}

                {showInstituitions && (
                <>
                {instituitions && instituitions.length > 0 ? (
                    <ul>
                        {instituitions.map(instituition => (
                            <li key={instituition.id} onClick={() => {
                                setSearchData(prev => ({...prev, instituition: instituition.instituition_name}));
                            }}>
                                {instituition.instituition_name}
                            </li>
                        ))}
                    </ul>
                ) : (null)}
                </>
                )}
            </div>

            <div onClick={() => setShowLevels(!showLevels)}>
                    {!searchData.level ? "select level" : searchData.level}
                    {showLevels && (
                    <ul>
                        {LevelOptions.map(level => (
                            <li key={level.id} onClick={() => {
                                setSearchData(prev => ({...prev, level: level.level}));
                                setShowLevels(!showLevels);
                            }}>
                                {level.level}
                            </li>
                        ))}
                    </ul>
                    )}
                </div>

                <button onClick={search}>
                    {!loading ? "search" : <ClipLoader size={20}/>}
                </button>
        </fieldset>
    )
}

export { SearchCourses }
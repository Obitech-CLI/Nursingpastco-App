"use client";

import { SelectCourse } from "@/features/public/components/SelectCourse";
import { UseFetch } from "@/hooks/useFetch";
import { LevelOptions } from "@/ui/AppContent";
import { useEffect, useState } from "react";
import styles from "./courses.module.css";
import { ChevronDown, ChevronUp, RotateCw } from "lucide-react";
import { InstituitionDataTypes } from "@/types/types";
import { ClipLoader } from "react-spinners";

function Courses() {

    const [allCourses, setAllCourses] = useState([]);
    const [instituitions, setInstituitions] = useState<InstituitionDataTypes[]>([]);

    const [showLevel, setShowLevel] = useState(false);
    const [showInstituitions, setShowInstituitions] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedInstituition, setSelectedInstituition] = useState("");


    const FetchAllCourses = UseFetch();
    const FetchInstituitions = UseFetch();

    const HandleFetchAllCourses = async () =>
    {
        const res = await FetchAllCourses.Fetch(`/courses/all?selectedLevel=${selectedLevel}`);

        if (!res) return;

        setAllCourses(res.allCourses)
    }

    const HandleFetchInstituitions = async () =>
    {
        const res = await FetchInstituitions.Fetch(`/instituitions`);

        if (!res) return;

        setInstituitions(res.instituitions)
    }

    useEffect(() => {
        HandleFetchAllCourses();
    }, [selectedLevel]);

    useEffect(() => {
        HandleFetchInstituitions();
    }, [selectedLevel]);

    return (
        <>
        <div className={styles.select}>
            {allCourses.length > 0 || FetchAllCourses.error ? (
            <div onClick={() => {
                setShowLevel(!showLevel);
            }}>{selectedLevel ? selectedLevel : "select level"}
               {showLevel ? <ChevronDown /> : <ChevronUp />}
                {showLevel && (
                    <ul>
                       {LevelOptions.map(level => (
                       <li key={level.id} onClick={() => {
                        setSelectedLevel(level.level)
                       }}>
                        {level.level}
                        </li>
                       ))}
                    </ul>
                )}
            </div>
            ) : (null)}

            {!FetchAllCourses.error ? (
                <div onClick={() => {
                    setShowInstituitions(!showInstituitions)
                }}> {selectedInstituition ? selectedInstituition : "select instituition"}

                    {!FetchInstituitions.loading && instituitions.length > 0 ? (
                        <>
                        {showInstituitions ? <ChevronDown /> : <ChevronUp />}
                        </>
                    ) : (
                        <>
                        {FetchInstituitions.loading ? 
                        <ClipLoader size={20}/> : 
                        <button onClick={HandleFetchInstituitions}>
                            <RotateCw />
                        </button>}
                        </>
                    )}

                    {showInstituitions && (
                        <>
                        {instituitions.length > 0 && (
                            <ul>
                                {instituitions.map(i => (
                                    <li key={i.id}>
                                        {i.instituition_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        </>
                    )}
                </div>
            ) : (null)}

        </div>

        <SelectCourse
        allCourses={allCourses}
        loading={FetchAllCourses.loading}
        error={FetchAllCourses.error}
        reFetch={HandleFetchAllCourses}
        filterLevel={selectedLevel}
        />
        </>
    )
}

export default Courses;
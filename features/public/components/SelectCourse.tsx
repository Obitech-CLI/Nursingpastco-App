"use client";

import { CourseDataTypes, InstituitionDataTypes } from "@/types/types";
import { ChevronDown, ChevronUp, SquareArrowOutUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../styles.module.css";
import Link from "next/link";
import { UseFetch } from "@/hooks/useFetch";

type Props = {
    allCourses: CourseDataTypes [];
    loading: boolean;
    error: string;
    reFetch: () => void;
    filterLevel: string;
}

function SelectCourse({allCourses, loading, error, reFetch, filterLevel} : Props) {

    const [showInfo, setShowInfo] = useState(0);

    const [instituition, setInstituition] = useState<InstituitionDataTypes []>([]);

    const [selectedInstituition, setSelectedInstituition] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");

    const FetchInstuition = UseFetch();

    const HandleFetchInstituition = async () =>
    {
        if (!selectedInstituition) {
            setInstituition([]);
            return;
        }

        const res = await FetchInstuition.Fetch(`/instituitions?instituition=${selectedInstituition}`);

        if (!res) return;

        setInstituition(res.instituitions);
    }

    useEffect(() => {
        HandleFetchInstituition();
    }, [selectedInstituition]);

    const HandleSelected = () =>
    {
        if (instituition.length > 0) {
            instituition.map(i => {
                localStorage.setItem("selectedInstituition",i.instituition_name);
                localStorage.setItem("selectedLevel", selectedLevel);
                localStorage.setItem("selectedLogo", i.instituition_logo);
            })
        }
    }

    useEffect(() => {
        HandleSelected();
    }, [instituition]);

    return (
        <div className={styles.select_course}>
        {!loading ? (
            <>
            {allCourses.length > 0 && !error ? (
                <>
                <h3>
                    {filterLevel && allCourses.length > 0 ? (
                        <>{"all " + allCourses[0].level + " courses"}</>
                    ) : (
                        <>{"all courses"}</>
                    )}
                </h3>
                {allCourses.map(course => (
                    <div key={course.id} className={styles.course}>
                        <h4 onClick={() => {
                            if (course.id === showInfo) {
                                    setShowInfo(0);
                                    setSelectedInstituition("");
                                    setSelectedLevel("");
                                    return;
                                }
                            setShowInfo(course.id);
                            setSelectedInstituition(course.instituition);
                            setSelectedLevel(course.level);
                        }}>{course.course} <SquareArrowOutUpRight />
                        </h4>

                        {showInfo === course.id && (
                            <div className={styles.info}>
                                <button onClick={() => {
                                    setShowInfo(0)
                                }}><X /></button>
                            {!FetchInstuition.loading ? (
                                <>
                                {instituition.length > 0 && !FetchInstuition.error ? (
                                <>
                                <h3>{course.instituition}</h3>
                                <h4>{course.level}</h4>

                                <Link href="/past-questions">
                                    past quesions
                                </Link>

                                </>
                                ) : (
                                    <div className={styles.retry}>
                                        <h4>{FetchInstuition.error}</h4>
                                        <button onClick={HandleFetchInstituition}>retry</button>
                                    </div>
                                )}
                                </>
                            ) : (
                                <div className={styles.loading}>
                                    <ClipLoader />
                                </div>
                            )}
                            </div>
                        )}

                    </div>
                ))}
                </>
            ) : (
                <div className={styles.retry}>
                    <h4>{error}</h4>
                    <button onClick={reFetch}>
                        retry
                    </button>
                </div>
            )}
            </>
        ) : (
            <div className={styles.loading}>
                <ClipLoader size={50}/>
            </div>
        )}
        </div>
    )
}

export { SelectCourse }
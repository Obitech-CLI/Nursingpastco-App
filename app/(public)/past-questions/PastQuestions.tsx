"use client";

import { UseFetch } from "@/hooks/useFetch";
import { CourseDataTypes, PastQuestionDataTypes } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "./styles.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LevelOptions } from "@/ui/AppContent";

function PastQuestions() {

    const [courses, setCourses] = useState<CourseDataTypes[]>([]);
    const [pdfs, setPDFs] = useState<PastQuestionDataTypes[]>([]);

    const [showPDFs, setShowPDFs] = useState(0);

    const [selectedInstituition, setSelectedInstituition] = useState("");
    const [selectedLevel, setSelectedLevel]= useState("");
    const [selectedLogo, setSelectedLogo]= useState<string | null>(null);

    const [selectedCourse, setSelectedCourse] = useState("");

    const [changeLevel, setChangeLevel] = useState(0);

    useEffect(() => {
        const storedInstituition = localStorage.getItem("selectedInstituition");
        const storedLevel = localStorage.getItem("selectedLevel");
        const storedLogo = localStorage.getItem("selectedLogo");

        if (storedInstituition && storedLevel && storedLogo) {
            setSelectedInstituition(storedInstituition);
            setSelectedLevel(storedLevel);
            setSelectedLogo(storedLogo);
        }
        
    }, [changeLevel]);

    const FetchCourses = UseFetch();
    const FetchPDFs = UseFetch();

    const HandleFetchCourses = async () =>
    {
        if (!selectedLevel) return;

        const res = await FetchCourses.Fetch(`/courses?instituition=${selectedInstituition}&level=${selectedLevel}`);

        if (!res) return;

        setCourses(res.courses);
    }

    const HandleFetchPDFs = async () =>
    {
        if (!selectedCourse) return;

        const res = await FetchPDFs.Fetch(
            `/pastQuestions?instituition=${selectedInstituition}&level=${selectedLevel}&course=${selectedCourse}`
        );

        if (!res) return;

        setPDFs(res.pastQuestions);
    }

    useEffect(() => {
        HandleFetchCourses();
    }, [selectedInstituition, selectedLevel]);

    useEffect(() => {
        HandleFetchPDFs();
    }, [selectedCourse]);

    const HandleLevelChange = (level: string) =>
    {
        localStorage.setItem("selectedLevel", level);
        setChangeLevel(prev => prev + 1)
    }

    return (
        <>
        <div className={styles.pastQuestions_hero}>
            <h2>{selectedInstituition}<br />past questions</h2>
            {selectedLogo && (
                <Image alt="" src={selectedLogo} width={100} height={100}/>
            )}
        </div>

        <div className={styles.btns}>
            {LevelOptions.map(level => (
                <button key={level.id}
                onClick={() => {
                    HandleLevelChange(level.level);
                }}
                style={{
                    backgroundColor: selectedLevel === level.level ? "transparent" : "",
                    color: selectedLevel === level.level ? "var(--bg-txt-color)" : "",
                    fontSize: selectedLevel === level.level ? "1rem" : "",
                    border: selectedLevel === level.level ? "var(--border)" : "",
                    marginBottom: selectedLevel === level.level ? "0.5rem" : "",
                    borderRadius: selectedLevel === level.level ? "10px" : "",
                    padding: selectedLevel === level.level ? "1rem 2rem" : ""
                }}
                >
                    {level.level}
                </button>
            ))}
        </div>

        <div className={styles.pastQuestions}>

            {!FetchCourses.loading ? (
                <>
                {courses.length > 0 && !FetchCourses.error ? (
                    <>
                    {courses.map(course => (
                        <div key={course.id}>
                        <div className={styles.courses}>
                            <h4>{course.course}</h4>

                            <button onClick={() => {
                                if (course.id === showPDFs) {
                                    setShowPDFs(0);
                                    setSelectedCourse("");
                                    return;
                                }
                                setSelectedCourse(course.course);
                                setShowPDFs(course.id);
                            }}>{showPDFs ? <ChevronDown /> : <ChevronUp />}</button>
                        </div>

                        {showPDFs === course.id && (
                            <div className={styles.pdfs}>
                            {!FetchPDFs.loading ? (
                            <>
                            {!FetchPDFs.error && pdfs.length > 0 ? (
                                <ul>
                                    {pdfs.map(pdf => (
                                        <li key={pdf.id}>{pdf.title}</li>
                                    ))}
                                </ul>
                            ):(
                                <>
                                {!FetchPDFs.error && !FetchPDFs.loading ? (
                                    <p>no pdf found</p>
                                ):(
                                    <div className={styles.retry}>
                                        <p>{FetchPDFs.error}</p>
                                        <button onClick={HandleFetchPDFs}>
                                            retry
                                        </button>
                                    </div>
                                )}
                                </>
                            )}
                            </>
                            ) : (<ClipLoader size={30}/>)}
                            </div>
                        )}
                        </div>
                    ))}
                    </>
                ) : (
                    <>
                    {FetchCourses.error ? (
                        <div className={styles.retry}>
                            <p>{FetchCourses.error}</p>
                            <button onClick={HandleFetchCourses}>
                                retry
                            </button>
                        </div>
                    ) : (null)}
                    </>
                )}
                </>
            ) : (<div className={styles.loading}><ClipLoader size={40} /></div>)}
        </div>
        </>
    )
}

export { PastQuestions }
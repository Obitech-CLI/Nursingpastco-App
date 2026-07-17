"use client";

import { UseFetch } from "@/hooks/useFetch";
import { FetchAdmin } from "@/lib/admin/admin";
import { CourseDataTypes, PastQuestionDataTypes } from "@/types/types";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function PastQuestions() {

    const [courses, setCourses] = useState<CourseDataTypes[]>([]);
    const [pdfs, setPDFs] = useState<PastQuestionDataTypes[]>([]);

    const [showPDFs, setShowPDFs] = useState(0);

    const [selectedInstituition, setSelectedInstituition] = useState("");
    const [selectedLevel, setSelectedLevel]= useState("");

    const [selectedCourse, setSelectedCourse] = useState("");

    console.log(selectedCourse)

    useEffect(() => {
        const storedInstituition = localStorage.getItem("selectedInstituition");
        const storedLevel = localStorage.getItem("selectedLevel");

        if (storedInstituition && storedLevel) {
            setSelectedInstituition(storedInstituition);
            setSelectedLevel(storedLevel);
        }
        
    }, []);

    const FetchCourses = UseFetch();
    const FetchPDFs = UseFetch();

    const HandleFetchCourses = async () =>
    {
        if (!selectedInstituition || !selectedLevel) return;

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

    console.log(FetchPDFs.error)

    useEffect(() => {
        HandleFetchCourses();
    }, [selectedInstituition, selectedLevel]);

    useEffect(() => {
        HandleFetchPDFs();
    }, [selectedCourse]);

    return (
        <>
        <h2>{selectedInstituition}</h2>
        <h2>{selectedLevel}</h2>

        <h1>past questions</h1>

        <div>
            {!FetchCourses.loading ? (
                <>
                {!FetchCourses.error && courses.length > 0 ? (
                    <>
                    {courses.map(course => (
                        <div key={course.id}>
                        <ul>
                            <li>{course.course}</li>

                            <button onClick={() => {
                                if (course.id === showPDFs) {
                                    setShowPDFs(0);
                                }
                                setSelectedCourse(course.course);
                                setShowPDFs(course.id);
                            }}>open pdfs</button>
                        </ul>

                        {showPDFs === course.id && (
                            <>
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
                                {!FetchPDFs.error ? (
                                    <p>no pdf found</p>
                                ):(<p>{FetchPDFs.error}</p>)}
                                </>
                            )}
                            </>
                            ) : (<ClipLoader size={30}/>)}
                            </>
                        )}
                        </div>
                    ))}
                    </>
                ) : (
                    <>
                    {!FetchCourses.error ? (
                        <p>{"no course found"}</p>
                    ) : (
                        <div>
                            <p>{FetchCourses.error}</p>
                            <button onClick={HandleFetchCourses}>
                                retry
                            </button>
                        </div>
                    )}
                    </>
                )}
                </>
            ) : (<ClipLoader size={40} />)}
        </div>
        </>
    )
}

export { PastQuestions }
"use client";

import { UseFetch } from "@/hooks/useFetch";
import { CourseDataTypes, InstituitionDataTypes } from "@/types/types";
import { LevelOptions } from "@/ui/AppContent";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../style.module.css";
import { Check, ChevronDown, ChevronUp, File, RotateCcw } from "lucide-react";

interface FormDataTypes {
    instituition: string,
    course: string,
    level: string,
    title: string
}

type Props = {
    formData: FormDataTypes;
    setFormData: React.Dispatch<SetStateAction<FormDataTypes>>;
    pdf: File | null;
    setPDF: React.Dispatch<SetStateAction<File | null>>;
    loading: boolean;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    fileRef: React.RefObject<HTMLInputElement | null>;
}

function AddForm({formData, setFormData, pdf, setPDF, loading, onSubmit, fileRef}:Props) {

    const [instituitions, setInstituitions] = useState<InstituitionDataTypes[]>([]);
    const [courses, setCourses] = useState<CourseDataTypes[]>([]);

    const [selectedInstituition, setSelectedInstituition] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");

    const [showInstituitions, setShowInstituitions] = useState(false);
    const [showLevels, setShowLevels] = useState(false);
    const [showCourses, setShowCourses] = useState(false);

    const [focusInput, setFocusInput] = useState(false);

    const FetchInstituitons = UseFetch();
    const FetchCourses = UseFetch()

    const HandleFetchInstituitions = async () =>
    {
        const res = await FetchInstituitons.Fetch("/instituitions");
        if (!res) return;

        setInstituitions(res.instituitions);
    }

    const HandleFetchCourses = async () =>
    {
        if (!selectedInstituition && !selectedLevel) return;
        
        const res = await FetchCourses.Fetch(`/courses?instituition=${selectedInstituition}&level=${selectedLevel}`);
        
        if (!res) {
            setCourses([]);
            return;
        };

        setCourses(res.courses);
    }

    useEffect(() => {
        if (!selectedInstituition && !selectedLevel) return;
        HandleFetchCourses();
    }, [selectedInstituition, selectedLevel]);

    useEffect(() => {
        HandleFetchInstituitions();
    }, []);

    return (
        <form onSubmit={onSubmit} className={styles.add}>

            <h3>add past-question</h3>

                <label onClick={() => setShowInstituitions(!showInstituitions)} 
                className={styles.select}>
                    {!formData.instituition ? "select instituition" : formData.instituition}
                    {instituitions.length > 0 && (
                        <>
                        {showInstituitions ? <ChevronDown /> : <ChevronUp />}
                        </>
                    )}
                    {instituitions.length === 0 && (
                        <button onClick={HandleFetchInstituitions}>
                            {FetchInstituitons.loading ? <ClipLoader size={20}/> : <RotateCcw />}
                        </button>
                    )}

                    {showInstituitions && (
                    <>
                    {instituitions.length > 0 ? (
                        <ul>
                            {instituitions.map(instituition => (
                                <li key={instituition.id} 
                                onClick={() => {
                                    setSelectedInstituition(instituition.instituition_name);
                                    setFormData(prev =>({...prev, instituition: instituition.instituition_name}));
                                }}>
                                    {instituition.instituition_name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul>
                            <li>no instituition</li>
                        </ul>
                    )}
                    </>
                    )}
                </label>

                <label onClick={() => setShowLevels(!showLevels)} 
                className={styles.select}>
                    {!formData.level ? "select level" : formData.level}
                    {showLevels ? <ChevronDown /> : <ChevronUp />}
                    {showLevels && (
                        <>
                        {LevelOptions.length > 0 && (
                            <ul>
                                {LevelOptions.map(level => (
                                    <li key={level.id}
                                    onClick={() => {
                                        setFormData(prev => ({...prev, level: level.level}));
                                        setShowLevels(!showLevels);
                                        setSelectedLevel(level.level);
                                    }}>
                                        {level.level}
                                    </li>
                                ))}
                            </ul>
                        )}
                        </>
                    )}
                </label>

                <label onClick={() => setShowCourses(!showCourses)}
                    className={styles.select}>
                    {!formData.course ? "select course" : formData.course}
                    {courses.length > 0 && (
                        <>
                        {showCourses ? <ChevronDown /> : <ChevronUp />}
                        </>
                    )}

                    {courses.length === 0 && (
                        <button onClick={HandleFetchCourses} type="button">
                            {FetchCourses.loading ? <ClipLoader size={20}/> : <RotateCcw />}
                        </button>
                    )}
                    
                    {showCourses && (
                    <>
                    {courses.length > 0 ? (
                        <ul>
                            {courses.map(course => (
                                <li onClick={() => setFormData(prev => ({...prev, course: course.course}))}
                                key={course.id}>
                                    {course.course}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul>
                            <li>no courses</li>
                        </ul>
                    )}
                    </>
                    )}
                </label>

                <label className={styles.title}>
                    <span style={{
                        top: focusInput ? "-0.9rem" : ""
                    }}>{focusInput ? "enter past question title" : "past question title"}</span>

                    <input type="text" value={formData.title}
                    onChange={(e) => setFormData(prev => (
                        {...prev, title: e.target.value}
                    ))}
                    onFocus={() => {
                        setFocusInput(true);
                    }}
                    />
                </label>

                <label className={styles.file}>
                    <File size={30}/>
                    <input type="file" accept="application/pdf"
                    ref={fileRef}
                    onChange={(e) => {
                        if (e.target.files) {
                            setPDF(e.target.files?.[0] ?? null)
                        }
                    }}/>
                    <span>{pdf ? "pdf selected" : "pdf"} {pdf ? <Check color="green"/> : null}</span>
                </label>

                <button 
                type="submit">
                    {!loading ? "add pdf" : <ClipLoader size={20} />}
                </button>

        </form>
    )
}

export { AddForm }
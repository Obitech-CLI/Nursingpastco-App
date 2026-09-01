"use client";

import { UseFetch } from "@/hooks/useFetch";
import { CourseDataTypes, InstituitionDataTypes } from "@/types/types";
import { LevelOptions } from "@/ui/AppContent";
import { SetStateAction, use, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Check, ChevronDown, ChevronUp, File, RotateCcw, RotateCw, X } from "lucide-react";
import { useErrorModal } from "@/contexts/modals/FeedbackContext";

interface FormDataTypes {
    instituition: string,
    course: string,
    level: string,
}

interface editData {
    id: string,
    instituition: string,
    course: string,
    level: string
}

type Props = {
    formData: FormDataTypes;
    setFormData: React.Dispatch<SetStateAction<FormDataTypes>>;
    pdf: File | null;
    setPDF: React.Dispatch<SetStateAction<File | null>>;
    loading: boolean;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    fileRef: React.RefObject<HTMLInputElement | null>;
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: editData;
    setEditData: React.Dispatch<SetStateAction<editData>>;
}

function AddForm({formData, setFormData, pdf, setPDF, loading, onSubmit, fileRef, edit, setEdit, editData, setEditData}:Props) {

    const [instituitions, setInstituitions] = useState<InstituitionDataTypes[]>([]);
    const [courses, setCourses] = useState<CourseDataTypes[]>([]);

    const [selectedInstituition, setSelectedInstituition] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");

    const [showInstituitions, setShowInstituitions] = useState(false);
    const [showLevels, setShowLevels] = useState(false);
    const [showCourses, setShowCourses] = useState(false);

    const { setErrorMessage, setShowErrorModal, errorMessage } = useErrorModal();

    const FetchInstituitons = UseFetch();
    const FetchCourses = UseFetch()

    const HandleFetchInstituitions = async () =>
    {
        const res = await FetchInstituitons.Fetch("/instituitions");

        if (FetchInstituitons.error) {
            setErrorMessage(FetchInstituitons.error);
            setShowErrorModal(true);
            return;
        }

        if (!res) return;

        setInstituitions(res.instituitions);
    }

    const HandleFetchCourses = async () =>
    {

        if (!selectedInstituition && !selectedLevel && !edit) {
            setErrorMessage("no instituition and level selected");
            setShowErrorModal(true);
            return;
        }

        if (!selectedInstituition && !edit) {
            setErrorMessage("no instituition selected");
            setShowErrorModal(true);
            return;
        }
        if (!selectedLevel && !edit) {
            setErrorMessage("no level selected");
            setShowErrorModal(true);
            return;
        }
        
        const res = await FetchCourses.Fetch(`/courses?instituition=${selectedInstituition || editData.instituition}&level=${selectedLevel || editData.level}`);
        
        if (FetchCourses.error) {
            setErrorMessage(FetchCourses.error);
            setShowErrorModal(true);
            return;
        }
        if (!res) {
            setCourses([]);
            return;
        };

        setCourses(res.courses);
    }

    useEffect(() => {
        HandleFetchInstituitions();
    }, []);

    useEffect(() => {
        if (!edit) return;
        HandleFetchCourses();
    }, [edit])

    useEffect(() => {
            document.body.style.overflow = showLevels || showInstituitions || showCourses || errorMessage ? "hidden" : "";
    
            return () => {
                document.body.style.overflow = "auto";
            }
        }, [showCourses, showInstituitions, showLevels, errorMessage])

        const CancelEdit = () => {
        setEdit(false);
        setEditData({
            id: "",
            instituition: "",
            course: "",
            level: ""
        })
    }

    return (
        <form onSubmit={onSubmit}>

            {edit && (
                <span onClick={CancelEdit}>
                    cancel update <X color="red"/>
                </span>
            )}

                <label onClick={() => {
                    if (instituitions.length === 0) return;
                    setShowInstituitions(!showInstituitions)
                }} 
                className="select">

                    <>{formData.instituition || editData.instituition ? formData.instituition || editData.instituition : "select instituition"}</>

                    {instituitions.length > 0 && (
                        <>
                        {showInstituitions ? <ChevronDown /> : <ChevronUp />}
                        </>
                    )}
                    {instituitions.length === 0 && (
                        <button onClick={HandleFetchInstituitions} type="button">
                            {FetchInstituitons.loading && (<ClipLoader size={20}/>)}
                            {!FetchInstituitons.loading && instituitions.length === 0 ? (
                                <RotateCcw />
                            ):(null)}
                        </button>
                    )}

                    {showInstituitions && (
                    <>
                    {instituitions.length > 0 ? (
                        <ul>
                            <span onClick={() => setShowInstituitions(false)}><X /></span>
                            <h2>select</h2>
                            {instituitions.map(instituition => (
                                <li key={instituition.id} 
                                onClick={() => {
                                    if (edit) {
                                    setCourses([]);
                                    setSelectedInstituition(instituition.instituition_name);
                                    setEditData(prev => ({...prev, instituition: instituition.instituition_name}));
                                    return;
                                    }
                                    setCourses([]);
                                    setSelectedInstituition(instituition.instituition_name);
                                    setFormData(prev =>({...prev, course: "", instituition: instituition.instituition_name}));
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
                className="select">
                    <>
                     {formData.level || editData.level ? formData.level || editData.level : "select level"}
                    </>
                    {showLevels ? <ChevronDown /> : <ChevronUp />}
                    {showLevels && (
                        <>
                        {LevelOptions.length > 0 && (
                            <ul>
                                <span onClick={() => setShowLevels(false)}><X /></span>
                                <h2>select</h2>
                                {LevelOptions.map(level => (
                                    <li key={level.id}
                                    onClick={() => {
                                        if (edit) {
                                        setEditData(prev => ({...prev, level:level.level}));
                                        setShowLevels(!showLevels);
                                        setSelectedLevel(level.level);
                                        setCourses([]);
                                        return;
                                        }
                                        setCourses([]);
                                        setFormData(prev => ({...prev, course: "", level: level.level}));
                                        setShowLevels(!showLevels);
                                        setSelectedLevel(level.level);
                                    }}>{level.level}
                                    </li>
                                ))}
                            </ul>
                        )}
                        </>
                    )}
                </label>

                <label className="select" onClick={() => {
                        if (courses.length === 0) return;
                        setShowCourses(!showCourses);
                    }}>
                    <>
                    {formData.course || editData.course ? formData.course || editData.course : "select course"}
                    </>

                    {courses.length > 0 && (
                        <>
                        {showCourses ? <ChevronDown /> : <ChevronUp />}
                        </>
                    )}
                    {courses.length === 0 && (
                        <button onClick={HandleFetchCourses} type="button">
                            {FetchCourses.loading && (<ClipLoader size={20}/>)}
                            {!FetchCourses.loading && courses.length === 0 ? (
                                <RotateCcw />
                            ):(null)}
                        </button>
                    )}
                    
                    {showCourses && (
                    <>
                    {courses.length > 0 && (
                        <ul>
                            <span onClick={() => setShowCourses(!showCourses)}><X /></span>
                            <h2>select</h2>
                            {courses.map(course => (
                                <li key={course.id} onClick={() => {
                                    if (edit) {
                                        setEditData(prev => ({...prev, course: course.course}));
                                        return;
                                    }
                                    setFormData(prev => ({...prev, course: course.course}));
                                }}>
                                {course.course}
                                </li>
                            ))}
                        </ul>
                    )}
                    </>
                    )}
                </label>

                <label className="file">
                    <File size={30}/>
                    <input type="file" accept="application/pdf"
                    ref={fileRef}
                    onChange={(e) => {
                        if (e.target.files) {
                            setPDF(e.target.files?.[0] ?? null)
                        }
                    }}/>
                    <span>
                        {pdf ? "pdf selected" : "upload pdf"}
                        {pdf ? <Check color="green" /> : null}
                    </span>
                </label>

                <button 
                type="submit">
                    {!loading ? (
                        <>
                        { edit ? "update": "add" }
                        </>
                    ) : (
                        <>
                        <ClipLoader color="white" size={20} />
                        {edit ? "updating..." : "adding..."}
                        </>
                    )}
                </button>

        </form>
    )
}

export { AddForm }
"use client";

import { UseFetch } from "@/hooks/useFetch";
import { InstituitionDataTypes } from "@/types/types";
import { LevelOptions } from "@/ui/AppContent";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ChevronDown, ChevronUp, RotateCw, X } from "lucide-react";
import { useErrorModal } from "@/contexts/modals/FeedbackContext";

interface FormDataTypes {
    instituition: string;
    course: string;
    level: string;
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
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    loading:boolean;
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: editData;
    setEditData: React.Dispatch<SetStateAction<editData>>;
    focusInput: boolean;
    setFocusInput: React.Dispatch<SetStateAction<boolean>>;
}

function AddForm({formData, setFormData, onSubmit, loading, edit, setEdit, editData, setEditData, focusInput, setFocusInput}:Props) {

    const [instituitions, setInstituitions] = useState<InstituitionDataTypes []>([]);

    const [showInstituitions, setShowInstituitions] = useState(false);
    const [showLevels, setShowLevels] = useState(false);

    const { setErrorMessage, setShowErrorModal, errorMessage } = useErrorModal();

    const fetctInstituitions = UseFetch();

    const [reloadInstituitions, setReloadInstituitions] = useState(0);

    const HandleFetch = async () =>
    {
        const res = await fetctInstituitions.Fetch("/instituitions");
        if (fetctInstituitions.error) {
            setErrorMessage(fetctInstituitions.error);
            setShowErrorModal(true);
            return;
        }

        if (!res) return;

        setInstituitions(res.instituitions);
    }

    useEffect(() => {
        HandleFetch();
    }, [reloadInstituitions])

    useEffect(() => {
        document.body.style.overflow = showLevels || showInstituitions || errorMessage ? "hidden" : "";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [showInstituitions, showLevels, errorMessage])

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

            <label className="select" onClick={() => {
                if (instituitions.length === 0) return;
                setShowInstituitions(!showInstituitions);
                setShowLevels(false);
            }}>

            <>
            {formData.instituition || editData.instituition ? formData.instituition || editData.instituition : "select instituition"}
            </>

            {instituitions.length === 0 && (
                <button type="button" onClick={() => {
                    setReloadInstituitions(prev => prev + 1);
                    }}>
                    {fetctInstituitions.loading && (<ClipLoader size={25}/>)}
                    {!fetctInstituitions.loading && instituitions.length === 0 ? 
                    <RotateCw size={20}/> : null}
                </button>
            )}

            {instituitions.length > 0 && (
                <>{showInstituitions && instituitions.length > 0 ? 
                <ChevronUp /> : <ChevronDown />}</>
            )}

            {showInstituitions && (
                <>
                {instituitions.length > 0 && (
                    <ul>
                        <span onClick={() => setShowInstituitions(false)}><X /></span>
                        <h2>select</h2>
                        {instituitions.map(instituition => (
                            <li key={instituition.id} onClick={() => {
                                if (edit) {
                                    setEditData(prev => ({...prev, instituition: instituition.instituition_name}));
                                    return;
                                }
                                setFormData(prev => ({...prev, instituition: instituition.instituition_name}));
                            }}>
                                {instituition.instituition_name}
                            </li>
                        ))}
                    </ul>
                )}
                </>
            )}
            </label>

            <label>
                <span style={{
                    top: focusInput || edit ? "-0.8rem" : "",
                    border: focusInput || edit ? "var(--border)" : ""
                }}>
                    {focusInput || edit ? (
                        <>
                        {edit ? "update course" : "enter course"}
                        </>
                    ) : (
                        <>
                        {edit ? "" : "course"}
                        </>
                    )}
                </span>
                <input type="text" value={edit ? editData.course : formData.course} 
                onChange={(e) => {
                    if (edit) {
                        setEditData(prev => ({...prev, course: e.target.value}));
                        return;
                    }
                    setFormData(prev => ({...prev, course: e.target.value}));
                }}
                onFocus={() => {
                    setFocusInput(true);
                }}
                />
            </label>

            <label className="select" onClick={() => {
                setShowLevels(!showLevels);
                setShowInstituitions(false);
                }}>
                
                <>
                {formData.level || editData.level ? formData.level || editData.level : "select level"}
                </>

                {showLevels ? <ChevronUp /> : <ChevronDown />}

                {showLevels && (
                    <>
                    {LevelOptions.length > 0 && (
                        <ul>
                            <span onClick={() => setShowLevels(false)}><X /></span>
                            <h2>select</h2>
                            {LevelOptions.map(level => (
                                <li 
                                onClick={() => {
                                    if (edit) {
                                        setEditData(prev => ({...prev, level:level.level}));
                                        return;
                                    }
                                    setFormData(prev => ({...prev, level:level.level}))
                                }}
                                key={level.id}>
                                    {level.level}
                                </li>
                            ))}
                        </ul>
                    )}
                    </>
                )}
            </label>

            <button type="submit" disabled={loading}>
                {!loading ? (
                        <>
                        {edit ? "update" : "add"}
                        </>
                ) : <ClipLoader size={20} color="black"/>}
            </button>
        </form>
    )
}

export { AddForm }
"use client";

import { UseFetch } from "@/hooks/useFetch";
import { InstituitionDataTypes } from "@/types/types";
import { LevelOptions } from "@/ui/AppContent";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../styles.module.css";
import { ArrowBigDown, ArrowBigUp, BoxSelect, ChevronDown, ChevronUp, Pen, Rotate3D, RotateCcw, RotateCcwKey, RotateCw } from "lucide-react";

interface FormDataTypes {
    instituition: string;
    course: string;
    level: string;
}

type Props = {
    formData: FormDataTypes;
    setFormData: React.Dispatch<SetStateAction<FormDataTypes>>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    loading:boolean;
}

function AddForm({formData, setFormData, onSubmit, loading}:Props) {

    const [instituitions, setInstituitions] = useState<InstituitionDataTypes []>([]);

    const [showInstituitions, setShowInstituitions] = useState(false);
    const [showLevels, setShowLevels] = useState(false);

    const [focusInput, setFocusInput] = useState(false);

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
    }, [reloadInstituitions])

    return (
        <form onSubmit={onSubmit} className={styles.add}>
            <h2>add course</h2>

            <label onClick={() => setShowInstituitions(!showInstituitions)} className={styles.instituitions}>
            {!formData.instituition ? "select instituition" : formData.instituition}

            {instituitions.length === 0 && !fetctInstituitions.loading ? (
                <button type="button" onClick={() => {
                    setReloadInstituitions(prev => prev + 1);
                    }}>
                    {!fetctInstituitions.loading ? <RotateCw size={20}/> : <ClipLoader size={0}/>}
                    </button>
            ) : (null)}

            {instituitions.length > 0 && (
                <>
                {showInstituitions ? <ChevronUp /> : <ChevronDown />}
                </>
            )}

            {showInstituitions && (
                <>
                {instituitions && instituitions.length > 0 ? (
                    <ul>
                        {instituitions.map(instituition => (
                            <li key={instituition.id} onClick={() => {
                                setFormData(prev => ({...prev, instituition: instituition.instituition_name}));
                            }}>
                                {instituition.instituition_name}
                            </li>
                        ))}
                    </ul>
                ) : (null)}
                </>
            )}
            </label>

            <label className={styles.course}>
                <span style={{
                    top: focusInput ? "-0.7rem" : ""
                }}>{focusInput ? "enter course" : "course"}</span>
                <input type="text" value={formData.course} 
                onChange={(e) => {
                    setFormData(prev => ({...prev, course: e.target.value}));
                }}
                onFocus={() => {
                    setFocusInput(true);
                }}
                />
            </label>

            <label onClick={() => setShowLevels(!showLevels)} className={styles.levels}>
                {!formData.level ? "select level" : formData.level}

                {showLevels ? <ChevronUp /> : <ChevronDown />}

                {showLevels && (
                    <>
                    {LevelOptions.length > 0 && (
                        <ul>
                            {LevelOptions.map(level => (
                                <li onClick={() => setFormData(prev => ({...prev, level:level.level}))}
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
                {!loading ? "add course" : <ClipLoader size={20} color="white"/>}
            </button>
        </form>
    )
}

export { AddForm }
"use client";

import { UseFetch } from "@/hooks/useFetch";
import { InstituitionDataTypes } from "@/types/types";
import { LevelOptions } from "@/ui/AppContent";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

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
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>add</legend>

                <label onClick={() => setShowInstituitions(!showInstituitions)}>
                {!formData.instituition ? "select instituition" : formData.instituition}

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

                <label>course
                    <input type="text" value={formData.course} 
                    onChange={(e) => {
                        setFormData(prev => ({...prev, course: e.target.value}));
                    }} />
                </label>

                <label onClick={() => setShowLevels(!showLevels)}>
                    {!formData.level ? "select level" : formData.level}

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
                    {!loading ? "add course" : <ClipLoader size={20} />}
                </button>
            </fieldset>
        </form>
    )
}

export { AddForm }
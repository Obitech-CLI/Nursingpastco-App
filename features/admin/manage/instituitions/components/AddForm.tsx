"use client";

import { SetStateAction } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../styles.module.css";
import { Check, Image, Pen, X, } from "lucide-react";

interface FormDataTypes {
    instituition_name: string,
    instituition_abbr: string,
}

interface editData {
    id: number,
    instituition_name: string,
    instituition_abbr: string,
}

type FocusTypes = {
    name: boolean;
    abbr: boolean;
}

type Props = {
    formData: FormDataTypes;
    setFormData: React.Dispatch<SetStateAction<FormDataTypes>>;
    setLogo: React.Dispatch<SetStateAction<File | null>>;
    logo: File | null;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    loading: boolean;
    fileRef: React.RefObject<HTMLInputElement | null>;
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: editData;
    setEditData: React.Dispatch<React.SetStateAction<editData>>;
    focusInput: FocusTypes;
    setFocusInput: React.Dispatch<React.SetStateAction<FocusTypes>>;
}

function AddForm(
    {formData, setFormData, setLogo, logo, onSubmit, loading, fileRef, edit, setEdit, editData, setEditData, focusInput, setFocusInput}:Props
    ) {

    const HandleFormChange = (e:React.ChangeEvent<HTMLInputElement>) =>
    {
        if (!edit) {
            setFormData(prev => ({...prev, [e.target.name]:e.target.value}));
        } else {
            setEditData(prev => ({...prev, [e.target.name]:e.target.value}));
        }
    }

    const CancelEdit = () => {
        setEdit(false);
        setEditData({
            id: 0,
            instituition_name: "",
            instituition_abbr: "",
        })
    }

    return (
        <form onSubmit={onSubmit} className={styles.add}>

                {edit && (
                <span onClick={CancelEdit}>
                    cancel update <X color="red"/>
                </span>
                )}

                <label className={styles.input}>
                    <input type="text" value={edit ? editData.instituition_name : formData.instituition_name}
                    name="instituition_name" onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, name: true}))
                }}/>
                    <span style={{
                    top: focusInput.name || edit ? "-1.2rem" : "",
                    border: focusInput.name || edit ? "var(--border)" : ""
                    }}>
                    {focusInput.name || edit ? (
                        <>
                        {edit ? "update instituition name" : "enter instituition name"}
                        </>
                    ) : (
                        <>
                        {edit ? "" : "instituition name"}
                        </>
                    )}
                    </span>
                </label>

                <label className={styles.input}>
                    <input type="text" value={edit ? editData.instituition_abbr : formData.instituition_abbr}
                    name="instituition_abbr" onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, abbr: true}))
                    }}/>
                    <span style={{
                    top: focusInput.abbr || edit ? "-1.2rem" : "",
                    border: focusInput.abbr || edit ? "var(--border)" : ""
                     }}>
                    {focusInput.abbr || edit ? (
                        <>
                        {edit ? "update instituition abbr" : "enter instituition abbr"}
                        </>
                    ) : (
                        <>
                        {edit ? "" : "instituition abbr"}
                        </>
                    )}
                    </span>
                </label>

                <label className={styles.file}><Image size={30}/>
                    <input type="file" ref={fileRef}
                     accept="image/*"
                    onChange={(e) => {
                        if (e.target.files) {
                            setLogo(e.target.files?.[0] ?? null)
                        }
                    }}/>
                    <span>
                        {logo ? "logo selected" : "select logo"} 
                        {logo ? <Check color="green" size={20}/> : ""}
                    </span>
                </label>

                <button type="submit">
                    {!loading ? (
                        <>
                        {edit ? "update" : "add"}
                        </>
                    ) : <ClipLoader size={20} color="white"/>}
                </button>
        </form>
    )
}

export { AddForm }
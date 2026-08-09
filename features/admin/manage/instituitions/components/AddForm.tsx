"use client";

import { SetStateAction, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../styles.module.css";
import { Check, Image, Pen, } from "lucide-react";

interface FormDataTypes {
    instituition_name: string,
    instituition_abbr: string,
}

type Props = {
    formData: FormDataTypes;
    setFormData: React.Dispatch<SetStateAction<FormDataTypes>>;
    setLogo: React.Dispatch<SetStateAction<File | null>>;
    logo: File | null;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    loading: boolean;
    fileRef: React.RefObject<HTMLInputElement | null>;
}

function AddForm(
    {formData, setFormData, setLogo, logo, onSubmit, loading, fileRef}:Props
    ) {

    const HandleFormChange = (e:React.ChangeEvent<HTMLInputElement>) =>
    {
        setFormData(prev => ({...prev, [e.target.name]:e.target.value}));
    }

    const [focusInput, setFocusInput] = useState({
        name: false,
        abbr: false,
    })

    return (
        <form onSubmit={onSubmit} className={styles.add}>

                <label className={styles.input}>
                    <input type="text" value={formData.instituition_name}
                    name="instituition_name" onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, name: true}))
                }}/>
                    <span style={{
                    top: focusInput.name ? "-1.2rem" : ""
                }}>{focusInput.name ? "enter instituition name" : "instituition name"}</span>
                </label>

                <label className={styles.input}>
                    <input type="text" value={formData.instituition_abbr}
                    name="instituition_abbr" onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, abbr: true}))
                }}/>
                    <span style={{
                    top: focusInput.abbr ? "-1.2rem" : ""
                }}>{focusInput.abbr ? "enter instituition(abbr)" : "instituition(abbr)"}</span>
                </label>

                <label className={styles.file}><div><Image size={35}/></div>
                    <input type="file" ref={fileRef}
                     accept="image/*"
                    onChange={(e) => {
                        if (e.target.files) {
                            setLogo(e.target.files?.[0] ?? null)
                        }
                    }}/>
                    <span>{logo ? "logo selected" : "select a logo"} {logo ? <Check color="green"/> : null}</span>
                </label>

                <button type="submit">
                    {!loading ? "add" : <ClipLoader size={20} color="white"/>}
                </button>
        </form>
    )
}

export { AddForm }
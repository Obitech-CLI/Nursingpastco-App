"use client";

import { SetStateAction } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../../styles.module.css";

interface FormDataTypes {
    instituition_name: string,
    instituition_abbr: string,
}

type Props = {
    formData: FormDataTypes;
    setFormData: React.Dispatch<SetStateAction<FormDataTypes>>;
    setLogo: React.Dispatch<SetStateAction<File | null>>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    loading: boolean;
    fileRef: React.RefObject<HTMLInputElement | null>;
}

function AddForm(
    {formData, setFormData, setLogo, onSubmit, loading, fileRef}:Props
    ) {

    const HandleFormChange = (e:React.ChangeEvent<HTMLInputElement>) =>
    {
        setFormData(prev => ({...prev, [e.target.name]:e.target.value}));
    }

    return (
        <form onSubmit={onSubmit} className={styles.add}>
            <fieldset>
                <legend>add</legend>
                <label>instituition name
                    <input type="text" value={formData.instituition_name}
                    name="instituition_name" onChange={HandleFormChange} />
                </label>

                <label>instituition(abbr)
                    <input type="text" value={formData.instituition_abbr}
                    name="instituition_abbr" onChange={HandleFormChange} />
                </label>

                <label>instituition logo
                    <input type="file" ref={fileRef}
                     accept="image/*"
                    onChange={(e) => {
                        if (e.target.files) {
                            setLogo(e.target.files?.[0] ?? null)
                        }
                    }}/>
                </label>

                <button type="submit">
                    {!loading ? "add instituition" : <ClipLoader size={20} />}
                </button>
            </fieldset>
        </form>
    )
}

export { AddForm }
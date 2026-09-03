"use client";

import { SetStateAction } from "react";
import { ClipLoader } from "react-spinners";
import { Check, Image, Pen, X, } from "lucide-react";

interface FormDataTypes {
    instituition_name: string,
    instituition_abbr: string,
}

interface editData {
    id: string,
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
    editLogo: File | null;
    setEditLogo: React.Dispatch<SetStateAction<File | null>>;
    updateLoading: boolean;
}

function AddForm(
    {formData, setFormData, setLogo, logo, onSubmit, loading, fileRef, edit, setEdit, editData, setEditData, focusInput, setFocusInput, editLogo, setEditLogo, updateLoading}:Props
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
            id: "",
            instituition_name: "",
            instituition_abbr: "",
        })
        setEditLogo(null);
    }

    return (
        <form onSubmit={onSubmit}>

                {edit && (
                <span onClick={CancelEdit}>
                    cancel update <X color="red"/>
                </span>
                )}

                <label>
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

                <label>
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

                <label className="file"><Image size={30}/>
                    <input type="file" ref={fileRef}
                     accept="image/*"
                    onChange={(e) => {
                        if (e.target.files) {
                            if (edit) {
                                setEditLogo(e.target.files?.[0] ?? null);
                                return;
                            }
                            setLogo(e.target.files?.[0] ?? null)
                        }
                    }}/>
                    <span>
                        {logo || editLogo ? (
                            <>logo selected</>
                        ) : (
                            <>
                            {edit ? "update logo" : "select logo"}
                            </>
                        )}
                        {logo || editLogo ? <Check color="green" size={20}/> : ""}
                    </span>
                </label>

                <button type="submit">
                    <>
                    {!edit ? (
                        <>
                        {!loading ? "add" : (
                            <>
                            <ClipLoader size={20} color="black"/>
                            adding...
                            </>
                        )}
                        </>
                    ) : (
                        <>
                        {!updateLoading ? "update" : (
                            <>
                            <ClipLoader size={20} color="black"/>
                            updating...
                            </>
                        )}
                        </>
                    )}
                    </>
                </button>
        </form>
    )
}

export { AddForm }
"use client";

import { SetStateAction, useRef, useState } from "react"
import { AddForm } from "./AddForm"
import { UsePost } from "@/hooks/usePost";

interface editData {
    id: number,
    instituition_name: string,
    instituition_abbr: string,
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: editData;
    setEditData: React.Dispatch<SetStateAction<editData>>;
}

function AddInstituition({edit, setEdit, editData, setEditData} : Props) {

    const [formData, setFormData] = useState({
        instituition_name: "",
        instituition_abbr: "",
    });

    const [focusInput, setFocusInput] = useState({
        name: false,
        abbr: false,
    })

    const [logo, setLogo] = useState<File | null>(null);

    const fileRef = useRef<HTMLInputElement>(null);

    const PostData = UsePost();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const form_data = new FormData();

        form_data.append("instituition_name", formData.instituition_name);
        form_data.append("instituition_abbr", formData.instituition_abbr);

        if (logo) {
            form_data.append("instituition_logo", logo);
        }

        const res = await PostData.Post("/instituitions", form_data);

        if (!res) return;

            setFormData({
                instituition_name: "",
                instituition_abbr: "",
            });

            setLogo(null)

            if (fileRef.current) {
                fileRef.current.value = "";
            }
    }

    return (
        <AddForm
        formData={formData}
        setFormData={setFormData}
        setLogo={setLogo}
        logo={logo}
        onSubmit={HandleFormSubmit}
        loading={PostData.loading}
        fileRef={fileRef}
        edit={edit}
        setEdit={setEdit}
        editData={editData}
        setEditData={setEditData}
        focusInput={focusInput}
        setFocusInput={setFocusInput}
        />
    )
}

export { AddInstituition }
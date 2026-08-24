"use client";

import { SetStateAction, useRef, useState } from "react";
import { AddForm } from "./AddForm";
import { UsePost } from "@/hooks/usePost";

interface editData {
    id: number,
    instituition: string,
    course: string,
    level: string
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: editData;
    setEditData: React.Dispatch<SetStateAction<editData>>;
}

function AddPastQuestion({edit, setEdit, editData, setEditData} : Props) {

    const [formData, setFormData] = useState({
        instituition: "",
        course: "",
        level: "",
    })

    const [pdf, setPDF] = useState<File | null>(null);

    const fileRef = useRef<HTMLInputElement>(null);

    const PostPDFData = UsePost();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const form_data = new FormData();

        form_data.append("instituition", formData.instituition);
        form_data.append("course", formData.course);
        form_data.append("level", formData.level);

        if (pdf) {
            form_data.append("pdf", pdf);
        }

        const res = await PostPDFData.Post("/pastQuestions", form_data);

        if (!res) return;

        setFormData({
            instituition: "",
            course: "",
            level: "",
        });

        setPDF(null);
        
        if (fileRef.current) {
            fileRef.current.value = "";
        }
    }

    return (
        <AddForm
        formData={formData}
        setFormData={setFormData}
        pdf={pdf}
        setPDF={setPDF}
        loading={PostPDFData.loading}
        onSubmit={HandleFormSubmit}
        fileRef={fileRef}
        edit={edit}
        setEdit={setEdit}
        editData={editData}
        setEditData={setEditData}
        />
    )
}

export { AddPastQuestion }
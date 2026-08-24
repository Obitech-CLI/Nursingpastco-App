"use client";

import { SetStateAction, useState } from "react";
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

function AddCourse({edit, setEdit, editData, setEditData} : Props) {

    const [formData, setFormData] = useState({
        instituition: "",
        course: "",
        level: ""
    });

    const PostData = UsePost();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
    
        const res = await PostData.Post("/courses", formData);

        if (!res) return;

        setFormData({
            instituition: "",
            course: "",
            level: ""
        });
    }

    return (
            <AddForm 
            formData={formData}
            setFormData={setFormData}
            onSubmit={HandleFormSubmit}
            loading={PostData.loading}
            edit={edit}
            setEdit={setEdit}
            editData={editData}
            setEditData={setEditData}
            />
    )
}

export { AddCourse }
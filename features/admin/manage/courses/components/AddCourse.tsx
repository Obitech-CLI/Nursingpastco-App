"use client";

import { SetStateAction, useState } from "react";
import { AddForm } from "./AddForm";
import { UsePost } from "@/hooks/usePost";
import { UsePatch } from "@/hooks/usePatch";

interface editData {
    id: string,
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

    const [focusInput, setFocusInput] = useState(false);

    const PostData = UsePost();
    const PatchData = UsePatch();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
    
        if (!edit) {
            const res = await PostData.Post("/courses", formData);

            if (!res) return;

            if (res.success) {

            setFormData({
               instituition: "",
               course: "",
               level: ""
            });

            setFocusInput(false);
            }
        } else if (edit) {
            const res = await PatchData.Patch("/courses", editData);

            if (!res) return;

            if (res.success) {

            setEditData({
               id: "",
               instituition: "",
               course: "",
               level: ""
            });

            setFocusInput(false);
            }
        }
    }

    return (
            <AddForm 
            formData={formData}
            setFormData={setFormData}
            onSubmit={HandleFormSubmit}
            loading={PostData.loading || PatchData.loading}
            edit={edit}
            setEdit={setEdit}
            editData={editData}
            setEditData={setEditData}
            focusInput={focusInput}
            setFocusInput={setFocusInput}
            />
    )
}

export { AddCourse }
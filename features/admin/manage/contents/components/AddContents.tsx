"use client";

import { useRef, useState } from "react";
import { AddContentsForm } from "./AddFormContents";
import { UsePost } from "@/hooks/usePost";

export type AddContentsFormDataType = {
    category: string;
    title: string;
    content: string;
}

function AddContents() {

    const [ formData, setFormData ] = useState({
        category: "",
        title: "",
        content: ""
    });

    const [ file, setFile ] = useState<File | null>(null);

    const [ focus, setFocus ] = useState({
        title: false,
        content: false
    });

    const fileRef = useRef<HTMLInputElement>(null);

    const PostFormData = UsePost();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const form_data = new FormData();

        form_data.append("category", formData.category)
        form_data.append("title", formData.title)
        form_data.append("content", formData.content)

        if (file) {
            form_data.append("file", file);
        }

        const res = await PostFormData.Post("/contents", form_data);

        if (!res) return;

        if (res.success) {
            setFormData({
                category: "",
                title: "",
                content: ""
            });

            setFocus({
                title: false,
                content: false
            })

            if (fileRef.current) {
                fileRef.current.value = "";
            }

            setFile(null);
        }
    }

    return (
        <>
        <AddContentsForm
        formData={formData}
        setFormData={setFormData}
        focus={focus}
        setFocus={setFocus}
        fileRef={fileRef}
        file={file}
        setFile={setFile}
        postLoading={PostFormData.loading}
        submit={HandleFormSubmit}
        />
        </>
    )
}

export { AddContents }
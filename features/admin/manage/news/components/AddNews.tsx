"use client";

import { useRef, useState } from "react";
import { UsePost } from "@/hooks/usePost";
import { AddNewsForm } from "./AddNewsForm";

export type AddNewsFormDataType = {
    category: string;
    title: string;
    news: string;
}

function AddNews() {

    const [ formData, setFormData ] = useState({
        category: "",
        title: "",
        news: ""
    });

    const [ image, setImage ] = useState<File | null>(null);

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
        form_data.append("news", formData.news)

        if (image) {
            form_data.append("image", image);
        }

        const res = await PostFormData.Post("/news", form_data);

        if (!res) return;

        if (res.success) {
            setFormData({
                category: "",
                title: "",
                news: ""
            });

            if (fileRef.current) {
                fileRef.current.value = "";
            }
        }
    }

    return (
        <>
        <AddNewsForm
        formData={formData}
        setFormData={setFormData}
        focus={focus}
        setFocus={setFocus}
        fileRef={fileRef}
        image={image}
        setImage={setImage}
        postLoading={PostFormData.loading}
        submit={HandleFormSubmit}
        />
        </>
    )
}

export { AddNews }
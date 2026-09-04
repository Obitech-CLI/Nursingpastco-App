"use client";

import { useRef, useState } from "react";
import { UsePost } from "@/hooks/usePost";
import { AddRecommendationsForm } from "./AddRecommendationsForm";

export type AddRecommendationsFormDataType = {
    category: string;
    title: string;
    recommendation: string;
    link: string;
}

function AddRecommendations() {

    const [ formData, setFormData ] = useState({
        category: "",
        title: "",
        recommendation: "",
        link: ""
    });

    const [ image, setImage ] = useState<File | null>(null);

    const [ focus, setFocus ] = useState({
        title: false,
        content: false,
        link: false
    });

    const fileRef = useRef<HTMLInputElement>(null);

    const PostFormData = UsePost();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const form_data = new FormData();

        form_data.append("category", formData.category);
        form_data.append("title", formData.title);
        form_data.append("recommendation", formData.recommendation);
        form_data.append("link", formData.link);

        if (image) {
            form_data.append("image", image);
        }

        const res = await PostFormData.Post("/recommendations", formData);

        if (!res) return;

        if (res.success) {
            setFormData({
                category: "",
                title: "",
                recommendation: "",
                link: ""
            });

            if (fileRef.current) {
                fileRef.current.value = "";
            }
        }
    }

    return (
        <>
        <AddRecommendationsForm
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

export { AddRecommendations }
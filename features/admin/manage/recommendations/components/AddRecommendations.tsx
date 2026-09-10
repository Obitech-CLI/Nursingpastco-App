"use client";

import { SetStateAction, useRef, useState } from "react";
import { UsePost } from "@/hooks/usePost";
import { AddRecommendationsForm } from "./AddRecommendationsForm";
import { EditRecommendationType } from "@/app/admin/manage/recommendations/ManageRecommendations";

export type AddRecommendationsFormDataType = {
    category: string;
    title: string;
    recommendation: string;
    link: string;
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: EditRecommendationType,
    setEditData: React.Dispatch<SetStateAction<EditRecommendationType>>;
    editImage: File | null;
    setEditImage: React.Dispatch<SetStateAction<File | null>>;
}

function AddRecommendations({edit, setEdit, setEditData, editData, editImage, setEditImage}:Props) {

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

        const res = await PostFormData.Post("/recommendations", form_data);

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

            setImage(null);
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
        edit={edit}
        setEdit={setEdit}
        editData={editData}
        setEditData={setEditData}
        editImage={editImage}
        setEditImage={setEditImage}
        />
        </>
    )
}

export { AddRecommendations }
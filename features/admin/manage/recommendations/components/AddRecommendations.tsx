"use client";

import { SetStateAction, useRef, useState } from "react";
import { UsePost } from "@/hooks/usePost";
import { AddRecommendationsForm } from "./AddRecommendationsForm";
import { EditRecommendationType } from "@/app/admin/manage/recommendations/ManageRecommendations";
import { UsePatch } from "@/hooks/usePatch";

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
    const PatchFormData = UsePatch();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const form_data = new FormData();

        form_data.append("category", editData.category || formData.category);
        form_data.append("title", editData.title || formData.title);
        form_data.append("recommendation", editData.recommendation || formData.recommendation);
        form_data.append("link", editData.link || formData.link);

        if (image) {
            form_data.append("image", image);
        } else if (editImage) {
            form_data.append("image", editImage);
        }

        let res;

        if (!edit) {
            res = await PostFormData.Post("/recommendations", form_data);
        } else if (edit) {
            res = await PatchFormData.Patch("/recommendations", form_data);
        }

        if (res) {
            if (res.success) {
                if (!edit) {
                    setFormData({
                        category: "",
                        title: "",
                        recommendation: "",
                        link: ""
                    })
                    setImage(null);
                } else {
                    setEditData({
                        id: "",
                        category: "",
                        title: "",
                        recommendation: "",
                        link: ""
                    })
                    setEditImage(null);
                }

                if (fileRef.current) {
                    fileRef.current.value = "";
                }
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
        loading={PostFormData.loading || PatchFormData.loading}
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
"use client";

import { SetStateAction, useRef, useState } from "react";
import { UsePost } from "@/hooks/usePost";
import { AddNewsForm } from "./AddNewsForm";
import { EditNewsType } from "@/app/admin/manage/news-updates/ManageNewsUpdates";

export type AddNewsFormDataType = {
    category: string;
    title: string;
    news: string;
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: EditNewsType,
    setEditData: React.Dispatch<SetStateAction<EditNewsType>>;
    editImage: File | null;
    setEditImage: React.Dispatch<SetStateAction<File | null>>;
}

function AddNews({edit, setEdit, setEditData, editData, setEditImage, editImage}:Props) {

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

            setFocus({
                title: false,
                content: false
            });

            setImage(null);

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

export { AddNews }
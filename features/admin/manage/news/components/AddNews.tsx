"use client";

import { SetStateAction, useRef, useState } from "react";
import { UsePost } from "@/hooks/usePost";
import { AddNewsForm } from "./AddNewsForm";
import { EditNewsType } from "@/app/admin/manage/news-updates/ManageNewsUpdates";
import { UsePatch } from "@/hooks/usePatch";

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
    const PatchFormData = UsePatch();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const form_data = new FormData();

        form_data.append("category", editData.category || formData.category)
        form_data.append("title", editData.title || formData.title)
        form_data.append("news", editData.news || formData.news)

        if (image) {
            form_data.append("image", image);
        } else if (editImage) {
            form_data.append("image", editImage);
        }

        let res;

        if (!edit) {
            res = await PostFormData.Post("/news", form_data);
        } else if (edit) {
            res = await PatchFormData.Patch("/news", form_data);
        }

        if (res) {
            if (res.success) {
                if (!edit) {
                    setFormData({
                        category: "",
                        title: "",
                        news: "",
                    })
                    setImage(null);
                } else {
                    setEditData({
                        id: "",
                        category: "",
                        title: "",
                        news: ""
                    })
                    setEditImage(null)
                }

                if (fileRef.current) {
                    fileRef.current.value = "";
                }
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

export { AddNews }
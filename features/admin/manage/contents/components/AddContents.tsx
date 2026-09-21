"use client";

import { SetStateAction, useRef, useState } from "react";
import { AddContentsForm } from "./AddFormContents";
import { UsePost } from "@/hooks/usePost";
import { EditContentType } from "@/app/admin/manage/contents-tutorials/ManageContentsTutorials";
import { UsePatch } from "@/hooks/usePatch";

export type AddContentsFormDataType = {
    category: string;
    title: string;
    content: string;
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: EditContentType,
    setEditData: React.Dispatch<SetStateAction<EditContentType>>;
    editFile: File | null,
    setEditFile: React.Dispatch<SetStateAction<File | null>>;
}

function AddContents({edit, setEdit, setEditData, editData, editFile, setEditFile}:Props) {

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
    const PatchFormData = UsePatch();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const form_data = new FormData();

        form_data.append("category", editData.category || formData.category)
        form_data.append("title", editData.title || formData.title)
        form_data.append("content", editData.content || formData.content)

        if (file) {
            form_data.append("file", file);
        } else if (editFile) {
            form_data.append("file", editFile);
        }

        let res;

        if (!edit) {
            res = await PostFormData.Post("/contents", form_data);
        } else {
            res = await PatchFormData.Patch("/contents", form_data);
        }

        if (res) {
            if (res.success) {
                if (!edit) {
                    setFormData({
                        category: "",
                        title: "",
                        content: "",
                    })
                    setFile(null);
                } else {
                    setEditData({
                        id: "",
                        category: "",
                        title: "",
                        content: ""
                    })
                    setEditFile(null)
                }

                if (fileRef.current) {
                    fileRef.current.value = "";
                }
            }
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
        loading={PostFormData.loading || PatchFormData.loading}
        submit={HandleFormSubmit}
        edit={edit}
        setEdit={setEdit}
        editData={editData}
        setEditData={setEditData}
        editFile={editFile}
        setEditFile={setEditFile}
        />
        </>
    )
}

export { AddContents }
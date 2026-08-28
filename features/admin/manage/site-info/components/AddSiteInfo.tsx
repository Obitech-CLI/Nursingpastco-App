"use client";

import { SetStateAction, useState } from "react";
import { AddForm } from "./AddForm";
import { UsePost } from "@/hooks/usePost";

export type SiteInfoDataTypes = {
    category: string;
    title: string;
    sub_title: string;
    information: string;
}

export type EditSiteInfoDataTypes = {
    id: string;
    category: string;
    title: string;
    sub_title: string;
    information: string;
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: EditSiteInfoDataTypes;
    setEditData: React.Dispatch<SetStateAction<EditSiteInfoDataTypes>>;
}

function AddSiteInfo({edit, setEdit, editData, setEditData} : Props) {

    const [formData, setFormData] = useState({
        category: "",
        title: "",
        sub_title: "",
        information: ""
    })

    const [focus, setFocus] = useState({
            title: false,
            sub: false
        })

    const PostFormData = UsePost();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const res = await PostFormData.Post("/site-info", formData);

        if (!res) return;

        setFormData({
            category: "",
            title: "",
            sub_title: "",
            information: ""
        })

        setFocus({
            title: false,
            sub: false
        })
    }

    return (
        <AddForm
        formData={formData}
        setFormData={setFormData}
        submit={HandleFormSubmit}
        loading={PostFormData.loading}
        focus={focus}
        setFocus={setFocus}
        edit={edit}
        setEdit={setEdit}
        editData={editData}
        setEditData={setEditData}
        />
    )
}

export { AddSiteInfo }
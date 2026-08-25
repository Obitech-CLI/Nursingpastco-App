"use client";

import { useState } from "react";
import { AddForm } from "./AddForm";
import { UsePost } from "@/hooks/usePost";

export type SiteInfoDataTypes = {
    category: string;
    information: string;
}

function AddSiteInfo() {

    const [formData, setFormData] = useState({
        category: "",
        information: ""
    })

    const PostFormData = UsePost();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const res = await PostFormData.Post("/site-info", formData);

        if (!res) return;

        setFormData({
            category: "",
            information: ""
        })
    }

    return (
        <AddForm
        formData={formData}
        setFormData={setFormData}
        submit={HandleFormSubmit}
        loading={PostFormData.loading}
        />
    )
}

export { AddSiteInfo }
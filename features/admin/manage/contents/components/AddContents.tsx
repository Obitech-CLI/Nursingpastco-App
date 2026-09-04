"use client";

import { useState } from "react";
import { AddContentsForm } from "./AddFormContents";

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

    return (
        <>
        <AddContentsForm
        formData={formData}
        setFormData={setFormData} 
        />
        </>
    )
}

export { AddContents }
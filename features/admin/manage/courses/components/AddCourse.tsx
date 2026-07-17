"use client";

import { useState } from "react";
import { AddForm } from "./AddForm";
import { UsePost } from "@/hooks/usePost";

function AddCourse() {

    const [formData, setFormData] = useState({
        instituition: "",
        course: "",
        level: ""
    });

    const PostData = UsePost();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
    
        const res = await PostData.Post("/courses", formData);

        if (!res) return;

        setFormData({
            instituition: "",
            course: "",
            level: ""
        });
    }

    return (
        <div>
            <h2>add course</h2>
            
            <AddForm 
            formData={formData}
            setFormData={setFormData}
            onSubmit={HandleFormSubmit}
            loading={PostData.loading}
            />
        </div>
    )
}

export { AddCourse }
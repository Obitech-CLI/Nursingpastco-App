"use client";

import { useRef, useState } from "react";
import { AddForm } from "./AddForm";
import { UsePost } from "@/hooks/usePost";

function AddPastQuestion() {

    const [formData, setFormData] = useState({
        instituition: "",
        course: "",
        level: "",
        title: ""
    })

    const [pdf, setPDF] = useState<File | null>(null);

    const fileRef = useRef<HTMLInputElement>(null);

    const PostPDFData = UsePost();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const form_data = new FormData();

        form_data.append("instituition", formData.instituition);
        form_data.append("course", formData.course);
        form_data.append("level", formData.level);
        form_data.append("title", formData.title);

        if (pdf) {
            form_data.append("pdf", pdf);
        }

        const res = await PostPDFData.Post("/pastQuestions", form_data);

        if (!res) return;

        setFormData({
            instituition: "",
            course: "",
            level: "",
            title: ""
        });
        setPDF(null);
        if (fileRef.current) {
            fileRef.current.value = "";
        }
    }

    return (
        <>
        <AddForm
        formData={formData}
        setFormData={setFormData}
        setPDF={setPDF}
        loading={PostPDFData.loading}
        onSubmit={HandleFormSubmit}
        fileRef={fileRef}
        />
        </>
    )
}

export { AddPastQuestion }
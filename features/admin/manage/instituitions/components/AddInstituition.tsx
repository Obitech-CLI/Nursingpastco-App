"use client";

import { SetStateAction, useRef, useState } from "react"
import { AddForm } from "./AddForm"
import { UsePost } from "@/hooks/usePost";

type Props = {
    setReload: React.Dispatch<SetStateAction<number>>
}

function AddInstituition({setReload}:Props) {

    const [formData, setFormData] = useState({
        instituition_name: "",
        instituition_abbr: "",
    });

    const [logo, setLogo] = useState<File | null>(null);

    const fileRef = useRef<HTMLInputElement>(null);

    const PostData = UsePost();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const form_data = new FormData();

        form_data.append("instituition_name", formData.instituition_name);
        form_data.append("instituition_abbr", formData.instituition_abbr);

        if (logo) {
            form_data.append("instituition_logo", logo);
        }

        const res = await PostData.Post("/instituitions", form_data);

        if (res) {
            if (!res.success) return;

            setFormData({
                instituition_name: "",
                instituition_abbr: "",
            });

            if (fileRef.current) {
                fileRef.current.value = "";
            }

            setReload(prev => prev + 1);
        }
    }

    return (
        <AddForm
        formData={formData}
        setFormData={setFormData}
        setLogo={setLogo}
        logo={logo}
        onSubmit={HandleFormSubmit}
        loading={PostData.loading}
        fileRef={fileRef}
        />
    )
}

export { AddInstituition }
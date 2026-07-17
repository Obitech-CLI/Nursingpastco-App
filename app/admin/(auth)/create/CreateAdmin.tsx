"use client";

import { CreateForm } from "@/features/admin/auth/components/CreateForm";
import { UsePost } from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import { useState } from "react";

function CreateAdmin() {

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const router = useRouter();

    const PostCreateForm = UsePost();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        
        const res = await PostCreateForm.Post("/admin/create", formData);

        if (res) {
            if (!res.success) return;

            setFormData({
               firstname: "",
               lastname: "",
               email: "",
               password: ""
            });

            router.replace("/admin/dashboard");
        }
    }

    return (
        <>
        <CreateForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={HandleFormSubmit}
        loading={PostCreateForm.loading}
        />
        </>
    )
}

export default CreateAdmin;
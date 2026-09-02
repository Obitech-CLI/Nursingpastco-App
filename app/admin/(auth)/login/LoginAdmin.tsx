"use client";

import { LoginForm } from "@/features/admin/auth/components/LoginForm";
import { UsePost } from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginAdmin() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [remember, setRemember] = useState(false);

    const router = useRouter();

    const PostLoginForm = UsePost();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        
        const res = await PostLoginForm.Post("/admin/login", formData);

        if (res) {

            if (!res.success) return;

            if (remember) {
                localStorage.setItem("remember", JSON.stringify(formData));
            }

            localStorage.setItem("admin", JSON.stringify(res.admin));

            setFormData({
            email: "",
            password: ""
            });
        
            router.replace("/admin/dashboard");
        }
    }

    return (
        <LoginForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={HandleFormSubmit}
        loading={PostLoginForm.loading}
        remember={remember}
        setRemember={setRemember}
        />
    )
}

export default LoginAdmin;
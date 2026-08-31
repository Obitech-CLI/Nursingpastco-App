"use client";

import { LoginUserForm } from "@/features/user/auth/components/LoginForm";
import styles from "../auth.module.css";
import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { UsePost } from "@/hooks/usePost";

function LoginUser() {

    const [formData, setFormData] = useState({
            email: "",
            password: "",
        });
    
    const PostFormData = UsePost();

    const { showLoginForm, setShowCreateForm, setShowLoginForm } = UseAuthProvider();

    useEffect(() => {
        document.body.style.overflow = showLoginForm ? "hidden" : "auto";
                
        return () => { document.body.style.overflow = "auto"; }
                    
    }, [showLoginForm]);

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await PostFormData.Post("/user/login", formData);

        if (!res) return;

        if (res.success) {

            localStorage.setItem("user", JSON.stringify(res.user));

            setFormData({
                email: "",
                password: "",
            })

            setShowCreateForm(false);
            setShowLoginForm(false);
        }
    }

    return (
        <>
        {showLoginForm && (
            <div className={styles.user_auth}>
                <button onClick={() => {
                setShowLoginForm(false);
                setShowCreateForm(false);
               }}>
                <X />
               </button>
               <LoginUserForm
               formData={formData}
               setFormData={setFormData}
               loading={PostFormData.loading}
               submit={HandleFormSubmit}
               />
            </div>
        )}
        </>
    )
}

export default LoginUser;
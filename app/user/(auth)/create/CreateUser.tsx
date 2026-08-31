"use client";

import styles from "../auth.module.css";
import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { CreateUserForm } from "@/features/user/auth/components/CreateForm";
import { UsePost } from "@/hooks/usePost";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

function CreateUser() {

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        instituition: "",
        password: "",
        terms: false
    });

    const PostFormData = UsePost();

    const { showCreateForm, setShowCreateForm, setShowLoginForm } = UseAuthProvider();

    useEffect(() => {
        document.body.style.overflow = showCreateForm ? "hidden" : "auto";
                
        return () => { document.body.style.overflow = "auto";}
    }, [showCreateForm]);

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await PostFormData.Post("/user/create", formData);

        if (!res) return;

        if (res.success) {

            localStorage.setItem("user", JSON.stringify(res.user));

            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                instituition: "",
                password: "",
                terms: false
            })

            setShowCreateForm(false);
            setShowLoginForm(false);
        }
    }
    
    return (
        <>
        {showCreateForm && (
            <div className={styles.user_auth}>
                <button onClick={() => {
                setShowLoginForm(false);
                setShowCreateForm(false);
               }}>
                <X />
               </button>
               <CreateUserForm
               formData={formData}
               setFormData={setFormData}
               submit={HandleFormSubmit}
               loading={PostFormData.loading}
               />
            </div>
        )}
        </>
    )
}

export default CreateUser;
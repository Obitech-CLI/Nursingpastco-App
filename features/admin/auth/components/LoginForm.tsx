"use client";

import { LoginAdminType } from "@/types/admin";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { SetStateAction } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../style.module.css";

type FormDataProps = {
    formData: LoginAdminType;
    setFormData: React.Dispatch<SetStateAction<LoginAdminType>>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    loading: boolean;
}

function LoginForm({formData, setFormData, onSubmit, loading}:FormDataProps) {

    const HandleFormChange = (e:React.ChangeEvent<HTMLInputElement>) =>
    {
        setFormData(prev => ({...prev, [e.target.name]:e.target.value}));
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>sign in</h2>
            <h3>welcome admin</h3>

            <label><Mail />
                <input type="email" value={formData.email}
                name="email" onChange={HandleFormChange} placeholder="enter your email..."/>
            </label>

            <label><Lock/>
                <input type="password" value={formData.password}
                name="password" onChange={HandleFormChange} placeholder="enter your password..."/>
            </label>

            <button type="submit" disabled={loading}>
                {!loading ? "login" : <ClipLoader size={20}/> }
            </button>

            <div className={styles.link}>
                <h4>don't have an account?</h4>
                <Link href="/admin/create">create account</Link>
            </div>
        </form>
    )
}

export { LoginForm }
"use client";

import { LoginAdminType } from "@/types/admin";
import { LinkIcon, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { SetStateAction, useState } from "react";
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

    const [focusInput, setFocusInput] = useState({
        email: false,
        password: false,
    });

    return (
        <form onSubmit={onSubmit} className={styles.auth}>
            <h2>sign in</h2>
            <h3>welcome admin</h3>

            <label><Mail size={35}/>
                <input type="email" value={formData.email}
                name="email" onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, email: true}))
                }}/>
                <span style={{
                    top: focusInput.email ? "-0.7rem" : ""
                }}>{focusInput.email ? "enter your email" : "email"}</span>
            </label>

            <label><Lock size={35}/>
                <input type="password" value={formData.password}
                name="password" onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, password: true}))
                }}/>
                <span style={{
                    top: focusInput.password ? "-0.7rem" : ""
                }}>{focusInput.password ? "enter your password" : "password"}</span>
            </label>

            <button type="submit" disabled={loading}>
                {!loading ? "login" : <ClipLoader size={20}/> }
            </button>

            <div className={styles.link}>
                <h4>don't have an account?</h4>
                <Link href="/admin/create">create account<LinkIcon/></Link>
            </div>
        </form>
    )
}

export { LoginForm }
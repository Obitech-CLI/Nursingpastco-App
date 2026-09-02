"use client";

import { LoginAdminType } from "@/types/admin";
import { LinkIcon, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../style.module.css";

type FormDataProps = {
    formData: LoginAdminType;
    setFormData: React.Dispatch<SetStateAction<LoginAdminType>>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    loading: boolean;
    remember: boolean;
    setRemember: React.Dispatch<SetStateAction<boolean>>;
}

type storedDataType = {
    email: string;
    password: string;
}

function LoginForm({formData, setFormData, onSubmit, loading, remember, setRemember}:FormDataProps) {

    const HandleFormChange = (e:React.ChangeEvent<HTMLInputElement>) =>
    {
        setFormData(prev => ({...prev, [e.target.name]:e.target.value}));
    }

    const [focusInput, setFocusInput] = useState({
        email: false,
        password: false,
    });

    const [storedData, setStoredData] = useState<storedDataType | null>(() => {
        const stored = localStorage.getItem("remember");
        return stored ? JSON.parse(stored) : null;
    });

    console.log(JSON.stringify(formData))

    return (
        <form onSubmit={onSubmit} className="auth">

                <h3>welcome back</h3>

            <label><Mail size={30}/>
                <input type="email" value={storedData?.email} name="email" 
                onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, email: true}))
                }}
                onBlur={() => {
                    if (!formData.email || storedData?.email) {
                        setFocusInput(prev => ({...prev, email: false}))
                    }
                }}
                />
                <span style={{
                    top: focusInput.email || storedData?.email ? "-1rem" : "",
                    border: focusInput.email || storedData?.email ? "var(--border)" : ""
                }}>{focusInput.email ? "enter your email" : "email"}</span>
            </label>

            <label><Lock size={30}/>
                <input type="password" value={storedData?.password}
                name="password" 
                onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, password: true}));
                }}
                onBlur={() => {
                    if (!formData.password || !storedData?.password) {
                       setFocusInput(prev => ({...prev, password: false}))
                    }
                }}
                />
                <span style={{
                    top: focusInput.password ? "-1rem" : "",
                    border: focusInput.password ? "var(--border)" : ""
                }}>{focusInput.password ? "enter your password" : "password"}</span>
            </label>

            <div className="remember_me">
                <span>remember me</span>
                <input type="checkbox" onChange={(e) => setRemember(e.target.checked)}/>
            </div>

            <button type="submit" disabled={loading}>
                {!loading ? "login" : <ClipLoader size={20} color="black"/> }
            </button>
        </form>
    )
}

export { LoginForm }
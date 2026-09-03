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

function LoginForm({formData, setFormData, onSubmit, loading, remember, setRemember}:FormDataProps) {

    const HandleFormChange = (e:React.ChangeEvent<HTMLInputElement>) =>
    {
        setFormData(prev => ({...prev, [e.target.name]:e.target.value}));
    }

    const [focusInput, setFocusInput] = useState({
        email: false,
        password: false,
    });

    useEffect(() => {
        const stored = localStorage.getItem("remember");

        if (stored) {
            const res = JSON.parse(stored);
            setFormData({
                email: res.email,
                password: res.password
            })
            setRemember(true);
        }
    }, [])

    return (
        <form onSubmit={onSubmit} className="auth">

            <h3>welcome back</h3>

            <label><Mail size={30}/>
                <input type="email" value={formData.email} name="email" 
                onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, email: true}))
                }}
                onBlur={() => {
                    if (!formData.email) {
                        setFocusInput(prev => ({...prev, email: false}))
                    }
                }}
                />
                <span style={{
                    top: focusInput.email || formData.email? "-1rem" : "",
                    border: focusInput.email || formData.email ? "var(--border)" : ""
                }}>{focusInput.email || formData.email ? "enter your email" : "email"}</span>
            </label> 

            <label><Lock size={30}/>
                <input type="password" value={formData.password}
                name="password" 
                onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, password: true}));
                }}
                onBlur={() => {
                    if (!formData.password) {
                       setFocusInput(prev => ({...prev, password: false}))
                    }
                }}
                />
                <span style={{
                    top: focusInput.password || formData.password ? "-1rem" : "",
                    border: focusInput.password || formData.password ? "var(--border)" : ""
                }}>{focusInput.password || formData.password ? "enter your password" : "password"}</span>
            </label>

            <div className="remember_me">
                <span>remember me</span>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}/>
            </div>

            <button type="submit" disabled={loading}>
                {!loading ? "login" : (
                    <>
                    <ClipLoader size={20} color="black"/>
                    {"logging..."}
                    </>
                )}
            </button>
        </form>
    )
}

export { LoginForm }
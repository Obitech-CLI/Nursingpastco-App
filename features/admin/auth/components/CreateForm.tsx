"use client";

import { CreateAdminType } from "@/types/admin";
import { SetStateAction, useState } from "react";
import { ClipLoader } from "react-spinners";
import { User, Mail, Lock, LinkIcon } from "lucide-react";
import styles from "../style.module.css";
import Link from "next/link";

type FormDataProps = {
    formData: CreateAdminType;
    setFormData: React.Dispatch<SetStateAction<CreateAdminType>>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    loading: boolean;
}

function CreateForm({formData, setFormData, onSubmit, loading}:FormDataProps) {

    const HandleFormChange = (e:React.ChangeEvent<HTMLInputElement>) =>
    {
        setFormData(prev => ({...prev, [e.target.name]:e.target.value}));
    }

    const [focusInput, setFocusInput] = useState({
        fname: false,
        lname: false,
        email: false,
        password: false,
    });

    return (
        <form onSubmit={onSubmit} className={styles.auth}>
            <h2>sign up</h2>
            <h3>become an admin</h3>
            <label><User size={35}/>
                <input type="text" value={formData.firstname}
                name="firstname" onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, fname: true}))
                }}/>
                <span style={{
                    top: focusInput.fname ? "-0.7rem" : ""
                }}>{focusInput.fname ? "enter your firstname" : "firstname"}</span>
            </label>

            <label><User size={35}/>
                <input type="text" value={formData.lastname}
                name="lastname" onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, lname: true}))
                }}/>
                <span style={{
                    top: focusInput.lname ? "-0.7rem" : ""
                }}>{focusInput.lname ? "enter your lastname" : "lastname"}</span>
            </label>

            <label><Mail size={35}/>
                <input type="email" value={formData.email}
                name="email" onChange={HandleFormChange} onFocus={() => {
                    setFocusInput(prev => ({...prev, email: true}))
                }}/>
                <span style={{
                    top: focusInput.email ? "-0.7rem" : ""
                }}>{focusInput.email ? "enter your email address" : "email address"}</span>
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
                {!loading ? "create" : <ClipLoader size={20} />}
            </button>

            <div className={styles.link}>
                <h4>already't have an account?</h4>
                <Link href="/admin/login">login instead<LinkIcon /></Link>
            </div>
        </form>
    )
}

export { CreateForm }
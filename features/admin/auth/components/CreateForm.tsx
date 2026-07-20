"use client";

import { CreateAdminType } from "@/types/admin";
import { SetStateAction } from "react";
import { ClipLoader } from "react-spinners";
import { User, Mail, Lock } from "lucide-react";
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

    return (
        <form onSubmit={onSubmit}>
            <h2>sign up</h2>
            <h3>become an admin</h3>
            <label><User />
                <input type="text" value={formData.firstname}
                name="firstname" onChange={HandleFormChange}/>
            </label>

            <label><User />
                <input type="text" value={formData.lastname}
                name="lastname" onChange={HandleFormChange}/>
            </label>

            <label><Mail />
                <input type="email" value={formData.email}
                name="email" onChange={HandleFormChange}/>
            </label>

            <label><Lock />
                <input type="password" value={formData.password}
                name="password" onChange={HandleFormChange}/>
            </label>

            <button type="submit" disabled={loading}>
                {!loading ? "create" : <ClipLoader size={20} />}
            </button>

            <div className={styles.link}>
                <h4>already't have an account?</h4>
                <Link href="/admin/login">login instead</Link>
            </div>
        </form>
    )
}

export { CreateForm }
"use client";

import { LoginAdminType } from "@/types/admin";
import { SetStateAction } from "react";
import { ClipLoader } from "react-spinners";

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
            <label>email address
                <input type="email" value={formData.email}
                name="email" onChange={HandleFormChange}/>
            </label>

            <label>password
                <input type="password" value={formData.password}
                name="password" onChange={HandleFormChange}/>
            </label>

            <button type="submit" disabled={loading}>
                {!loading ? "login" : <ClipLoader size={20}/> }
            </button>
        </form>
    )
}

export { LoginForm }
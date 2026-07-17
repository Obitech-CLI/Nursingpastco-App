"use client";

import { CreateAdminType } from "@/types/admin";
import { SetStateAction } from "react";
import { ClipLoader } from "react-spinners";

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
            <label>firstname
                <input type="text" value={formData.firstname}
                name="firstname" onChange={HandleFormChange}/>
            </label>

            <label>lastname
                <input type="text" value={formData.lastname}
                name="lastname" onChange={HandleFormChange}/>
            </label>

            <label>email address
                <input type="email" value={formData.email}
                name="email" onChange={HandleFormChange}/>
            </label>

            <label>password
                <input type="password" value={formData.password}
                name="password" onChange={HandleFormChange}/>
            </label>

            <button type="submit" disabled={loading}>
                {!loading ? "create" : <ClipLoader size={20} />}
            </button>
        </form>
    )
}

export { CreateForm }
"use client";

import { SetStateAction, useRef, useState } from "react"
import { AddForm } from "./AddForm"
import { UsePost } from "@/hooks/usePost";
import { UsePatch } from "@/hooks/usePatch";

interface editData {
    id: string,
    instituition_name: string,
    instituition_abbr: string,
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: editData;
    setEditData: React.Dispatch<SetStateAction<editData>>;
    editLogo: File | null;
    setEditLogo: React.Dispatch<SetStateAction<File | null>>;
}

function AddInstituition({edit, setEdit, editData, setEditData, editLogo, setEditLogo} : Props) {

    const [formData, setFormData] = useState({
        instituition_name: "",
        instituition_abbr: "",
    });

    const [focusInput, setFocusInput] = useState({
        name: false,
        abbr: false,
    })

    const [logo, setLogo] = useState<File | null>(null);

    const fileRef = useRef<HTMLInputElement>(null);

    const PostData = UsePost();
    const PatchData = UsePatch();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        if (!edit) {

            const form_data = new FormData();

            form_data.append("instituition_name", formData.instituition_name);
            form_data.append("instituition_abbr", formData.instituition_abbr);

            if (logo) {
            form_data.append("instituition_logo", logo);
            }

            const res = await PostData.Post("/instituitions", form_data);

            if (!res) return;

            setFormData({
                instituition_name: "",
                instituition_abbr: "",
            });

            setLogo(null)

            if (fileRef.current) {
                fileRef.current.value = "";
            }
        } else {

            const formData = new FormData();

            formData.append("id", editData.id);
            formData.append("instituition_name", editData.instituition_name);
            formData.append("instituition_abbr", editData.instituition_abbr);

        if (editLogo) {
            formData.append("instituition_logo", editLogo);
        }

        const res = await PatchData.Patch("/instituitions", formData);

        if (!res) return;

        if (res.success) {

            setEditData({
                id: "",
                instituition_name: "",
                instituition_abbr: "",
            });

            setEdit(false);

            setEditLogo(null);

            setFocusInput({
                name: false,
                abbr: false
            })

            if (fileRef.current) {
                fileRef.current.value = "";
            }
        }
        }

    }

    return (
        <AddForm
        formData={formData}
        setFormData={setFormData}
        setLogo={setLogo}
        logo={logo}
        onSubmit={HandleFormSubmit}
        loading={PostData.loading}
        fileRef={fileRef}
        edit={edit}
        setEdit={setEdit}
        editData={editData}
        setEditData={setEditData}
        focusInput={focusInput}
        setFocusInput={setFocusInput}
        editLogo={editLogo}
        setEditLogo={setEditLogo}
        updateLoading={PatchData.loading}
        />
    )
}

export { AddInstituition }
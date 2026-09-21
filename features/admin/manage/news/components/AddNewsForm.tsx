"use client";

import { UseFetch } from "@/hooks/useFetch";
import { Check, ChevronDown, ChevronUp, Image, X } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { AddNewsFormDataType } from "./AddNews";
import { EditNewsType } from "@/app/admin/manage/news-updates/ManageNewsUpdates";

export type CategoryType = {
    id: number;
    category: string;
}

export type FocusType = {
    title: boolean;
    content: boolean;
}

type Props = {
    formData: AddNewsFormDataType;
    setFormData: React.Dispatch<SetStateAction<AddNewsFormDataType>>;
    focus: FocusType;
    setFocus: React.Dispatch<SetStateAction<FocusType>>;
    fileRef: React.RefObject<HTMLInputElement | null>;
    image: File | null;
    setImage: React.Dispatch<SetStateAction<File | null>>;
    loading: boolean;
    submit: React.FormEventHandler<HTMLFormElement>;
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: EditNewsType,
    setEditData: React.Dispatch<SetStateAction<EditNewsType>>;
    editImage: File | null;
    setEditImage: React.Dispatch<SetStateAction<File | null>>;
}

function AddNewsForm({editImage, setEditImage, formData, setFormData, focus, setFocus, image, setImage, fileRef, loading, submit, edit, editData, setEditData, setEdit} : Props) {

    const [ categories, setCategories ] = useState<CategoryType[]>([]);

    const [ showCategories, setShowCategories ] = useState(false);

    const FetchCategories = UseFetch();
    
    const HandleFetchCategories = async () =>
    {
        const res = await FetchCategories.Fetch("/news/categories");

        if (!res) return;

        if (res.success) {
            setCategories(res.categories)
        }
    }

    const HandleSelect = (category: string) => {
        setFormData(prev => ({...prev, category: category}));
        setShowCategories(false);
    }

    useEffect(() => {
        HandleFetchCategories();
    }, []);

    const CancelEdit = () => {
        setEdit(false);
        setEditData({
            id: "",
            category: "",
            title: "",
            news: ""
        });
        setEditImage(null);
    }

    return (
        <form className="add" onSubmit={submit}>

            {edit && (
                <span onClick={CancelEdit}>
                    cancel update <X color="red"/>
                </span>
            )}

            <label className="select">
                <>
                {!edit && (<>{formData.category ? formData.category : "select category"}</>)}
                {edit && (<>{editData.category && editData.category}</>)}

                <div onClick={() => {
                    setShowCategories(true);
                }}>
                    {showCategories ? <ChevronDown /> : <ChevronUp />}
                </div>
                </>

                {showCategories && (
                    <ul>
                    <span onClick={() => setShowCategories(false)}>
                        <X />
                    </span>
                    <h2>select</h2>
                    {!FetchCategories.loading ? (
                        <>
                        {categories.length > 0 ? (
                            <>
                            {categories.map(c => (
                                <li key={c.id} onClick={() => {
                                    if (!edit) {
                                        HandleSelect(c.category);
                                        return;
                                    }
                                    setEditData(prev => ({...prev, category: c.category}));
                                }}>
                                    {c.category}
                                </li>
                            ))}
                            </>
                        ) : (
                            <div className="retry">
                                <p>{FetchCategories.error}</p>
                                <button type="button" onClick={HandleFetchCategories}>
                                    retry
                                </button>
                            </div>
                        )}
                        </>
                    ) : (
                        <div className="loading">
                            <ClipLoader size={40} color="var(--bg-txt-color)"/>
                        </div>
                    )}
                    </ul>
                )}
            </label>

            <label>
                <span style={{
                    top: focus.title || edit ? "-1rem" : ""
                }}>
                    <>
                    {!edit && (<>{focus.title ? "enter title" : "title"}</>)}
                    {edit && (<>{edit ? "update title" : "title"}</>)}
                    </>
                </span>

                <input type="text" value={edit ? editData.title : formData.title}
                onChange={(e) => {
                    if (!edit) {
                        setFormData(prev => ({...prev, title: e.target.value}));
                        return;
                    }
                    setEditData(prev => ({...prev, title: e.target.value}));
                }}
                onFocus={() => {
                    if (!edit) {
                        setFocus(prev => ({...prev, title: true}));
                    }
                }}
                onBlur={() => {
                    if (!formData.title) {
                        setFocus(prev => ({...prev, title: false}));
                    }
                }}
                />
            </label>

            <label className="file">
                <Image size={30}/>
                <span>
                    <>
                    {!edit && (
                        <>
                        {image ? "image selected" : "select an image"}
                        {image && <Check />}
                        </>
                    )}
                    {edit && (
                        <>
                        {editImage ? "image selected" : "update image"}
                        {editImage && <Check />}
                        </>
                    )}
                    </>
                </span>
                <input type="file" ref={fileRef} accept="image/*"
                    onChange={(e) => {
                    if (e.target.files) {
                        if (!edit) {
                            setImage(e.target.files?.[0] ?? null);
                            return;
                        }
                        setEditImage(e.target.files?.[0] ?? null)
                    }
                }}/>
            </label>

            <label>
                <textarea placeholder="enter news/updates" 
                value={edit ? editData.news : formData.news}
                onChange={(e) => {
                    if (!edit) {
                        setFormData(prev => ({...prev, news: e.target.value}));
                        return
                    }
                    setEditData(prev => ({...prev, news: e.target.value}));
                }}/>
            </label>

            <button type="submit" disabled={loading}>
                <>
                {!edit && (
                    <>
                    {loading ? "adding..." : "add"}
                    {loading && <ClipLoader size={30} color="black" />}
                    </>
                )}
                {edit && (
                    <>
                    {loading ? "updating..." : "update"}
                    {loading && <ClipLoader size={30} color="black" />}
                    </>
                )}
                </>
            </button>
        </form>
    )
}

export { AddNewsForm }
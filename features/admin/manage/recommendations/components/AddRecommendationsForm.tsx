"use client";

import { UseFetch } from "@/hooks/useFetch";
import { Check, ChevronDown, ChevronUp, Image, X } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { AddRecommendationsFormDataType } from "./AddRecommendations";
import { EditRecommendationType } from "@/app/admin/manage/recommendations/ManageRecommendations";

export type CategoryType = {
    id: number;
    category: string;
}

export type FocusType = {
    title: boolean;
    content: boolean;
    link: boolean;
}

type Props = {
    formData: AddRecommendationsFormDataType;
    setFormData: React.Dispatch<SetStateAction<AddRecommendationsFormDataType>>;
    focus: FocusType;
    setFocus: React.Dispatch<SetStateAction<FocusType>>;
    fileRef: React.RefObject<HTMLInputElement | null>;
    image: File | null;
    setImage: React.Dispatch<SetStateAction<File | null>>;
    postLoading: boolean;
    submit: React.FormEventHandler<HTMLFormElement>;
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: EditRecommendationType,
    setEditData: React.Dispatch<SetStateAction<EditRecommendationType>>;
    editImage: File | null;
    setEditImage: React.Dispatch<SetStateAction<File | null>>;
}

function AddRecommendationsForm({editImage, setEditImage, formData, setFormData, focus, setFocus, image, setImage, fileRef, postLoading, submit, edit, editData, setEditData, setEdit} : Props) {

    const [ categories, setCategories ] = useState<CategoryType[]>([]);

    const [ showCategories, setShowCategories ] = useState(false);

    const FetchCategories = UseFetch();
    
    const HandleFetchCategories = async () =>
    {
        const res = await FetchCategories.Fetch("/recommendations/categories");

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
            recommendation: "",
            link: ""
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
                    {showCategories ? <ChevronUp /> : <ChevronDown /> }
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
                        {image && <Check color="green"/>}
                        </>
                    )}
                    {edit && (
                        <>
                        {editImage ? "image selected" : "update image"}
                        {editImage && <Check color="green"/>}
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
                        setEditImage(e.target.files?.[0] ?? null);
                    }
                }}/>
            </label>

            <label>
                <textarea placeholder="enter content" 
                value={edit ? editData.recommendation : formData.recommendation}
                onChange={(e) => {
                    if (!edit) {
                        setFormData(prev => ({...prev, recommendation: e.target.value}));
                        return
                    }
                    setEditData(prev => ({...prev, recommendation: e.target.value}));
                }}/>
            </label>

            <label>
                <span style={{
                    top: focus.link || edit ? "-1rem" : ""
                }}>
                    <>
                    {!edit && (<>{focus.link ? "enter link" : "link"}</>)}
                    {edit && (<>{edit ? "update link" : "link"}</>)}
                    </>
                </span>
                <input type="text" value={edit ? editData.link : formData.link}
                onChange={(e) => {
                    if (!edit) {
                        setFormData(prev => ({...prev, link: e.target.value}));
                        return;
                    }
                    setEditData(prev => ({...prev, link: e.target.value}))
                }}
                onFocus={() => {
                    if (!edit) {
                        setFocus(prev => ({...prev, link: true}));
                    }
                }}
                onBlur={() => {
                    if (!formData.link) {
                        setFocus(prev => ({...prev, link: false}));
                    }
                }}
                />
            </label>

            <button type="submit" disabled={postLoading}>
                <>
                {!edit && (
                    <>
                    {postLoading ? "adding..." : "add"}
                    {postLoading && <ClipLoader size={30} color="black" />}
                    </>
                )}
                {edit && (
                    <>
                    {postLoading ? "updating..." : "update"}
                    {postLoading && <ClipLoader size={30} color="black" />}
                    </>
                )}
                </>
            </button>
        </form>
    )
}

export { AddRecommendationsForm }
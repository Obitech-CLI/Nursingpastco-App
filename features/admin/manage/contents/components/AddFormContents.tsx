"use client";

import { UseFetch } from "@/hooks/useFetch";
import { Check, ChevronDown, ChevronUp, Image, Video, X } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { AddContentsFormDataType } from "./AddContents";
import { EditContentType } from "@/app/admin/manage/contents-tutorials/ManageContentsTutorials";

export type CategoryType = {
    id: number;
    category: string;
}

export type FocusType = {
    title: boolean;
    content: boolean;
}

type Props = {
    formData: AddContentsFormDataType;
    setFormData: React.Dispatch<SetStateAction<AddContentsFormDataType>>;
    focus: FocusType;
    setFocus: React.Dispatch<SetStateAction<FocusType>>;
    fileRef: React.RefObject<HTMLInputElement | null>;
    file: File | null;
    setFile: React.Dispatch<SetStateAction<File | null>>;
    postLoading: boolean;
    submit: React.FormEventHandler<HTMLFormElement>;
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: EditContentType,
    setEditData: React.Dispatch<SetStateAction<EditContentType>>;
    editFile: File | null,
    setEditFile: React.Dispatch<SetStateAction<File | null>>;
}

function AddContentsForm({editFile, setEditFile, formData, setFormData, focus, setFocus, file, setFile, fileRef, postLoading, submit, edit, editData, setEditData, setEdit} : Props) {

    const [ categories, setCategories ] = useState<CategoryType[]>([]);

    const [ showCategories, setShowCategories ] = useState(false);

    const FetchCategories = UseFetch();

    const [ video, setVideo ] = useState(false);
    const [ image, setImage ] = useState(false);
    
    const HandleFetchCategories = async () =>
    {
        const res = await FetchCategories.Fetch("/contents/categories");

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
            content: ""
        });
        setEditFile(null);
        setVideo(false);
        setImage(false);
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

            <div className="video-image-switch">
                {!image && (
                    <button type="button" onClick={() => {
                    setImage(true);
                    setVideo(false);
                    }}>{edit ? "update image" : "add image"}</button>
                )}

                {!video && (
                    <button type="button" onClick={() => {
                    setVideo(true);
                    setImage(false);
                    }}>{edit ? "update video" : "add video"}</button>
                )}
            </div>

            <label className="file">
                {image && (
                    <>
                    <Image size={30}/>
                    <span>
                        {!edit && (
                            <>
                            {file ? "image selected" : "select an image"}
                            {file && <Check color="green"/>}
                            </>
                        )}
                        {edit && (
                            <>
                            {editFile ? "image selected" : "update image"}
                            {editFile && <Check color="green"/>}
                            </>
                        )}
                    </span>

                     <input type="file" ref={fileRef} accept="image/*"
                    onChange={(e) => {
                    if (e.target.files) {
                        if (!edit) {
                            setFile(e.target.files?.[0] ?? null);
                            return;
                        }
                        setEditFile(e.target.files?.[0] ?? null)
                    }
                    }}/>
                    </>
                )}

                {video && (
                    <>
                    <Video size={30}/>
                    <span>
                        {!edit && (
                            <>
                            {file ? "video selected" : "select a video"}
                            {file && <Check color="green"/>}
                            </>
                        )}
                        {edit && (
                            <>
                            {editFile ? "video selected" : "update video"}
                            {editFile && <Check color="green"/>}
                            </>
                        )}
                    </span>

                     <input type="file" ref={fileRef} accept="video/*"
                    onChange={(e) => {
                    if (e.target.files) {
                        if (!edit) {
                            setFile(e.target.files?.[0] ?? null);
                            return;
                        }
                        setEditFile(e.target.files?.[0] ?? null);
                    }
                    }}/>
                    </>
                )}
            </label>

            <label>
                <textarea placeholder="enter content" 
                value={edit ? editData.content : formData.content}
                onChange={(e) => {
                    if (!edit) {
                        setFormData(prev => ({...prev, content: e.target.value}));
                        return
                    }
                    setEditData(prev => ({...prev, content: e.target.value}));
                }}/>
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

export { AddContentsForm }
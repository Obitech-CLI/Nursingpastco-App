"use client";

import { UseFetch } from "@/hooks/useFetch";
import { Check, ChevronDown, ChevronUp, Image, X } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { AddRecommendationsFormDataType } from "./AddRecommendations";

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
}

function AddRecommendationsForm({formData, setFormData, focus, setFocus, image, setImage, fileRef, postLoading, submit} : Props) {

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

    return (
        <form className="add" onSubmit={submit}>
            <label className="select">
                <>
                {formData.category ? formData.category : "select category"}
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
                                <li key={c.id} onClick={() => HandleSelect(c.category)}>
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
                    top: focus.title ? "-1rem" : ""
                }}>
                    {focus.title ? "enter title" : "title"}
                </span>
                <input type="text" value={formData.title}
                onChange={(e) => {
                    setFormData(prev => ({...prev, title: e.target.value}))
                }}
                onFocus={() => {
                    setFocus(prev => ({...prev, title: true}));
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
                    {image ? "image selected" : "select an image"}
                    {image && <Check />}
                </span>
                <input type="file" ref={fileRef} accept="image/*"
                    onChange={(e) => {
                    if (e.target.files) {
                        setImage(e.target.files?.[0] ?? null)
                    }
                }}/>
            </label>

            <label>
                <textarea placeholder="enter content" value={formData.recommendation}
                onChange={(e) => {
                    setFormData(prev => ({...prev, content: e.target.value}));
                }}/>
            </label>

            <label>
                <span style={{
                    top: focus.link ? "-1rem" : ""
                }}>
                    {focus.link ? "enter link" : "link"}
                </span>
                <input type="text" value={formData.link}
                onChange={(e) => {
                    setFormData(prev => ({...prev, link: e.target.value}))
                }}
                onFocus={() => {
                    setFocus(prev => ({...prev, link: true}));
                }}
                onBlur={() => {
                    if (!formData.link) {
                        setFocus(prev => ({...prev, link: false}));
                    }
                }}
                />
            </label>

            <button type="submit" disabled={postLoading}>
                {postLoading ? "adding..." : "add"}
                {postLoading && <ClipLoader size={30} color="black" />}
            </button>
        </form>
    )
}

export { AddRecommendationsForm }
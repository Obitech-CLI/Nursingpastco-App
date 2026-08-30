"use client";

import { AppInfoCategories } from "@/ui/AppContent";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { EditSiteInfoDataTypes, SiteInfoDataTypes } from "./AddSiteInfo";
import { ClipLoader } from "react-spinners";

type focusType = {
    title: boolean;
    sub: boolean;
}

type Props = {
    formData: SiteInfoDataTypes;
    setFormData: React.Dispatch<SetStateAction<SiteInfoDataTypes>>;
    submit: React.FormEventHandler<HTMLFormElement>;
    loading: boolean;
    focus: focusType;
    setFocus: React.Dispatch<SetStateAction<focusType>>;
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: EditSiteInfoDataTypes;
    setEditData: React.Dispatch<SetStateAction<EditSiteInfoDataTypes>>;
}

function AddForm({formData, setFormData, submit, loading, focus, setFocus, edit, setEdit, editData, setEditData}: Props) {

    const [showCategories, setShowCategories] = useState(false);

    useEffect(() => {
        document.body.style.overflow = showCategories ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [showCategories])

    const CancelEdit = () => {
        setEdit(false);
        setEditData({
            id: "",
            category: "",
            title: "",
            sub_title: "",
            information: ""
        })
    }

    return (
        <>
        <form onSubmit={submit}>

            {edit && (
                <span onClick={CancelEdit}>
                    cancel update <X color="red"/>
                </span>
            )}

            <label className="select" onClick={() => {
                setShowCategories(!showCategories)
            }}>
                {formData.category || editData.category ? formData.category || editData.category : "select category"}
                {showCategories ? <ChevronDown /> : <ChevronUp />}

                {showCategories && (
                    <>
                    {AppInfoCategories.length > 0 && (
                        <ul>
                            <span onClick={() => setShowCategories(false)}><X /></span>
                            <h2>select</h2>
                            {AppInfoCategories.map(category => (
                                <li key={category.id}
                                onClick={() => {
                                    if (edit) {
                                        setEditData(prev => ({...prev, category: category.category}))
                                        return;
                                    }
                                    setFormData(prev => ({...prev, category: category.category}));
                                }}>
                                {category.category}
                                </li>
                            ))}
                        </ul>
                    )}
                    </>
                )}
            </label>

            <label>
                <span
                style={{
                    top: focus.title || editData.title ? "-1rem" : "",
                    border: focus.title || editData.title ? "var(--border)" : "",
                    padding: focus.title || editData.title ? "0.3rem 0.6rem" : ""
                }}
                >
                    {focus.title || edit ? (
                        <>
                        {edit ? "update title" : "enter title"}
                        </>
                    ) : (
                        <>
                        {edit ? "" : "title"}
                        </>
                    )}
                </span>
                <input type="text" value={edit ? editData.title : formData.title}
                onChange={(e) => {
                    if (edit) {
                        setEditData(prev => ({...prev, title: e.target.value}));
                        return;
                    }
                    setFormData(prev => ({...prev, title: e.target.value}))
                }}
                onFocus={() => setFocus(prev => ({...prev, title: true}))}
                />
            </label>

            <label>
                <span
                style={{
                    top: focus.sub || editData.sub_title ? "-1rem" : "",
                    border: focus.sub || editData.sub_title ? "var(--border)" : "",
                    padding: focus.sub || editData.sub_title ? "0.3rem 0.6rem" : ""
                }}
                >
                    {focus.sub || edit ? (
                        <>
                        {edit ? "update sub title" : "enter sub title"}
                        </>
                    ) : (
                        <>
                        {edit ? "" : "sub title"}
                        </>
                    )}
                </span>
                <input type="text" value={edit ? editData.sub_title : formData.sub_title}
                onChange={(e) => {
                    if (edit) {
                        setEditData(prev => ({...prev, sub_title: e.target.value}));
                        return;
                    }
                    setFormData(prev => ({...prev, sub_title: e.target.value}));
                }}
                onFocus={() => setFocus(prev => ({...prev, sub: true}))}
                />
            </label>

            <div>
                <textarea value={edit ? editData.information : formData.information}
                onChange={(e) => setFormData(prev => ({...prev, information: e.target.value}))}
                placeholder={edit ? "update information" : "enter information"}/>
            </div>

            <button type="submit" disabled={loading}>
                {loading ? <ClipLoader size={20} color="black"/> : (<>{edit ? "update" : "add"}</>)}
            </button>
        </form>
        </>
    )
}

export { AddForm }
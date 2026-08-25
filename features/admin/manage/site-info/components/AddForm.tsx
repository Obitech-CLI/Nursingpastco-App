"use client";

import { AppInfoCategories } from "@/ui/AppContent";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { SiteInfoDataTypes } from "./AddSiteInfo";
import { ClipLoader } from "react-spinners";

type Props = {
    formData: SiteInfoDataTypes,
    setFormData: React.Dispatch<SetStateAction<SiteInfoDataTypes>>,
    submit: React.FormEventHandler<HTMLFormElement>;
    loading: boolean;
}

function AddForm({formData, setFormData, submit, loading}: Props) {

    const [showCategories, setShowCategories] = useState(false);

    useEffect(() => {
        document.body.style.overflow = showCategories ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [showCategories])

    return (
        <>
        <form className="add" onSubmit={submit}>
            <label onClick={() => {
                setShowCategories(!showCategories)
            }}>
                {formData.category ? formData.category : "select category"}
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
                                    setFormData(prev => ({...prev, category: category.category}))
                                }}>
                                {category.category}
                                </li>
                            ))}
                        </ul>
                    )}
                    </>
                )}
            </label>

            <div>
                <textarea
                onChange={(e) => setFormData(prev => ({...prev, information: e.target.value}))}
                placeholder="enter information"/>
            </div>

            <button type="submit" disabled={loading}>
                {loading ? <ClipLoader size={20} color="white"/> : "add"}
            </button>
        </form>
        </>
    )
}

export { AddForm }
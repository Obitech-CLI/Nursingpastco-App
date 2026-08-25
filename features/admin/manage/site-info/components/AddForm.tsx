"use client";

import { AppInfoCategories } from "@/ui/AppContent";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { SiteInfoDataTypes } from "./AddSiteInfo";

type Props = {
    formData: SiteInfoDataTypes,
    setFormData: React.Dispatch<SetStateAction<SiteInfoDataTypes>>
}

function AddForm({formData, setFormData}: Props) {

    const [showCategories, setShowCategories] = useState(false);

    useEffect(() => {
        document.body.style.overflow = showCategories ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [showCategories])

    return (
        <>
        <form className="add">
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

            <button type="submit">
                add
            </button>
        </form>
        </>
    )
}

export { AddForm }
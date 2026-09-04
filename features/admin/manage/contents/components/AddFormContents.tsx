"use client";

import { UseFetch } from "@/hooks/useFetch";
import { ChevronDown, X } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { AddContentsFormDataType } from "./AddContents";

export type CategoryType = {
    id: number;
    category: string;
}

type Props = {
    formData: AddContentsFormDataType;
    setFormData: React.Dispatch<SetStateAction<AddContentsFormDataType>>;
}

function AddContentsForm({formData, setFormData} : Props) {

    const [ categories, setCategories ] = useState<CategoryType[]>([]);

    const [ showCategories, setShowCategories ] = useState(false);

    const FetchCategories = UseFetch();
    
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
    }

    useEffect(() => {
        HandleFetchCategories();
    }, []);

    return (
        <form className="add">
            <label className="select">
                <>
                {formData.category ? formData.category : "select category"}
                </>

                {showCategories && (
                    <ul>
                    <h2>select</h2>
                    {!FetchCategories.loading ? (
                        <>
                        {categories.length > 0 ? (
                            <>
                            {categories.map(c => (
                                <li key={c.id} onClick={() => {HandleSelect(c.category)}}>
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
                <span>title</span>
                <input type="text" />
            </label>

            <label>
                <textarea placeholder="enter content"/>
            </label>

            <button type="submit">
                add
            </button>
        </form>
    )
}

export { AddContentsForm }
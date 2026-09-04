"use client";

import { UsePost } from "@/hooks/usePost";
import { SetStateAction, useState } from "react";
import { ClipLoader } from "react-spinners";
import { CategoryType } from "./Categories";
import { UsePatch } from "@/hooks/usePatch";
import { X } from "lucide-react";

type Props = {
    editCategory: boolean;
    setEditCategory: React.Dispatch<SetStateAction<boolean>>;
    editCategoryData: CategoryType;
    setEditCategoryData: React.Dispatch<SetStateAction<CategoryType>>;
    setReloadCategories: React.Dispatch<SetStateAction<number>>;
}

function AddRecommenationCategory({editCategory, setEditCategory, setEditCategoryData, editCategoryData, setReloadCategories} : Props) {

    const [ category, setCategory ] = useState("");

    const [ focus, setFocus ] = useState(false);

    const PostFormData = UsePost();
    const PatchFormData = UsePatch();

    const HandleSubmitForm = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        if (editCategory) {
            const res = await PatchFormData.Patch("/recommendations/categories", editCategoryData);

            if (!res) return;

            if (res.success) {
               setEditCategoryData({
                id: "",
                category: ""
               })
               setFocus(false);
               setEditCategory(false);
               setReloadCategories(prev => (prev + 1));
            }

        } else {
            const res = await PostFormData.Post("/recommendations/categories", {category: category});

            if (!res) return;

            if (res.success) {
               setCategory("");
               setFocus(false);
               setReloadCategories(prev => (prev + 1));
            }
        }
    }

    const CancelEdit = () => {
        setEditCategory(false);
        setEditCategoryData({
            id: "",
            category: ""
        })
    }

    return (
        <form className="add" onSubmit={HandleSubmitForm}>

            {editCategory && (
                <span onClick={CancelEdit}>
                    cancel update <X color="red"/>
                </span>
            )}

            <h3>{editCategory ? "update category" : "add category"}</h3>

            <label>
                <span style={{
                    top: focus || editCategory ? "-1rem" : ""
                }}>
                    {!editCategory ? (
                        <>
                        {focus ? "enter a category" : "category"}
                        </>
                    ) : (
                        <>
                        {editCategoryData.category ? "update category" : "category"}
                        </>
                    )}
                </span>
                <input type="text" value={editCategoryData.category || category}
                onFocus={() => setFocus(true)}
                onBlur={() => {
                    if (!category) {
                        setFocus(false)
                    }
                }}
                onChange={(e) => {
                    if (editCategory) {
                        setEditCategoryData(prev => ({...prev, category: e.target.value}));
                        return;
                    }
                    setCategory(e.target.value)
                }}
                />
            </label>

            <button type="submit" disabled={PostFormData.loading || PatchFormData.loading}>
                {!editCategory ? (
                    <>
                    {!PostFormData.loading ? (
                        <>add</>
                    ) : (
                        <>
                        <ClipLoader size={25} color="black"/>
                        {"adding..."}
                        </>
                    )}
                    </>
                ) : (
                    <>
                    {!PatchFormData.loading ? (
                        <>update</>
                    ) : (
                        <>
                        <ClipLoader size={25} color="black"/>
                        {"updating..."}
                        </>
                    )}
                    </>
                )}
            </button>
        </form>
    )
}

export { AddRecommenationCategory }
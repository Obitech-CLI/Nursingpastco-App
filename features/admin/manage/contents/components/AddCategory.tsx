"use client";

import { UsePost } from "@/hooks/usePost";
import { SetStateAction, useState } from "react";
import { ClipLoader } from "react-spinners";
import { CategoryType } from "./Categories";
import { X } from "lucide-react";
import { UsePatch } from "@/hooks/usePatch";

type Props = {
    editCategory: boolean;
    setEditCategory: React.Dispatch<SetStateAction<boolean>>;
    editCategoryData: CategoryType;
    setEditCategoryData: React.Dispatch<SetStateAction<CategoryType>>;
}

function AddContentCategory({editCategory, setEditCategory, setEditCategoryData, editCategoryData} : Props) {

    const [ category, setCategory ] = useState("");

    const [ focus, setFocus ] = useState(false);

    const PostFormData = UsePost();
    const PatchFormData = UsePatch();

    const HandleSubmitForm = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        if (editCategory) {
            const res = await PatchFormData.Patch("/contents/categories", editCategoryData);

            if (!res) return;

            if (res.success) {
               setEditCategoryData({
                id: "",
                category: ""
               })
               setFocus(false);
               setEditCategory(false);
            }

        } else {
            const res = await PostFormData.Post("/contents/categories", {category: category});

            if (!res) return;

            if (res.success) {
               setCategory("");
               setFocus(false);
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
                    {focus ? (
                        "enter a category"
                    ) : "category"}

                </span>
                <input type="text" value={editCategoryData.category ?? category}
                onFocus={() => setFocus(true)}
                onBlur={() => {
                    if (!category) {
                        setFocus(false)
                    }
                }}
                onChange={(e) => {
                    if (editCategory) {
                        setEditCategoryData(prev => ({...prev, category: e.target.value}))
                    }
                    setCategory(e.target.value)
                }}
                />
            </label>

            <button type="submit" disabled={PostFormData.loading}>
                {!PostFormData.loading || !PatchFormData.loading ? (
                    <>
                    {editCategory ? "update" : "add"}
                    </>
                ) : (
                    <>
                    <ClipLoader size={25} color="black"/>
                    {editCategory ? "updating..." : "adding..."}
                    </>
                )}
            </button>
        </form>
    )
}

export { AddContentCategory }
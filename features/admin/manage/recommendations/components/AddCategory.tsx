"use client";

import { UsePost } from "@/hooks/usePost";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

function AddRecommenationCategory() {

    const [ category, setCategory ] = useState("");

    const [ focus, setFocus ] = useState(false);

    const PostFormData = UsePost();

    const HandleSubmitForm = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const res = await PostFormData.Post("/recommendations/categories", {category: category});

        if (!res) return;

        if (res.success) {
            setCategory("");
            setFocus(false);
        }
    }

    return (
        <form className="add" onSubmit={HandleSubmitForm}>

            <h3>add category</h3>

            <label>
                <span style={{
                    top: focus ? "-1rem" : ""
                }}>{focus ? "enter a category" : "category"}</span>
                <input type="text" value={category}
                onFocus={() => setFocus(true)}
                onBlur={() => {
                    if (!category) {
                        setFocus(false)
                    }
                }}
                onChange={(e) => setCategory(e.target.value)}
                />
            </label>

            <button type="submit" disabled={PostFormData.loading}>
                {!PostFormData.loading ? (
                    "add"
                ) : (
                    <>
                    <ClipLoader size={25} color="black"/>
                    {"adding..."}
                    </>
                )}
            </button>
        </form>
    )
}

export { AddRecommenationCategory }
"use client";

import { UseFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { CategoryType } from "./Categories";
import Image from "next/image";

type ContentsType = {
    id: number;
    category: string;
    title: string;
    content: string;
    file: string;
    created_at: string;
}

function ModifyContents() {

    const [ contents, setContents ] = useState<ContentsType []>([]);

    const [ categories, setCategories ] = useState<CategoryType[]>([]);

    const [ category, setCategory ] = useState("");

    const FetchContents = UseFetch();
    const FetchCategories = UseFetch();

    const HandleFetchCategories = async () =>
    {
        const res = await FetchCategories.Fetch("/contents/categories");

        if (!res) return;

        if (res.success) {
            setCategories(res.categories)
        }
    }

    const HandleFetchContents = async () =>
    {
        if (!category) return;

        const res = await FetchContents.Fetch(`/contents?category=${category}`);

        if (!res) return;

        if (res.success) {
            setContents(res.contents)
        }

    }

    useEffect(() => {
        HandleFetchCategories();
    },[]);

    useEffect(() => {
        HandleFetchContents();
    },[category]);

    const e = contents[0]?.file.slice(contents[0]?.file.lastIndexOf(".") + 1);
    console.log(e)

    return (
        <div className="modify-section">
            <div className="change-btns">
            {!FetchCategories.loading ? (
                <>
                {categories.length > 0 ? (
                    <>
                    {categories.map(c => (
                        <button type="button" key={c.id} onClick={() => {
                            setContents([]);
                            setCategory(c.category);
                        }}
                        style={{
                            backgroundColor: category === c.category ? "transparent" : "",
                            color: category === c.category ? "var(--bg-txt-color)" : "",
                            border: category === c.category ? "var(--border)" : ""
                        }}>
                            {c.category}
                        </button>
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
                <ClipLoader size={50} color="var(--bg-txt-color)"/>
                </div>
            )}
            </div>
            
            {category && (
                <section>
                {!FetchContents.loading ? (
                <>
                {contents.length > 0 ? (
                    <>
                    <h2>{contents[0].category}</h2>
                    {contents.map(c => (
                        <article key={c.id}>
                            <span>{new Date(c.created_at).toLocaleDateString("en-US", {
                                day: "numeric",
                                weekday: "short",
                                month: "short",
                                year: "numeric"
                            })}</span>
                            <h3>{c.title}</h3>

                            {["mp4", "webm", "mov", "m4v"].includes(c.file.slice(c.file.lastIndexOf(".") + 1).toLowerCase()) && (
                                <video src={c.file} controls />
                            )}
                            {["jpg", "jpeg", "png", "gif", "webp", "avif", "svg"].includes(c.file.slice(c.file.lastIndexOf(".") + 1).toLowerCase()) && (
                                <Image alt="" src={c.file} width={500} height={300}/>
                            )}
                            <p>{c.content}</p>
                        </article>
                    ))}
                    </>
                ) : (
                    <div className="retry">
                    <p>{FetchContents.error}</p>
                    <button type="button" onClick={HandleFetchContents}>
                        retry
                    </button>
                    </div>
                )}
                </>
            ) : (
              <div className="loading">
                <ClipLoader size={50} color="var(--bg-txt-color)"/>
              </div>
            )}
            </section>
        )}
    </div>
)}

export { ModifyContents }
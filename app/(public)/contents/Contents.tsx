"use client";

import { UseFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { ChevronLeft, ChevronRight, RotateCcw, Search, X } from "lucide-react";
import styles from "./contents.module.css";

type ContentsType = {
    id: number;
    category: string;
    title: string;
    content: string;
    file: string;
    created_at: string;
}

type CategoryType = {
    id: number;
    category: string;
}

function Contents() {

    const [ contents, setContents ] = useState<ContentsType []>([]);

    const [ categories, setCategories ] = useState<CategoryType[]>([]);

    const [ category, setCategory ] = useState("");
    const [ search, setSearch ] = useState("");
    const [ page, setPage ] = useState(1);

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
        const res = await FetchContents.Fetch(`/contents?category=${category}&search=${search}&page=${page}`);

        setContents([]);

        if (!res) return;

        if (res.success) {
            setContents(res.contents)
        } else {
            setContents([]);
        }

    }

    useEffect(() => {
        HandleFetchCategories();
    },[]);

    useEffect(() => {
        HandleFetchContents();
    },[category, search, page]);

    return (
        <div className={styles.contents}> 

            <div className={styles.choose_categories}>
            {!FetchCategories.loading ? (
                <>
                {categories.length > 0 ? (
                    <>
                    <button type="button" onClick={() => {
                        if (!category) return;
                        setContents([]);
                        setPage(1);
                        setCategory("");
                        setSearch("");
                    }}
                    style={{
                            backgroundColor: !category ? "transparent" : "",
                            border: !category ? "none" : ""
                        }}
                    >
                        all
                    </button>
                    {categories.map(c => (
                        <button type="button" key={c.id} onClick={() => {
                            setContents([]);
                            setSearch("")
                            setPage(1);
                            setCategory(c.category);
                        }}
                        style={{
                            backgroundColor: category === c.category ? "transparent" : "",
                            border: category === c.category ? "none" : ""
                        }}>
                            {c.category}
                        </button>
                    ))}
                    </>
                ) : (
                    <>
                    {FetchCategories.error && (
                        <div className={styles.categories_retry}>
                          <p>{FetchCategories.error}</p>
                          <button type="button" onClick={HandleFetchCategories}>
                           <RotateCcw />
                          </button>
                        </div>
                    )}
                    </>
                )}
                </>
            ) : (
                <div className={styles.categories_loading}>
                    <p>loading categories...</p>
                    <ClipLoader size={25} color="var(--bg-txt-color)"/>
                </div>
            )}
            </div>

            {categories.length > 0 && (
            <fieldset>
                <Search size={25}/>
                <input type="search" value={search} placeholder="enter title"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}/>
            </fieldset>
            )}
            
            
                <section>
                {!FetchContents.loading ? (
                <>
                {contents.length > 0 ? (
                    <>
                    {category && (<h3>{contents[0].category}</h3>)}
                    {contents.map(c => (
                        <div key={c.id}>
                        {!category && (<h3>{c.category}</h3>)}
                        <article>
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
                        </div>
                    ))}
                    </>
                ) : (
                    <div className={styles.contents_retry}>
                    <p>{FetchContents.error}</p>
                    <button type="button" onClick={HandleFetchContents}>
                        <RotateCcw />
                    </button>
                    </div>
                )}

                <div className="pagination">
                    {contents.length <= 3 && page > 1 ? (
                        <button type="button" onClick={() => {
                            setContents([]);
                            setPage(prev => prev - 1);
                        }}><ChevronLeft /> </button>
                    ): (null)}
                    <>page {page}</>
                    {contents.length == 3 && (
                        <button type="button" onClick={() => {
                        setContents([]);
                        setPage(prev => prev + 1);
                        }}><ChevronRight /></button>
                    )}
                </div>
                </>
            ) : (
              <div className={styles.contents_loading}>
                <p>loading contents...</p>
                <ClipLoader size={50} color="var(--bg-txt-color)"/>
              </div>
            )}
            </section>
        
    </div>
)}

export { Contents }
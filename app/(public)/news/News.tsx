"use client";

import { UseFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import styles from "../public.module.css";

type NewsType = {
    id: number;
    category: string;
    title: string;
    news: string;
    image: string;
    created_at: string;
}

type CategoryType = {
    id: number;
    category: string;
}

function News() {

    const [ news, setNews ] = useState<NewsType []>([]);

    const [ categories, setCategories ] = useState<CategoryType[]>([]);

    const [ category, setCategory ] = useState("");
    const [ search, setSearch ] = useState("");
    const [ page, setPage ] = useState(1);

    const FetchNews = UseFetch();
    const FetchCategories = UseFetch();

    const HandleFetchCategories = async () =>
    {
        const res = await FetchCategories.Fetch("/contents/categories");

        if (!res) return;

        if (res.success) {
            setCategories(res.categories)
        }
    }

    const HandleFetchNews = async () =>
    {
        const res = await FetchNews.Fetch(`/news?category=${category}&search=${search}&page=${page}`);

        if (res) {

            if (!res.success) {
            setNews([]);
            }

            if (res.success) {
            setNews(res.news)
            }
        }

    }

    useEffect(() => {
        HandleFetchCategories();
    },[]);

    useEffect(() => {
        HandleFetchNews();
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
                        setNews([]);
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
                            setNews([]);
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
                <p>loading categories...</p>
                <ClipLoader size={50} color="var(--bg-txt-color)"/>
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
                {!FetchNews.loading ? (
                <>
                {news.length > 0 ? (
                    <>
                    {category && (<h2>{news[0].category}</h2>)}
                    {news.map(n => (
                        <div key={n.id}>
                        {!category && (<h3>{n.category}</h3>)}
                        <article>
                            <span>{new Date(n.created_at).toLocaleDateString("en-US", {
                                day: "numeric",
                                weekday: "short",
                                month: "short",
                                year: "numeric"
                            })}</span>
                            <h3>{n.title}</h3>

                            <Image alt="" src={n.image} width={500} height={300}/>
                            
                            <p>{n.news}</p>

                        </article>
                        </div>
                    ))}
                    </>
                ) : (
                    <div className="retry">
                    <p>{FetchNews.error}</p>
                    <button type="button" onClick={HandleFetchNews}>
                        retry
                    </button>
                    </div>
                )}

                <div className="pagination">
                    {news.length <= 3 && page > 1 ? (
                        <button type="button" onClick={() => {
                            setNews([]);
                            setPage(prev => prev - 1);
                        }}><ChevronLeft /> </button>
                    ): (null)}
                    <>page {page}</>
                    {news.length == 3 && (
                        <button type="button" onClick={() => {
                        setNews([]);
                        setPage(prev => prev + 1);
                        }}><ChevronRight /></button>
                    )}
                </div>
                </>
            ) : (
              <div className="loading">
                <p>loading...</p>
                <ClipLoader size={50} color="var(--bg-txt-color)"/>
              </div>
            )}
            </section>
        
    </div>
)}

export { News }
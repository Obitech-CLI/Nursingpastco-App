"use client";

import { UseFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Link2, RotateCcw, Search, X } from "lucide-react";
import styles from "./recommend.module.css";
import Link from "next/link";

type RecommendationsType = {
    id: number;
    category: string;
    title: string;
    recommendation: string;
    image: string;
    link: string;
}

type CategoryType = {
    id: number;
    category: string;
}

function Recommendations() {

    const [ recommendations, setRecommendations ] = useState<RecommendationsType []>([]);

    const [ categories, setCategories ] = useState<CategoryType[]>([]);

    const [ category, setCategory ] = useState("");
    const [ search, setSearch ] = useState("");
    const [ page, setPage ] = useState(1);

    const FetchRecommendations = UseFetch();
    const FetchCategories = UseFetch();

    const HandleFetchCategories = async () =>
    {
        const res = await FetchCategories.Fetch("/recommendations/categories");

        if (!res) return;

        if (res.success) {
            setCategories(res.categories)
        }
    }

    const HandleFetchRecommendations = async () =>
    {
        const res = await FetchRecommendations.Fetch(`/recommendations?category=${category}&search=${search}&page=${page}`);

        if (res) {

            if (!res.success) {
            setRecommendations([]);
            }

            if (res.success) {
            setRecommendations(res.recommendations)
            }
        }

    }

    useEffect(() => {
        HandleFetchCategories();
    },[]);

    useEffect(() => {
        HandleFetchRecommendations();
    },[category, search, page]);

    return (
        <div className={styles.recommendations}> 

            <div className={styles.choose_categories}>
            {!FetchCategories.loading ? (
                <>
                {categories.length > 0 ? (
                    <>
                    <button type="button" onClick={() => {
                        if (!category) return;
                        setRecommendations([]);
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
                            setRecommendations([]);
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
                    <div className={styles.categories_retry}>
                    <p>{FetchCategories.error}</p>
                    <button type="button" onClick={HandleFetchCategories}>
                        <RotateCcw size={20}/>
                        retry
                    </button>
                    </div>
                )}
                </>
            ) : (
                <div className={styles.categories_loading}>
                <p>loading categories...</p>
                <div>
                <ClipLoader size={25} color="var(--bg-txt-color)"/>
                </div>
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
                {!FetchRecommendations.loading ? (
                <>
                {recommendations.length > 0 ? (
                    <>
                    {category && (<h3>{recommendations[0].category}</h3>)}
                    {recommendations.map(r => (
                        <div key={r.id}>
                        {!category && (<h3>{r.category}</h3>)}
                        <article>
                            <h3>{r.title}</h3>

                            <Image alt="" src={r.image} width={500} height={300}/>
                            
                            <p>{r.recommendation}</p>

                            <Link href={r.link}>goto recommendation <Link2 /></Link>

                        </article>
                        </div>
                    ))}
                    </>
                ) : (
                    <div className={styles.recommendations_retry}>
                    <p>{FetchRecommendations.error}</p>
                    <button type="button" onClick={HandleFetchRecommendations}>
                        <RotateCcw size={25}/>
                        retry
                    </button>
                    </div>
                )}

                {recommendations.length > 0 && (
                <div className="pagination">
                    {recommendations.length <= 3 && page > 1 ? (
                        <button type="button" onClick={() => {
                            setRecommendations([]);
                            setPage(prev => prev - 1);
                        }}><ChevronLeft /> </button>
                    ): (null)}
                    <>page {page}</>
                    {recommendations.length == 3 && (
                        <button type="button" onClick={() => {
                        setRecommendations([]);
                        setPage(prev => prev + 1);
                        }}><ChevronRight /></button>
                    )}
                </div>
                )}
                </>
            ) : (
              <div className={styles.recommendations_loading}>
                <p>loading recommendations...</p>
                <ClipLoader size={50} color="var(--bg-txt-color)"/>
              </div>
            )}
            </section>
        
    </div>
)}

export { Recommendations }
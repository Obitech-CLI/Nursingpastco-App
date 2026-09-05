"use client";

import { UseFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { CategoryType } from "./Categories";
import { ChevronLeft, ChevronRight, Link2, PenBox, Search, X } from "lucide-react";
import Link from "next/link";

type RecommendationsType = {
    id: number;
    category: string;
    title: string;
    recommendation: string;
    image: string;
    link: string;
}

function ModifyRecommendations() {

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
        if (!category) return;

        const res = await FetchRecommendations.Fetch(`/recommendations?category=${category}&search=${search}&page=${page}`);

        if (!res) return;

        if (res.success) {
            setRecommendations(res.recommendations)
        }

    }

    useEffect(() => {
        HandleFetchCategories();
    },[]);

    useEffect(() => {
        HandleFetchRecommendations();
    },[category, search, page]);

    return (
        <div className="modify-section">
            <div className="change-btns">
            {!FetchCategories.loading ? (
                <>
                {categories.length > 0 ? (
                    <>
                    <button type="button" onClick={() => {
                        setCategory("");
                        setRecommendations([]);
                        setPage(1);
                    }}>
                        <X color="red"/>
                    </button>
                    {categories.map(c => (
                        <button type="button" key={c.id} onClick={() => {
                            setRecommendations([]);
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

            {recommendations.length > 0 && (
            <fieldset>
                <Search size={25}/>
                <input type="search" value={search} placeholder="enter title"
                onChange={(e) => setSearch(e.target.value)}/>
            </fieldset>
            )}
            
            {category && (
                <section>
                {!FetchRecommendations.loading ? (
                <>
                {recommendations.length > 0 ? (
                    <>
                    <h2>{recommendations[0].category}</h2>
                    {recommendations.map(r => (
                        <article key={r.id}>
                            <h3>{r.title}</h3>

                            <Image alt="" src={r.image} width={500} height={300}/>
                            
                            <pre style={{
                                textAlign: "center"
                            }}>{r.recommendation}</pre>

                            <Link href={r.link}>goto recommendation <Link2 /></Link>

                            <div className="btns">
                                <button><X color="red" size={30}/></button>
                                <button><PenBox color="blue" size={30}/></button>
                            </div>
                        </article>
                    ))}
                    </>
                ) : (
                    <div className="retry">
                    <p>{FetchRecommendations.error}</p>
                    <button type="button" onClick={HandleFetchRecommendations}>
                        retry
                    </button>
                    </div>
                )}

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
                </>
            ) : (
              <div className="loading">
                <p>loading...</p>
                <ClipLoader size={50} color="var(--bg-txt-color)"/>
              </div>
            )}
            </section>
        )}
    </div>
)}

export { ModifyRecommendations }
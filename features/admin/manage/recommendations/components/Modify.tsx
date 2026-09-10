"use client";

import { UseFetch } from "@/hooks/useFetch";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { CategoryType } from "./Categories";
import { ChevronLeft, ChevronRight, Link2, PenBox, Search, X } from "lucide-react";
import Link from "next/link";
import { EditRecommendationType } from "@/app/admin/manage/recommendations/ManageRecommendations";
import { UseDelete } from "@/hooks/useDelete";
import { useConfirmModal } from "@/contexts/modals/FeedbackContext";

type RecommendationsType = {
    id: number;
    category: string;
    title: string;
    recommendation: string;
    image: string;
    link: string;
}

type NavType = {
    add: boolean,
    view: boolean
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: EditRecommendationType,
    setEditData: React.Dispatch<SetStateAction<EditRecommendationType>>;
    setNav: React.Dispatch<SetStateAction<NavType>>;
    scroll: () => void;
}

function ModifyRecommendations({edit, setEdit, setEditData, editData, setNav, scroll}:Props) {

    const [ recommendations, setRecommendations ] = useState<RecommendationsType []>([]);

    const [ categories, setCategories ] = useState<CategoryType[]>([]);

    const [ category, setCategory ] = useState("");
    const [ search, setSearch ] = useState("");
    const [ page, setPage ] = useState(1);

    const [deleteId, setDeleteId] = useState("");

    const DeleteRecommendation = UseDelete();

    const { confirm, setShowConfirmModal, setConfirmMessage } = useConfirmModal();

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

        setRecommendations([]);

        if (!res) return;

        if (res.success) {
            setRecommendations(res.recommendations)
        } else {
            setRecommendations([]);
        }

    }

    const HandleDeleteClick = (id: string) =>
    {
        if (!id) return;

        setConfirmMessage("are you sure you want to delete this recommendation?");
        setShowConfirmModal(true);
        setDeleteId(id);
    }

    const Delete = async () => {
        if (!confirm && !deleteId) return;

        const res = await DeleteRecommendation.Delete(`/recommendation/${deleteId}`);

        if (res.success) {
            setDeleteId("");
            HandleFetchRecommendations();
        }
    }

    useEffect(() => {
        Delete();
    }, [confirm])

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

            {categories.length > 0 && (
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
                            
                            <p>{r.recommendation}</p>

                            <Link href={r.link}>goto recommendation <Link2 /></Link>

                            <div className="btns">

                                <button type="button"
                                onClick={() => {
                                    setEdit(true);
                                    setEditData({
                                        id: String(r.id),
                                        category: r.category,
                                        title: r.title,
                                        recommendation: r.recommendation,
                                        link: r.link
                                    });
                                    setNav({add: true, view: false});
                                    scroll();
                                }}>
                                    <PenBox color="blue" size={25}/>
                                    edit
                                </button>

                                <button onClick={() => HandleDeleteClick(String(r.id))}
                                   disabled={DeleteRecommendation.loading}>
                                   <X color="red" size={25}/>
                                   delete
                                </button>

                                {DeleteRecommendation.loading && (
                                <div className="delete-loading">
                                  <ClipLoader size={40} color="var(--bg-txt-color)"/>
                                  <p>deleting recommendation...</p>
                                  <p style={{textTransform: "lowercase"}}>hold on a bit</p>
                                </div>
                                )}

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
                <p>loading recommendations...</p>
                <ClipLoader size={50} color="var(--bg-txt-color)"/>
              </div>
            )}
            </section>
        )}
    </div>
)}

export { ModifyRecommendations }
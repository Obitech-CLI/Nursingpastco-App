"use client";

import { UseFetch } from "@/hooks/useFetch";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { CategoryType } from "./Categories";
import { ChevronLeft, ChevronRight, Pen, PenBox, Search, X } from "lucide-react";
import { EditNewsType } from "@/app/admin/manage/news-updates/ManageNewsUpdates";
import { UseDelete } from "@/hooks/useDelete";
import { useConfirmModal } from "@/contexts/modals/FeedbackContext";

type NewsType = {
    id: number;
    category: string;
    title: string;
    news: string;
    image: string;
    created_at: string;
}

type NavType = {
    add: boolean,
    view: boolean
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: EditNewsType,
    setEditData: React.Dispatch<SetStateAction<EditNewsType>>;
    setNav: React.Dispatch<SetStateAction<NavType>>;
    scroll: () => void;
}

function ModifyNews({edit, setEdit, setEditData, editData, setNav, scroll}:Props) {

    const [ news, setNews ] = useState<NewsType []>([]);

    const [ categories, setCategories ] = useState<CategoryType[]>([]);

    const [ category, setCategory ] = useState("");
    const [ search, setSearch ] = useState("");
    const [ page, setPage ] = useState(1);

    const [deleteId, setDeleteId] = useState("");

    const DeleteNews = UseDelete();

    const { confirm, setShowConfirmModal, setConfirmMessage } = useConfirmModal();

    const FetchNews = UseFetch();
    const FetchCategories = UseFetch();

    const HandleFetchCategories = async () =>
    {
        const res = await FetchCategories.Fetch("/news/categories");

        if (!res) return;

        if (res.success) {
            setCategories(res.categories)
        }
    }

    const HandleFetchNews = async () =>
    {
        if (!category) return;

        const res = await FetchNews.Fetch(`/news?category=${category}&search=${search}&page=${page}`);

        setNews([]);

        if (!res) return;

        if (res.success) {
            setNews(res.news)
        } else {
            setNews([]);
        }

    }

    const HandleDeleteClick = (id: string) =>
    {
        if (!id) return;

        setConfirmMessage("are you sure you want to delete this news?");
        setShowConfirmModal(true);
        setDeleteId(id);
    }

    const Delete = async () => {
        if (!confirm && !deleteId) return;

        const res = await DeleteNews.Delete(`/news/${deleteId}`);

        if (res.success) {
            setDeleteId("");
            HandleFetchNews();
        }
    }

    useEffect(() => {
        Delete();
    }, [confirm])

    useEffect(() => {
        HandleFetchCategories();
    },[]);

    useEffect(() => {
        HandleFetchNews();
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
                        setNews([]);
                        setPage(1);
                    }}>
                        <X color="red"/>
                    </button>
                    {categories.map(c => (
                        <button type="button" key={c.id} onClick={() => {
                            setNews([]);
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
                {!FetchNews.loading ? (
                <>
                {news.length > 0 ? (
                    <>
                    <h2>{news[0].category}</h2>
                    {news.map(n => (
                        <article key={n.id}>
                            <span>{new Date(n.created_at).toLocaleDateString("en-US", {
                                day: "numeric",
                                weekday: "short",
                                month: "short",
                                year: "numeric"
                            })}</span>
                            <h3>{n.title}</h3>

                            <Image alt="" src={n.image} width={500} height={300}/>
                            
                            <p>{n.news}</p>

                            <div className="btns">

                                <button type="button"
                                onClick={() => {
                                    setEdit(true);
                                    setEditData({
                                        id: String(n.id),
                                        category: n.category,
                                        title: n.title,
                                        news: n.news
                                    });
                                    setNav({add: true, view: false});
                                    scroll();
                                }}>
                                    <PenBox color="blue" size={25}/>
                                    edit
                                </button>

                                <button onClick={() => HandleDeleteClick(String(n.id))}
                                   disabled={DeleteNews.loading}>
                                   <X color="red" size={25}/>
                                   delete
                                </button>

                                {DeleteNews.loading && (
                                <div className="delete-loading">
                                  <ClipLoader size={40} color="var(--bg-txt-color)"/>
                                  <p>deleting news...</p>
                                  <p style={{textTransform: "lowercase"}}>hold on a bit</p>
                                </div>
                                )}

                            </div>
                        </article>
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
                <p>loading news/updates...</p>
                <ClipLoader size={50} color="var(--bg-txt-color)"/>
              </div>
            )}

            </section>
        )}
    </div>
)}

export { ModifyNews }
"use client";

import { UseFetch } from "@/hooks/useFetch";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { CategoryType } from "./Categories";
import Image from "next/image";
import { ChevronLeft, ChevronRight, PenBox, Search, X } from "lucide-react";
import { EditContentType } from "@/app/admin/manage/contents-tutorials/ManageContentsTutorials";
import { UseDelete } from "@/hooks/useDelete";
import { useConfirmModal } from "@/contexts/modals/FeedbackContext";

type ContentsType = {
    id: number;
    category: string;
    title: string;
    content: string;
    file: string;
    created_at: string;
}

type NavType = {
    add: boolean,
    view: boolean
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    editData: EditContentType,
    setEditData: React.Dispatch<SetStateAction<EditContentType>>;
    setNav: React.Dispatch<SetStateAction<NavType>>;
    scroll: () => void;
}

function ModifyContents({edit, setEdit, setEditData, editData, setNav, scroll}:Props) {

    const [ contents, setContents ] = useState<ContentsType []>([]);

    const [ categories, setCategories ] = useState<CategoryType[]>([]);

    const [ category, setCategory ] = useState("");
    const [ search, setSearch ] = useState("");
    const [ page, setPage ] = useState(1);

    const [deleteId, setDeleteId] = useState("");

    const DeleteContent = UseDelete();

    const { confirm, setShowConfirmModal, setConfirmMessage } = useConfirmModal();

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

        const res = await FetchContents.Fetch(`/contents?category=${category}&search=${search}&page=${page}`);

        setContents([]);

        if (!res) return;

        if (res.success) {
            setContents(res.contents)
        } else {
            setContents([]);
        }

    }

    const HandleDeleteClick = (id: string) =>
    {
        if (!id) return;

        setConfirmMessage("are you sure you want to delete this content?");
        setShowConfirmModal(true);
        setDeleteId(id);
    }

    const Delete = async () => {
        if (!confirm && !deleteId) return;

        const res = await DeleteContent.Delete(`/content/${deleteId}`);

        if (res.success) {
            setDeleteId("");
            HandleFetchContents();
        }
    }

    useEffect(() => {
        Delete();
    }, [confirm])

    useEffect(() => {
        HandleFetchCategories();
    },[]);

    useEffect(() => {
        HandleFetchContents();
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
                        setContents([]);
                        setPage(1);
                    }}>
                        <X color="red"/>
                    </button>
                    {categories.map(c => (
                        <button type="button" key={c.id} onClick={() => {
                            setContents([]);
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

                            <div className="btns">

                                <button type="button"
                                onClick={() => {
                                    setEdit(true);
                                    setEditData({
                                        id: String(c.id),
                                        category: c.category,
                                        title: c.title,
                                        content: c.content
                                    });
                                    setNav({add: true, view: false});
                                    scroll();
                                }}>
                                    <PenBox color="blue" size={25}/>
                                    edit
                                </button>

                                <button onClick={() => HandleDeleteClick(String(c.id))}
                                   disabled={DeleteContent.loading}>
                                   <X color="red" size={25}/>
                                   delete
                                </button>

                                {DeleteContent.loading && (
                                <div className="delete-loading">
                                  <ClipLoader size={40} color="var(--bg-txt-color)"/>
                                  <p>deleting content...</p>
                                  <p style={{textTransform: "lowercase"}}>hold on a bit</p>
                                </div>
                                )}

                            </div>
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
              <div className="loading">
                <p>loading contents...</p>
                <ClipLoader size={50} color="var(--bg-txt-color)"/>
              </div>
            )}
            </section>
        )}
    </div>
)}

export { ModifyContents }
"use client";

import { useConfirmModal } from "@/contexts/modals/FeedbackContext";
import { UseDelete } from "@/hooks/useDelete";
import { UseFetch } from "@/hooks/useFetch";
import { PenBox, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

type CategoryType = {
    id: number;
    category: string;
}

function ModifyRecommendationsCategories () {

    const [ categories, setCategories ] = useState<CategoryType[]>([]);

    const FetchCategories = UseFetch();
    const DeleteCategory = UseDelete();

    const { confirm, setShowConfirmModal, setConfirmMessage } = useConfirmModal();

    const [deleteId, setDeleteId] = useState("");

    const HandleFetchCategories = async () =>
    {
        const res = await FetchCategories.Fetch("/recommendations/categories");

        if (!res) return;

        if (res.success) {
            setCategories(res.categories)
        }
    }

    useEffect(() => {
        HandleFetchCategories();
    }, []);

    const HandleDeleteClick = (id: string) =>
    {
        if (!id) return;

        setDeleteId(id);

        setConfirmMessage("are you sure you want to delete this category?");
        setShowConfirmModal(true);
    }

    const Delete = async () => {
        if (!confirm && !deleteId) {
            setDeleteId("");
            return;
        }
        const res = await DeleteCategory.Delete(`/recommendations/categories/${deleteId}`);
        if (!res) return;

        if (res.success) {
            setDeleteId("");
            HandleFetchCategories();
        }
    }

    useEffect(() => {
        Delete();
    }, [confirm]);

    return (
        <div className="modify-category">
            <h3>categories</h3>
            {!FetchCategories.loading ? (
                <>
                {categories.length > 0 ? (
                    <div className="categories">
                    {categories.map(c => (
                        <div className="category" key={c.id}>

                        <h4>{c.category}</h4>
                        <div>
                            <button><PenBox color="blue"/></button>

                            <button onClick={() => HandleDeleteClick(String(c.id))} 
                                disabled={DeleteCategory.loading}>
                                <X color="red"/>
                            </button>

                            {DeleteCategory.loading && (
                                <div className="delete-loading">
                                  <ClipLoader size={40} color="var(--bg-txt-color)"/>
                                  <p>deleting category...</p>
                                  <p style={{textTransform: "lowercase"}}>hold on a bit</p>
                                </div>
                            )}
                        </div>

                        </div>
                    ))}
                    </div>
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
                    <ClipLoader size={40}/>
                </div>
            )}
        </div>
    )
}

export { ModifyRecommendationsCategories }
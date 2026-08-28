"use client";

import { useConfirmModal } from "@/contexts/modals/FeedbackContext";
import { UseDelete } from "@/hooks/useDelete";
import { UseFetch } from "@/hooks/useFetch";
import { AppInfoCategories } from "@/ui/AppContent";
import { PenBox, X } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { EditSiteInfoDataTypes } from "./AddSiteInfo";

interface Nav {
    add: boolean;
    view: boolean;
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    setNav: React.Dispatch<SetStateAction<Nav>>;
    setEditData: React.Dispatch<SetStateAction<EditSiteInfoDataTypes>>;
}

function ModifySiteInfo({edit, setEdit, setNav, setEditData} : Props) {

    const [siteInfo, setSiteInfo] = useState<EditSiteInfoDataTypes[]>([]);

    const [selectedCategory, setSelectedCategory] = useState("");

    const FetchSiteInfo = UseFetch();
    const DeleteSiteInfo = UseDelete();

    const [deleteId, setDeleteId] = useState(0);
    const [deleteCategory, setDeleteCategory] = useState("");
    const [reload, setReload] = useState(0);
    
    const { confirm, setShowConfirmModal, setConfirmMessage } = useConfirmModal();
    
    
    const HandleDeleteClick = (id: number, category: string) =>
        {
            if (!id) return;
    
            setConfirmMessage("are you sure you want to delete site info?");
            setShowConfirmModal(true);
            setDeleteId(id);
            setDeleteCategory(category);
        }
    
    const Delete = async () => {
            if (!confirm && !deleteId) return;
            await DeleteSiteInfo.Delete(`/site-info/delete/${deleteCategory}/${deleteId}`);
            setSiteInfo([]);
            setReload(prev => prev + 1);
            setDeleteCategory("");
            setDeleteId(0);
        }
    

    const HandleFetchSiteInfo = async () =>
    {
        if (!selectedCategory) return;

        const res = await FetchSiteInfo.Fetch(`/site-info/${selectedCategory}`);

        if (!res) return;

        setSiteInfo(res.siteInfo);
    }

    useEffect(() => {
        HandleFetchSiteInfo();
    }, [selectedCategory, reload]);

    useEffect(() => {
        Delete();
    }, [confirm])

    return (
        <>
        <div className="modify">

            {AppInfoCategories.length > 0 && (
                <div className="site-info-btns">
                {AppInfoCategories.map(category => (
                    <button type="button" key={category.id}
                    onClick={() => {
                        setSiteInfo([]);
                        setSelectedCategory(category.category);
                    }}
                    style={{
                        backgroundColor: selectedCategory === category.category ? "transparent" : "",
                        color: selectedCategory === category.category ? "var(--bg-txt-color)" : "",
                        border: selectedCategory === category.category ? "var(--border)" : ""
                    }}
                    >
                        {category.category}
                    </button>
                ))}
                </div>
            )}

            {selectedCategory && (
                <>
                <h2>{selectedCategory}</h2>
                {!FetchSiteInfo.loading ? (
                    <>
                    {siteInfo.length > 0 ? (
                        <div className="site-info">
                        {siteInfo.map(info => (
                            <div key={info.id} className="info">

                            <h3>{info.title}</h3>
                            <h4>{info.sub_title}</h4>
                            <p>{info.information}</p>

                            <div>
                                <button type="button"
                                onClick={() => {
                                setEdit(true);
                                setNav({add: true, view: false});
                                setEditData({
                                    id: info.id,
                                    category: info.category,
                                    title: info.title,
                                    sub_title: info.sub_title,
                                    information: info.information
                                })
                                }}>
                                   <PenBox color="blue"/>
                                </button>

                                <button onClick={() => HandleDeleteClick(info.id as number, info.category as string)}
                                disabled={DeleteSiteInfo.loading}>
                                   <X color="red"/>
                                </button>

                                {DeleteSiteInfo.loading && (
                                <div className="overlay-loading">
                                  <ClipLoader />
                                  <p>deleting site info...</p>
                                  <p style={{textTransform: "lowercase"}}>hold on a bit</p>
                                </div>
                                )}
                            </div>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <>
                        {FetchSiteInfo.error && (
                            <div className="retry">
                            <p>{FetchSiteInfo.error}</p>
                            <button type="button" onClick={HandleFetchSiteInfo}>
                                retry
                            </button>
                        </div>
                        )}
                        </>
                    )}
                    </>
                ) : (
                    <div className="loading">
                        <ClipLoader size={40}/>
                    </div>
                )}
                </>
            )}

        </div>
        </>
    )
}

export { ModifySiteInfo }
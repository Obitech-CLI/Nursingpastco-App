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

    const [deleteId, setDeleteId] = useState("");
    const [deleteCategory, setDeleteCategory] = useState("");
    
    const { confirm, setShowConfirmModal, setConfirmMessage } = useConfirmModal();
    
    
    const HandleDeleteClick = (id: string, category: string) =>
        {
            if (!id) return;
    
            setConfirmMessage("are you sure you want to delete this info?");
            setShowConfirmModal(true);
            setDeleteId(id);
            setDeleteCategory(category);
        }
    
    const Delete = async () => {
            if (!confirm && !deleteId) return;
            const res = await DeleteSiteInfo.Delete(`/site-info/delete/${deleteCategory}/${deleteId}`);
            
            if (res.success) {
                setSiteInfo([]);
                setDeleteCategory("");
                setDeleteId("");
                HandleFetchSiteInfo();
            }
        }
    

    const HandleFetchSiteInfo = async () =>
    {
        if (!selectedCategory) return;

        const res = await FetchSiteInfo.Fetch(`/site-info/${selectedCategory}`);

        if (!res) return;

        setSiteInfo(res.siteInfo);
    }

    useEffect(() => {
        setSiteInfo([]);
        HandleFetchSiteInfo();
    }, [selectedCategory])

    useEffect(() => {
        Delete();
    }, [confirm])

    return (
        <>
        <div className="modify">

            {AppInfoCategories.length > 0 && (
                <div className="change-btns">
                {AppInfoCategories.map(category => (
                    <button type="button" key={category.id}
                    onClick={() => {
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
                        <>
                        {siteInfo.map(info => (
                            <div key={info.id} className="results" style={{
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem"
                            }}>

                            <h3>{info.title}</h3>
                            <h4>{info.sub_title}</h4>
                            <p>{info.information}</p>

                            <div>
                                <button type="button"
                                onClick={() => {
                                setEdit(true);
                                setNav({add: true, view: false});
                                setEditData({
                                    id: String(info.id),
                                    category: info.category,
                                    title: info.title,
                                    sub_title: info.sub_title,
                                    information: info.information
                                })
                                }}>
                                   <PenBox color="blue" size={30}/>
                                </button>

                                <button onClick={() => HandleDeleteClick(String(info.id), info.category as string)}
                                disabled={DeleteSiteInfo.loading}>
                                   <X color="red" size={30}/>
                                </button>

                                {DeleteSiteInfo.loading && (
                                <div className="delete-loading">
                                  <ClipLoader size={40} color="var(--bg-txt-color)"/>
                                  <p>deleting site info...</p>
                                  <p style={{textTransform: "lowercase"}}>hold on a bit</p>
                                </div>
                                )}
                            </div>
                            </div>
                        ))}
                        </>
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
                        <ClipLoader size={40} color="var(--bg-txt-color)"/>
                    </div>
                )}
                </>
            )}

        </div>
        </>
    )
}

export { ModifySiteInfo }
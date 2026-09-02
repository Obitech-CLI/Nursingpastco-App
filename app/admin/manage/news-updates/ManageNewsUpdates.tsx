"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddNewsCategory } from "@/features/admin/manage/news/components/AddCategory";
import { ModifyNewsCategories } from "@/features/admin/manage/news/components/Categories";
import { Plus, Settings2, Settings2Icon, X } from "lucide-react";
import { useState } from "react";

function ManageNewsUpdates() {

    const { navManageNews, setNavManageNews } = UseManageNav();

    const [showCategories, setShowCategories] = useState(false);

    const [ edit, setEdit ] = useState(false);
    const [ editData, setEditData ] = useState({
            id: "",
            category: "",
            title: "",
            news: ""
    });

    const [editFile, setEditFile] = useState<File | null>(null);

    return (
        <>
        <div className="switch" style={{
            gridTemplateColumns: navManageNews.add || navManageNews.view ?
            "1fr 1fr" : ""
        }}>
            <h2 onClick={() => {
                setNavManageNews({view: false, add: false})
            }}>manage</h2>
            <button type="button"
            onClick={() => setNavManageNews({add: true, view: false})}
            style={{
                border: navManageNews.add ? "none" : "",
                gridArea: navManageNews.add ? "2/ 1/ 2/ 2" : "",
                fontSize: navManageNews.add ? "1.1rem" : "",
            }}>
                {!navManageNews.add ? (
                    <>
                    {!edit ? "add" : "update"}
                    </>
                ) : (
                    <>
                    {!edit ? "add news & updates" : "update news & updates"}
                    </>
                )}
    
                {!navManageNews.add ? <Plus /> : ""}
            </button>

            <button type="button"
            onClick={() => {
                setNavManageNews({add: false, view: true});
                setEditData({
                    id: "",
                    category: "",
                    title: "",
                    news: "",
                })
                setEdit(false);
                setEditFile(null);
            }}
            style={{
                border: navManageNews.view ? "none" : "",
                gridArea: navManageNews.view ? "2/ 1/ 2/ 2" : "",
                fontSize: navManageNews.view ? "1.1rem" : "",
            }}>
                {!navManageNews.view ? "modify" : "modify news & updates"}
                {!navManageNews.view ? <Settings2 /> : ""}
            </button>
        </div>

        {!navManageNews.add && !navManageNews.view ? (
            <>
            <AddNewsCategory />
            <button type="button" style={{
                border: "var(--border)",
                padding: "1rem 3rem",
                fontSize: "1rem",
                width: "fit-content",
                margin: "auto",
            }} 
               onClick={() => setShowCategories(!showCategories)}>
                {!showCategories ? (
                    <>
                    {"modify categories"}
                    <Settings2Icon />
                    </>
                    ) : (
                        <>
                        {"hide categories"}
                        <X />
                        </>
                    )}
            </button>
            </>
        ) : (null)}

        {showCategories && (
            <ModifyNewsCategories />
        )}

        </>
    )
}

export default ManageNewsUpdates;
"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddNewsCategory } from "@/features/admin/manage/news/components/AddCategory";
import { ModifyNewsCategories } from "@/features/admin/manage/news/components/Categories";
import { Plus, Settings2, Settings2Icon, X } from "lucide-react";
import { useRef, useState } from "react";

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

    const [ editCategory, setEditCategory ] = useState(false);
    const [ editCategoryData, setEditCategoryData ] = useState({
            id: "",
            category: "",
    });

    const [reloadCategories, setReloadCategories] = useState(0);

    const ref = useRef<HTMLDivElement>(null);
    
        const scrollToForm = () => {
            ref.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

    return (
        <>
        <div className="switch" style={{
            gridTemplateColumns: navManageNews.add || navManageNews.view ?
            "1fr 1fr" : ""
        }} ref={ref}>
            <h2 onClick={() => {
                setNavManageNews({view: false, add: false})
            }}>manage</h2>
            <button type="button"
            onClick={() => { 
                setNavManageNews({add: true, view: false});
                setShowCategories(false);
                setEditCategory(false);
                setEditCategoryData({
                    id: "",
                    category: ""
                })
            }}
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
                setShowCategories(false);
                setEditCategory(false);
                setEditCategoryData({
                    id: "",
                    category: ""
                });
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
            <AddNewsCategory
            editCategory={editCategory}
            setEditCategory={setEditCategory}
            editCategoryData={editCategoryData}
            setEditCategoryData={setEditCategoryData}
            setReloadCategories={setReloadCategories}
            />
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
            <ModifyNewsCategories
            editCategory={editCategory}
            setEditCategory={setEditCategory}
            editCategoryData={editCategoryData}
            setEditCategoryData={setEditCategoryData}
            reloadCategories={reloadCategories}
            scroll={scrollToForm}
            />
        )}

        </>
    )
}

export default ManageNewsUpdates;
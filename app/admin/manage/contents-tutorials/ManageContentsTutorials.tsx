"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddContentCategory } from "@/features/admin/manage/contents/components/AddCategory";
import { AddContents } from "@/features/admin/manage/contents/components/AddContents";
import { ModifyContentsCategories } from "@/features/admin/manage/contents/components/Categories";
import { ModifyContents } from "@/features/admin/manage/contents/components/Modify";
import { Plus, Settings2, Settings2Icon, X } from "lucide-react";
import { useRef, useState } from "react";

function ManageContentTutorials() {

    const { navManageContents, setNavManageContents } = UseManageNav();

    const [showCategories, setShowCategories] = useState(false);

    const [ edit, setEdit ] = useState(false);
    const [ editData, setEditData ] = useState({
            id: "",
            category: "",
            title: "",
            content: ""
    });

    const [ editCategory, setEditCategory ] = useState(false);
    const [ editCategoryData, setEditCategoryData ] = useState({
            id: "",
            category: "",
    });

    const [reloadCategories, setReloadCategories] = useState(0);

    const [editFile, setEditFile] = useState<File | null>(null);

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
            gridTemplateColumns: navManageContents.add || navManageContents.view ?
            "1fr 1fr" : ""
        }} ref={ref}>
            <h2 onClick={() => {
                setNavManageContents({view: false, add: false})
            }}>manage</h2>
            <button type="button"
            onClick={() => { 
                setNavManageContents({add: true, view: false})
                setShowCategories(false);
                setEditCategory(false);
                setEditCategoryData({
                    id: "",
                    category: ""
                })
            }}
            style={{
                border: navManageContents.add ? "none" : "",
                gridArea: navManageContents.add ? "2/ 1/ 2/ 2" : "",
                fontSize: navManageContents.add ? "1.1rem" : "",
            }}>
                {!navManageContents.add ? (
                    <>
                    {!edit ? "add" : "update"}
                    </>
                ) : (
                    <>
                    {!edit ? "add contents & tutorials" : "update contents & tutorials"}
                    </>
                )}
    
                {!navManageContents.add ? <Plus /> : ""}
            </button>

            <button type="button"
            onClick={() => {
                setNavManageContents({add: false, view: true});
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
                    content: "",
                })
                setEdit(false);
                setEditFile(null);
            }}
            style={{
                border: navManageContents.view ? "none" : "",
                gridArea: navManageContents.view ? "2/ 1/ 2/ 2" : "",
                fontSize: navManageContents.view ? "1.1rem" : "",
            }}>
                {!navManageContents.view ? "modify" : "modify contents & tutorials"}
                {!navManageContents.view ? <Settings2 /> : ""}
            </button>
        </div>

        {!navManageContents.add && !navManageContents.view ? (
            <>
            <AddContentCategory
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
            <ModifyContentsCategories
            editCategory={editCategory}
            setEditCategory={setEditCategory}
            editCategoryData={editCategoryData}
            setEditCategoryData={setEditCategoryData}
            reloadCategories={reloadCategories}
            scroll={scrollToForm}
            />
        )}

        {navManageContents.add && (
            <AddContents />
        )}

        {navManageContents.view && (
            <ModifyContents />
        )}

        </>
    )
}

export default ManageContentTutorials;
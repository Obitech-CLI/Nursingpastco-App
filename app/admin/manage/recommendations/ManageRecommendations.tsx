"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddRecommenationCategory } from "@/features/admin/manage/recommendations/components/AddCategory";
import { AddRecommendations } from "@/features/admin/manage/recommendations/components/AddRecommendations";
import { ModifyRecommendationsCategories } from "@/features/admin/manage/recommendations/components/Categories";
import { Plus, Settings2, Settings2Icon, X } from "lucide-react";
import { useRef, useState } from "react";

function ManageRecommendations() {

    const { navManageRecommend, setNavManageRecommend } = UseManageNav();

    const [showCategories, setShowCategories] = useState(false);

    const [ edit, setEdit ] = useState(false);
    const [ editData, setEditData ] = useState({
            id: "",
            category: "",
            title: "",
            recommendation: ""
    });

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
            gridTemplateColumns: navManageRecommend.add || navManageRecommend.view ?
            "1fr 1fr" : ""
        }} ref={ref}>
            <h2 onClick={() => {
                setNavManageRecommend({view: false, add: false})
            }}>manage</h2>
            <button type="button"
            onClick={() => { 
                setNavManageRecommend({add: true, view: false});
                setShowCategories(false);
                setEditCategory(false);
                setEditCategoryData({
                    id: "",
                    category: ""
                })
            }}
            style={{
                border: navManageRecommend.add ? "none" : "",
                gridArea: navManageRecommend.add ? "2/ 1/ 2/ 2" : "",
                fontSize: navManageRecommend.add ? "1.1rem" : "",
            }}>
                {!navManageRecommend.add ? (
                    <>
                    {!edit ? "add" : "update"}
                    </>
                ) : (
                    <>
                    {!edit ? "add recommendations" : "update recommendations"}
                    </>
                )}
    
                {!navManageRecommend.add ? <Plus /> : ""}
            </button>

            <button type="button"
            onClick={() => {
                setNavManageRecommend({add: false, view: true});
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
                    recommendation: "",
                })
                setEdit(false);
            }}
            style={{
                border: navManageRecommend.view ? "none" : "",
                gridArea: navManageRecommend.view ? "2/ 1/ 2/ 2" : "",
                fontSize: navManageRecommend.view ? "1.1rem" : "",
            }}>
                {!navManageRecommend.view ? "modify" : "modify recommendations"}
                {!navManageRecommend.view ? <Settings2 /> : ""}
            </button>
        </div>

        {!navManageRecommend.add && !navManageRecommend.view ? (
            <>
            <AddRecommenationCategory
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
            <ModifyRecommendationsCategories
            editCategory={editCategory}
            setEditCategory={setEditCategory}
            editCategoryData={editCategoryData}
            setEditCategoryData={setEditCategoryData}
            reloadCategories={reloadCategories}
            scroll={scrollToForm}
            />
        )}

        {navManageRecommend.add && (
            <AddRecommendations />
        )}

        </>
    )
}

export default ManageRecommendations;
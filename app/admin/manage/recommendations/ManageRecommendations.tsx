"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddRecommenationCategory } from "@/features/admin/manage/recommendations/components/AddCategory";
import { ModifyRecommendationsCategories } from "@/features/admin/manage/recommendations/components/Categories";
import { Plus, Settings2, Settings2Icon, X } from "lucide-react";
import { useState } from "react";

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

    return (
        <>
        <div className="switch" style={{
            gridTemplateColumns: navManageRecommend.add || navManageRecommend.view ?
            "1fr 1fr" : ""
        }}>
            <h2 onClick={() => {
                setNavManageRecommend({view: false, add: false})
            }}>manage</h2>
            <button type="button"
            onClick={() => setNavManageRecommend({add: true, view: false})}
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
            <AddRecommenationCategory />
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
            <ModifyRecommendationsCategories />
        )}

        </>
    )
}

export default ManageRecommendations;
"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddCourse } from "@/features/admin/manage/courses/components/AddCourse";
import { ModifyCourses } from "@/features/admin/manage/courses/components/Modify";
import "./courses.css";
import { Eye, Plus } from "lucide-react";

function AdminManageCourses() {

    const { navManageCourses, setNavManageCourses } = UseManageNav();

    return (
        <>
        <div className="switch">
            <button type="button"
            onClick={() => setNavManageCourses({add: true, view: false})}
            style={{
                display: navManageCourses.add ? "none" : "",
            }}>
                add courses{!navManageCourses.add ? <Plus /> : ""}
            </button>

            <button type="button"
            onClick={() => setNavManageCourses({add: false, view: true})}
            style={{
                display: navManageCourses.view ? "none" : "",
            }}>
                view courses{!navManageCourses.view ? <Eye /> : ""}
            </button>
        </div>
        
        {navManageCourses.add && (<AddCourse />)}

        {navManageCourses.view && (<ModifyCourses />)}
        </>
    )
}

export default AdminManageCourses;
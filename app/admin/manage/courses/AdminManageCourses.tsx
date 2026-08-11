"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddCourse } from "@/features/admin/manage/courses/components/AddCourse";
import { ModifyCourses } from "@/features/admin/manage/courses/components/Modify";
import { Eye, Plus, Settings2 } from "lucide-react";

function AdminManageCourses() {

    const { navManageCourses, setNavManageCourses } = UseManageNav();

    return (
        <>
        <div className="switch">
            <button type="button"
            onClick={() => setNavManageCourses({add: true, view: false})}
            style={{
                border: navManageCourses.add ? "none" : "",
                gridArea: navManageCourses.add ? "1/ 1/ 1/ 1" : "",
            }}>
                {!navManageCourses.add ? "add" : "add courses"}
                {!navManageCourses.add ? <Plus /> : ""}
            </button>

            <button type="button"
            onClick={() => setNavManageCourses({add: false, view: true})}
            style={{
                border: navManageCourses.view ? "none" : "",
                gridArea: navManageCourses.view ? "1/ 1/ 1/ 1" : "",
            }}>
                {!navManageCourses.view ? "modify" : "modify courses"}
                {!navManageCourses.view ? <Settings2 /> : ""}
            </button>
        </div>
        
        {navManageCourses.add && (<AddCourse />)}

        {navManageCourses.view && (<ModifyCourses />)}
        </>
    )
}

export default AdminManageCourses;
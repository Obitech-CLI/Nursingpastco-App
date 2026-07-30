"use client";

import { UseManageCourses } from "@/contexts/admin/ManageCoursesProvider";
import { AddCourse } from "@/features/admin/manage/courses/components/AddCourse";
import { ModifyCourses } from "@/features/admin/manage/courses/components/Modify";
import "./courses.css";
import { Eye, LucideView, Plus, PlusCircle, View } from "lucide-react";

function AdminManageCourses() {

    const { show, setShow } = UseManageCourses();

    return (
        <>
        <div className="switch">
            <button type="button"
            onClick={() => setShow({add: true, view: false})}
            style={{
                backgroundColor: show.add ? "transparent" : "",
                color: show.add ? "" : "white",
                gridArea: show.add ? "1/ 1/ 1/ 1" : "",
                fontSize: show.add ? "1.5rem" : ""
            }}>
                add courses{!show.add ? <Plus /> : ""}
            </button>

            <button type="button"
            onClick={() => setShow({add: false, view: true})}
            style={{
                backgroundColor: show.view ? "transparent" : "",
                color: show.view ? "" : "white",
                gridArea: show.view ? "1/ 1/ 1/ 1" : "",
                fontSize: show.view ? "1.5rem" : ""
            }}>
                view courses{!show.view ? <Eye /> : ""}
            </button>
        </div>
        
        {show.add && (<AddCourse />)}

        {show.view && (<ModifyCourses />)}
        </>
    )
}

export default AdminManageCourses;
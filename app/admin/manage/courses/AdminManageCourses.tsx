"use client";

import { AddCourse } from "@/features/admin/manage/courses/components/AddCourse";
import { ModifyCourses } from "@/features/admin/manage/courses/components/Modify";

function AdminManageCourses() {
    return (
        <>
        <AddCourse />
        <ModifyCourses />
        </>
    )
}

export default AdminManageCourses;
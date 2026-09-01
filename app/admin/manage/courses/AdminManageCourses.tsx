"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddCourse } from "@/features/admin/manage/courses/components/AddCourse";
import { ModifyCourses } from "@/features/admin/manage/courses/components/Modify";
import { Eye, Plus, Settings2 } from "lucide-react";
import { useState } from "react";

function AdminManageCourses() {

    const { navManageCourses, setNavManageCourses } = UseManageNav();

    const [ edit, setEdit ] = useState(false);
    const [ editData, setEditData ] = useState({
        id: "",
        instituition: "",
        course: "",
        level: ""
    });

    return (
        <>
        <div className="switch" style={{
            gridTemplateColumns: navManageCourses.add || navManageCourses.view ?
            "1fr 1fr" : ""
        }}>
            <h2>manage courses</h2>
            <button type="button"
            onClick={() => setNavManageCourses({add: true, view: false})}
            style={{
                border: navManageCourses.add ? "none" : "",
                gridArea: navManageCourses.add ? "2/ 1/ 2/ 2" : "",
                fontSize: navManageCourses.add ? "1.1rem" : "",
            }}>
                {!navManageCourses.add ? (
                    <>
                    {!edit ? "add" : "update"}
                    </>
                ) : (
                    <>
                    {!edit ? "add course" : "update course"}
                    </>
                )}
                {!navManageCourses.add ? <Plus /> : ""}
            </button>

            <button type="button"
            onClick={() => {
                setNavManageCourses({add: false, view: true});
                setEditData({
                    id: "",
                    instituition: "",
                    course: "",
                    level: ""
                })
                setEdit(false);
            }}
            style={{
                border: navManageCourses.view ? "none" : "",
                gridArea: navManageCourses.view ? "2/ 1/ 2/ 2" : "",
                fontSize: navManageCourses.view ? "1.1rem" : "",
            }}>
                {!navManageCourses.view ? "modify" : "modify courses"}
                {!navManageCourses.view ? <Settings2 /> : ""}
            </button>
        </div>
        
        {navManageCourses.add && (
            <AddCourse
            edit={edit}
            setEdit={setEdit}
            editData={editData}
            setEditData={setEditData}
            />
        )}

        {navManageCourses.view && (
            <ModifyCourses
            edit={edit}
            setEdit={setEdit}
            setNav={setNavManageCourses}
            setEditData={setEditData}
            />
        )}
        </>
    )
}

export default AdminManageCourses;
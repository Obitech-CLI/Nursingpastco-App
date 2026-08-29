"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddPastQuestion } from "@/features/admin/manage/past-questions/components/AddPastQuestion";
import { Plus, Settings2 } from "lucide-react";
import "../manage.css";
import { ModifyPastQuestions } from "@/features/admin/manage/past-questions/components/Modify";
import { useState } from "react";

function AdminManagePastQuestions() {

    const { navManagePastQuestions, setNavManagePastQuestions } = UseManageNav();

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
            gridTemplateColumns: navManagePastQuestions.add || navManagePastQuestions.view ?
            "1fr 1fr" : ""
        }}>
            <h2>manage past questions</h2>
            <button type="button"
            onClick={() => setNavManagePastQuestions({add: true, view: false})}
            style={{
                border: navManagePastQuestions.add ? "none" : "",
                gridArea: navManagePastQuestions.add ? "2/ 1/ 2/ 2" : "",
                fontSize: navManagePastQuestions.add ? "1.3rem" : "",
            }}>
                {!navManagePastQuestions.add ? (
                    <>
                    {!edit ? "add" : "update"}
                    </>
                ) : (
                    <>
                    {!edit ? "add past-question" : "update past-question"}
                    </>
                )}
                {!navManagePastQuestions.add ? <Plus /> : ""}
            </button>

            <button type="button"
            onClick={() => {
                setNavManagePastQuestions({add: false, view: true});
                setEditData({
                    id: "",
                    instituition: "",
                    course: "",
                    level: ""
                })
                setEdit(false);
            }}
            
            style={{
                border: navManagePastQuestions.view ? "none" : "",
                gridArea: navManagePastQuestions.view ? "2/ 1/ 2/ 2" : "",
                fontSize: navManagePastQuestions.view ? "1.3rem" : "",
            }}>
                {!navManagePastQuestions.view ? "modify" : "modify past-questions"}
                {!navManagePastQuestions.view ? <Settings2 /> : ""}
            </button>
        </div>

        {navManagePastQuestions.add && (
            <AddPastQuestion
            edit={edit}
            setEdit={setEdit}
            editData={editData}
            setEditData={setEditData}
            />
        )}
        {navManagePastQuestions.view && (
            <ModifyPastQuestions
            edit={edit}
            setEdit={setEdit}
            setNav={setNavManagePastQuestions}
            setEditData={setEditData}
            />
        )}
        </>
    )
}

export default AdminManagePastQuestions;
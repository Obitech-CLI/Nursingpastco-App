"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddPastQuestion } from "@/features/admin/manage/past-questions/components/AddPastQuestion";
import { Plus, Settings2 } from "lucide-react";
import "../manage.css";

function AdminManagePastQuestions() {

    const { navManagePastQuestions, setNavManagePastQuestions } = UseManageNav();

    return (
        <>
        <div className="switch">
            <button type="button"
            onClick={() => setNavManagePastQuestions({add: true, view: false})}
            style={{
                border: navManagePastQuestions.add ? "none" : "",
                gridArea: navManagePastQuestions.add ? "1/ 1/ 1/ 1" : "",
            }}>
                {!navManagePastQuestions.add ? "add" : "add past-questions"}
                {!navManagePastQuestions.add ? <Plus /> : ""}
            </button>

            <button type="button"
            onClick={() => setNavManagePastQuestions({add: false, view: true})}
            style={{
                border: navManagePastQuestions.view ? "none" : "",
                gridArea: navManagePastQuestions.view ? "1/ 1/ 1/ 1" : "",
            }}>
                {!navManagePastQuestions.view ? "modify" : "modify past-questions"}
                {!navManagePastQuestions.view ? <Settings2 /> : ""}
            </button>
        </div>

        {navManagePastQuestions.add && (<AddPastQuestion />)}
        </>
    )
}

export default AdminManagePastQuestions;
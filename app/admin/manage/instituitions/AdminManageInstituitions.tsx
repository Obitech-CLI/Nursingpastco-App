"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddInstituition } from "@/features/admin/manage/instituitions/components/AddInstituition";
import { ModifyInstituitions } from "@/features/admin/manage/instituitions/components/Modify";
import { Eye, Plus } from "lucide-react";
import { useState } from "react";

function AdminManageInstituitions() {

    const [reload, setReload] = useState(0);

    const { navManageInstituitions, setNavManageInstituitions } = UseManageNav();

    return (
        <>
        <div className="switch">
            <button type="button"
            onClick={() => setNavManageInstituitions({add: true, view: false})}
            style={{
                border: navManageInstituitions.add ? "none" : "",
                gridArea: navManageInstituitions.add ? "1/ 1/ 1/ 1" : "",
            }}>
                add instituitions{!navManageInstituitions.add ? <Plus /> : ""}
            </button>

            <button type="button"
            onClick={() => setNavManageInstituitions({add: false, view: true})}
            style={{
                border: navManageInstituitions.view ? "none" : "",
                gridArea: navManageInstituitions.view ? "1/ 1/ 1/ 1" : "",
            }}>
                view instituitions{!navManageInstituitions.view ? <Eye /> : ""}
            </button>
        </div>

        {navManageInstituitions.add && (<AddInstituition setReload={setReload}/>)}
        {navManageInstituitions.view && (<ModifyInstituitions reload={reload}/>)}
        </>
    )
}

export default AdminManageInstituitions;
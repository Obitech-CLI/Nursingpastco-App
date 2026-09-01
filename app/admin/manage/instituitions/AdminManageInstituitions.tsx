"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddInstituition } from "@/features/admin/manage/instituitions/components/AddInstituition";
import { ModifyInstituitions } from "@/features/admin/manage/instituitions/components/Modify";
import { Plus, Settings2 } from "lucide-react";
import { useState } from "react";

function AdminManageInstituitions() {

    const { navManageInstituitions, setNavManageInstituitions } = UseManageNav();
    const [ edit, setEdit ] = useState(false);
    const [ editData, setEditData ] = useState({
        id: "",
        instituition_name: "",
        instituition_abbr: ""
    });

    const [editLogo, setEditLogo] = useState<File | null>(null);

    return (
        <>
        <div className="switch" style={{
            gridTemplateColumns: navManageInstituitions.add || navManageInstituitions.view ?
            "1fr 1fr" : ""
        }}>
            <h2>manage instituitions</h2>
            <button type="button"
            onClick={() => setNavManageInstituitions({add: true, view: false})}
            style={{
                border: navManageInstituitions.add ? "none" : "",
                gridArea: navManageInstituitions.add ? "2/ 1/ 2/ 2" : "",
                fontSize: navManageInstituitions.add ? "1.1rem" : "",
            }}>
                {!navManageInstituitions.add ? (
                    <>
                    {!edit ? "add" : "update"}
                    </>
                ) : (
                    <>
                    {!edit ? "add instituition" : "update instituition"}
                    </>
                )}
    
                {!navManageInstituitions.add ? <Plus /> : ""}
            </button>

            <button type="button"
            onClick={() => {
                setNavManageInstituitions({add: false, view: true});
                setEditData({
                    id: "",
                    instituition_name: "",
                    instituition_abbr: "",
                })
                setEdit(false);
                setEditLogo(null);
            }}
            style={{
                border: navManageInstituitions.view ? "none" : "",
                gridArea: navManageInstituitions.view ? "2/ 1/ 2/ 2" : "",
                fontSize: navManageInstituitions.view ? "1.1rem" : "",
            }}>
                {!navManageInstituitions.view ? "modify" : "modify instituitions"}
                {!navManageInstituitions.view ? <Settings2 /> : ""}
            </button>
        </div>

        {navManageInstituitions.add && (
            <AddInstituition
            edit={edit}
            setEdit={setEdit}
            editData={editData}
            setEditData={setEditData}
            editLogo={editLogo}
            setEditLogo={setEditLogo}
            />
        )}
        {navManageInstituitions.view && (
            <ModifyInstituitions
            edit={edit}
            setEdit={setEdit}
            setNav={setNavManageInstituitions}
            setEditData={setEditData}
            editLogo={editLogo}
            setEditLogo={setEditLogo}
            />
        )}
        </>
    )
}

export default AdminManageInstituitions;
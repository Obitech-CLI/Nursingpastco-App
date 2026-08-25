"use client";

import { UseManageNav } from "@/contexts/admin/ManageNavProvider";
import { AddSiteInfo } from "@/features/admin/manage/site-info/components/AddSiteInfo";
import { ModifySiteInfo } from "@/features/admin/manage/site-info/components/Modify";
import { Plus, Settings2 } from "lucide-react";
import { useState } from "react";

function AdminManageSiteInfo() {

    const { navManageSiteInfo, setNavManageSiteInfo } = UseManageNav();
    const [ edit, setEdit ] = useState(false);

    return (
        <>
        <div className="switch">
            <h2>manage app/site info</h2>
            <button type="button"
            onClick={() => setNavManageSiteInfo({add: true, view: false})}
            style={{
                border: navManageSiteInfo.add ? "none" : "",
                gridArea: navManageSiteInfo.add ? "2/ 1/ 2/ 2" : "",
                fontSize: navManageSiteInfo.add ? "1.3rem" : "",
            }}>
                {!navManageSiteInfo.add ? (
                    <>
                    {!edit ? "add" : "update"}
                    </>
                ) : (
                    <>
                    {!edit ? "add info" : "update info"}
                    </>
                )}
                {!navManageSiteInfo.add ? <Plus /> : ""}
            </button>

            <button type="button"
            onClick={() => {
                setNavManageSiteInfo({add: false, view: true});
                setEdit(false);
            }}
            
            style={{
                border: navManageSiteInfo.view ? "none" : "",
                gridArea: navManageSiteInfo.view ? "2/ 1/ 2/ 2" : "",
                fontSize: navManageSiteInfo.view ? "1.3rem" : "",
            }}>
                {!navManageSiteInfo.view ? "modify" : "modify info"}
                {!navManageSiteInfo.view ? <Settings2 /> : ""}
            </button>
        </div>

        {navManageSiteInfo.add && (<AddSiteInfo />)}
        {navManageSiteInfo.view && (<ModifySiteInfo />)}
        </>
    )
}

export default AdminManageSiteInfo;
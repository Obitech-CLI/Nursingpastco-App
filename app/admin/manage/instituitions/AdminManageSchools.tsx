"use client";

import { AddInstituition } from "@/features/admin/manage/instituitions/components/AddInstituition";
import { ModifyInstituitions } from "@/features/admin/manage/instituitions/components/Modify";
import { useState } from "react";

function AdminManageInstituitions() {

    const [reload, setReload] = useState(0);

    return (
        <>
        <AddInstituition setReload={setReload}/>
        <ModifyInstituitions reload={reload}/>
        </>
    )
}

export default AdminManageInstituitions;
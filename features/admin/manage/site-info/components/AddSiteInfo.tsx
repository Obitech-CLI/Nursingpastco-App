"use client";

import { useState } from "react";
import { AddForm } from "./AddForm";

export type SiteInfoDataTypes = {
    category: string;
    information: string;
}

function AddSiteInfo() {

    const [formData, setFormData] = useState({
        category: "",
        information: ""
    })

    return (
        <AddForm
        formData={formData}
        setFormData={setFormData}
        />
    )
}

export { AddSiteInfo }
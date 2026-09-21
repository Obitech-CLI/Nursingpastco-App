"use client";

import { useState } from "react";
import { AdminType } from "../dashboard/components/AdminCard";

function AdminImage() {

    const [admin, setAdmin] = useState<AdminType | null>(() => {
        const storedAdmin = localStorage.getItem("admin");
        return storedAdmin ? JSON.parse(storedAdmin) : null;
    });

    return (
        <div className="image">
            <div className="img">
                {admin?.firstname.slice(0, 1)} 
                {admin?.lastname.slice(0, 1)}
            </div>
        </div>
    )
}

export { AdminImage }
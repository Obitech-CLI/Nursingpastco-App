"use client";

import { SetStateAction, useState } from "react";
import { AdminType } from "../dashboard/components/AdminCard";
import { Pen, PenBox, X } from "lucide-react";

function AdminDetails() {

    const [admin, setAdmin] = useState<AdminType | null>(() => {
        const storedAdmin = localStorage.getItem("admin");
        return storedAdmin ? JSON.parse(storedAdmin) : null;
    })

    return (
        <form className="details">
            
            <label>
                <span>firstname</span>
                <input type="text" value={admin?.firstname} disabled={true} />
            </label>

            <label>
                <span>lastname</span>
                <input type="text" value={admin?.lastname} disabled={true} />
            </label>

            <label>
                <span>email address</span>
                <input type="text" value={admin?.email} disabled={true} />
            </label>
        </form>
    )
}

export { AdminDetails }
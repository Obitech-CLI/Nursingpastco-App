"use client";

import { UseFetch } from "@/hooks/useFetch";
import { CreateAdminType } from "@/types/admin";
import { LogoutAdminButton } from "@/ui/logouts/LogoutAdmin";
import { useEffect, useState } from "react";

function AdminCard() {

    const [admin, setAdmin] = useState<CreateAdminType | null>(null);

    const FetchAdmin = UseFetch();

    const HandleFetch = async () =>
    {
        const res = await FetchAdmin.Fetch("/admin");
        if (!res.success) return;
        setAdmin(res.admin)
    }

    useEffect(() => {
        HandleFetch();
    }, []);

    return (
        <div>
            <div>{admin?.firstname.slice(0, 1)} 
                {admin?.lastname.slice(0, 1)}
            </div>
            
            <div>
                <h2>{admin?.firstname ?? "loading...."} {admin?.lastname ?? "loading..."}</h2>
            </div>
            <LogoutAdminButton />
        </div>
    )
}

export { AdminCard }
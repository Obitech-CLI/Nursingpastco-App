"use client";

import { UseFetch } from "@/hooks/useFetch";
import { CreateAdminType } from "@/types/admin";
import { LogoutAdminButton } from "@/ui/logouts/LogoutAdmin";
import { useEffect, useState } from "react";
import styles from '../styles.module.css';

function AdminCard() {

    const [admin, setAdmin] = useState<CreateAdminType | null>(null);

    const FetchAdmin = UseFetch();

    const HandleFetch = async () =>
    {
        const res = await FetchAdmin.Fetch("/admin");
        if (!res) return;
        setAdmin(res.admin)
    }

    useEffect(() => {
        HandleFetch();
    }, []);

    return (
        <div className={styles.card}>
            <h2>admin dashboard</h2>
            <div className={styles.image}>
                {admin?.firstname.slice(0, 1)} 
                {admin?.lastname.slice(0, 1)}
            </div>
            
            <h3>{admin?.firstname ?? "loading...."} {admin?.lastname ?? "loading..."}</h3>
            <LogoutAdminButton />
        </div>
    )
}

export { AdminCard }
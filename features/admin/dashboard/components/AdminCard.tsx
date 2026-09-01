"use client";

import { LogoutAdminButton } from "@/ui/logouts/LogoutAdmin";
import { useState } from "react";
import styles from '../styles.module.css';

type AdminType = {
    firstname: string;
    lastname: string;
    email: string;
}

function AdminCard() {

    const [admin, setAdmin] = useState<AdminType | null>(() => {
        const storedAdmin = localStorage.getItem("admin");
        return storedAdmin ? JSON.parse(storedAdmin) : null;
    })

    return (
        <div className={styles.card}>
            <h2>admin dashboard</h2>
            
            <div className={styles.image}>
                {admin?.firstname.slice(0, 1)} 
                {admin?.lastname.slice(0, 1)}
            </div>

            <h3>{admin?.firstname} {admin?.lastname}</h3>
            
            <LogoutAdminButton />
        </div>
    )
}

export { AdminCard }
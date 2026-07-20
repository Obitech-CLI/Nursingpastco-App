"use client";

import Link from "next/link";
import styles from "../styles.module.css";
import { Settings } from "lucide-react";

function AdminManageNav() {
    return (
        <div className={styles.manage_nav}>
            <nav>
                <Link href=""><Settings size={40} />manage users</Link>
                <Link href="/admin/manage/instituitions"><Settings size={40} />manage instituitions</Link>
                <Link href="/admin/manage/courses"><Settings size={40} />manage courses</Link>
                <Link href="/admin/manage/past-questions"><Settings size={40} />manage pdfs</Link>
            </nav>
        </div>
    )
}

export { AdminManageNav }
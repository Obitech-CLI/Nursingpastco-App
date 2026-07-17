"use client";

import Link from "next/link";

function AdminManageNav() {
    return (
        <div>
            <nav>
                <Link href="">manage users</Link>
                <Link href="/admin/manage/instituitions">manage instituitions</Link>
                <Link href="/admin/manage/courses">manage courses</Link>
                <Link href="/admin/manage/past-questions">manage pdfs</Link>
            </nav>
        </div>
    )
}

export { AdminManageNav }
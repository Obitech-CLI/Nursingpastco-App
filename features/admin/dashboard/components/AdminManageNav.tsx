"use client";

import Link from "next/link";
import styles from "../styles.module.css";
import { Settings } from "lucide-react";

function AdminManageNav() {

    return (
        <div className={styles.manage_nav}>
            <nav>
                <div>
                    <h2>users</h2>
                    <h3>available: 3</h3>
                    <Link href="">
                    <Settings size={25} className={styles.icon}/>
                      manage
                    </Link>
                </div>
                
                <div>
                    <h2>instituitions</h2>
                    <h3>available: 6</h3>
                    <Link href="/admin/manage/instituitions">
                    <Settings size={25} className={styles.icon}/>
                      manage
                    </Link>
                </div>

                <div>
                    <h2>courses</h2>
                    <h3>available: 7</h3>
                    <Link href="/admin/manage/courses">
                    <Settings size={25} className={styles.icon}/>
                     manage
                    </Link>
                </div>

                <div>
                    <h2>past questions</h2>
                    <h3>available: 8</h3>
                    <Link href="/admin/manage/past-questions">
                    <Settings size={25} className={styles.icon}/>
                      manage
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export { AdminManageNav }
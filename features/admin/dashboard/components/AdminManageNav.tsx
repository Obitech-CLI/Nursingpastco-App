"use client";

import Link from "next/link";
import styles from "../styles.module.css";
import { Settings } from "lucide-react";

function AdminManageNav() {

    return (
        <div className={styles.manage_nav}>
            <nav>
                <div>
                    <h3>users</h3>
                    <h4>available: 3</h4>
                    <Link href="">
                    <Settings size={25} className={styles.icon}/>
                      manage
                    </Link>
                </div>
                
                <div>
                    <h3>instituitions</h3>
                    <h4>available: 6</h4>
                    <Link href="/admin/manage/instituitions">
                    <Settings size={25} className={styles.icon}/>
                      manage
                    </Link>
                </div>

                <div>
                    <h3>courses</h3>
                    <h4>available: 7</h4>
                    <Link href="/admin/manage/courses">
                    <Settings size={25} className={styles.icon}/>
                     manage
                    </Link>
                </div>

                <div>
                    <h3>past questions</h3>
                    <h4>available: 8</h4>
                    <Link href="/admin/manage/past-questions">
                    <Settings size={25} className={styles.icon}/>
                      manage
                    </Link>
                </div>

                <div>
                    <h3>site / app info</h3>
                    <h4>available: 5</h4>
                    <Link href="/admin/manage/info">
                    <Settings size={25} className={styles.icon}/>
                      manage
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export { AdminManageNav }
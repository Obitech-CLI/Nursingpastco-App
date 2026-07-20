"use client";

import { useState } from "react";
import styles from "./ui.module.css";
import { useTheme } from "next-themes";
import { ChevronDown, ChevronUp, Moon, Sun } from "lucide-react";

function AppTheme() {

    const { theme, setTheme } = useTheme();

    const [showTheme, HandleShowTheme] = useState(false);

    return (
        <div className={styles.app_theme}>
        <button onClick={() => HandleShowTheme(!showTheme)}>
            {theme === "dark" ? <Moon /> : <Sun />}
            {showTheme ? <ChevronDown /> : <ChevronUp />}
        </button>
        {showTheme && (
            <div className={styles.select_theme}>

                <div onClick={() => setTheme("light")} style={{
                backgroundColor: theme === "light" ? "royalblue" : ""
                }}>
                    <i className="bi bi-brightness-high-fill"></i>light
                </div>

                <div onClick={() => setTheme("dark")} style={{
                backgroundColor: theme === "dark" ? "royalblue" : ""
                }}>
                    <i className="bi bi-moon-stars-fill"></i>dark
                </div>
            </div>
        )}
        </div>
    )
}

export { AppTheme }
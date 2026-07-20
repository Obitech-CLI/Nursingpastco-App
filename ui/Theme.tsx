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

                <button onClick={() => {
                    setTheme("light");
                    HandleShowTheme(!showTheme);
                }} style={{
                border: theme === "light" ? "2px solid #002b4c" : ""
                }}>
                    <i className="bi bi-brightness-high-fill"></i>light
                </button>

                <button onClick={() => {
                    setTheme("dark");
                    HandleShowTheme(!showTheme);
                }} style={{
                border: theme === "dark" ? "2px solid #002b4c" : ""
                }}>
                    <i className="bi bi-moon-stars-fill"></i>dark
                </button>
            </div>
        )}
        </div>
    )
}

export { AppTheme }
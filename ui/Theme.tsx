"use client";

import { useState } from "react";
import styles from "./ui.module.css";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

function AppTheme() {

    const { theme, setTheme } = useTheme();

    const [showTheme, HandleShowTheme] = useState(false);

    return (
        <div className={styles.app_theme}>
        <button onClick={() => HandleShowTheme(!showTheme)}>
            
                {theme === "dark" ? <Moon /> : <Sun />}
        
        </button>
        {showTheme && (
            <div className={styles.select_theme}>

                <button onClick={() => {
                    setTheme("light");
                    HandleShowTheme(!showTheme);
                }} style={{
                backgroundColor: theme === "light" ? "#002b4c" : "",
                color: theme !== "light" ? "white" : ""
                }}>
                    <Sun size={20}/>light
                </button>

                <button onClick={() => {
                    setTheme("dark");
                    HandleShowTheme(!showTheme);
                }} style={{
                backgroundColor: theme === "dark" ? "#002b4c" : "",
                color: theme !== "dark" ? "black" : ""
                }}>
                    <Moon size={20}/>dark
                </button>
            </div>
        )}
        </div>
    )
}

export { AppTheme }
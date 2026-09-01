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

                <button className="icon" onClick={() => {
                    setTheme("light");
                    HandleShowTheme(!showTheme);
                }} style={{
                backgroundColor: theme === "dark" ? "#c0ebff" : "",
                color: theme === "light" ? "" : "black"
                }}>
                    <Sun size={20}/>light
                </button>

                <button className="icon" onClick={() => {
                    setTheme("dark");
                    HandleShowTheme(!showTheme);
                }} style={{
                backgroundColor: theme === "dark" ? "" : "#c0ebff",
                color: theme === "dark" ? "" : "black"
                }}>
                    <Moon size={20}/>dark
                </button>
            </div>
        )}
        </div>
    )
}

export { AppTheme }
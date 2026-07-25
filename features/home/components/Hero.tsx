"use client";

import Image from "next/image";
import styles from "../styles.module.css";
import hero from "@/public/hero.png";
import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { useEffect } from "react";

function Hero() {

    const { showLoginForm, showCreateForm, setShowLoginForm } = UseAuthProvider();

    useEffect(() => {
        document.body.style.overflow = showLoginForm || showCreateForm ? "hidden" : "auto";
    
        return () => {
                document.body.style.overflow = "auto";
            }
    }, [showLoginForm, showCreateForm])

    return (
        <div className={styles.hero}>
            <Image
            src={hero}
            alt=""
            className={styles.image}
            />
            <div>
                study for your nursing level exams with confidence.
            </div>

            <button onClick={() => setShowLoginForm(true)}>
                login
            </button>
        </div>
    )
}

export { Hero }
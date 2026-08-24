"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import styles from "../styles.module.css";
import { Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";

function LoginUserForm() {

    const { setShowCreateForm, setShowLoginForm, showLoginForm } = UseAuthProvider();

    const [focus, setFocus] = useState({
        email: false,
        password: false
    });

    useEffect(() => {
                document.body.style.overflow = showLoginForm ? "hidden" : "auto";
            
                return () => {
                        document.body.style.overflow = "auto";
                    }
            }, [showLoginForm])

    return (
        <form className={styles.auth}>
            <h2>login</h2>
            <div>
                <h4>don't have an account?</h4>
                <button onClick={() => {
                    setShowCreateForm(true);
                    setShowLoginForm(false);
                }}>
                    create account
                </button>
            </div>
            <h3>welcome back</h3>

            <label><Mail />
                <input type="email" name="email"
                onFocus={() => {
                    setFocus(prev => ({...prev, email: true}));
                }}
                />
                <span style={{
                    top: focus.email ? "-1rem" : "",
                }}>{focus.email ? "enter your email address" : "email address"}</span>
            </label>

            <label><Lock />
                <input type="password" name="password"
                onFocus={() => {
                    setFocus(prev => ({...prev, password: true}));
                }}
                />
                <span style={{
                    top: focus.password ? "-1rem" : "",
                }}>{focus.password ? "enter your password" : "password"}</span>
            </label>

            <button>
                continue
            </button>
        </form>
    )
}

export { LoginUserForm }
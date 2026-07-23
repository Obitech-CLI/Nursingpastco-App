"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import styles from "../styles.module.css";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";

function LoginUserForm() {

    const { setShowCreateForm, setShowLoginForm } = UseAuthProvider();

    const [focus, setFocus] = useState({
        email: false,
        password: false
    });

    return (
        <form className={styles.auth}>
            <h1>login</h1>
            <div>
                <h3>don't have an account?</h3>
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
                    top: focus.email ? "-0.9rem" : "",
                }}>{focus.email ? "enter your email address" : "email address"}</span>
            </label>

            <label><Lock />
                <input type="password" name="password"
                onFocus={() => {
                    setFocus(prev => ({...prev, password: true}));
                }}
                />
                <span style={{
                    top: focus.password ? "-0.9rem" : "",
                }}>{focus.password ? "enter your password" : "password"}</span>
            </label>

            <button>
                continue
            </button>
        </form>
    )
}

export { LoginUserForm }
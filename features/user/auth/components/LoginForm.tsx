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
            
                if (!showLoginForm) {
                        return () => {
                            document.body.style.overflow = "auto";
                        }
                    }
            }, [showLoginForm])

    return (
        <form className="auth">
            <h2>login</h2>
            <div className="change">
                <h4>don't have an account?</h4>
                <button type="button" className="open" onClick={() => {
                    setShowCreateForm(true);
                    setShowLoginForm(false);
                }}>
                    create an account
                </button>
            </div>
            <h3>welcome back</h3>

            <label><Mail size={30}/>
                <input type="email" name="email"
                onFocus={() => {
                    setFocus(prev => ({...prev, email: true}));
                }}
                />
                <span style={{
                    top: focus.email ? "-1rem" : "",
                }}>{focus.email ? "enter your email address" : "email address"}</span>
            </label>

            <label><Lock size={30}/>
                <input type="password" name="password"
                onFocus={() => {
                    setFocus(prev => ({...prev, password: true}));
                }}
                />
                <span style={{
                    top: focus.password ? "-1rem" : "",
                }}>{focus.password ? "enter your password" : "password"}</span>
            </label>

            <button type="submit">
                login
            </button>
        </form>
    )
}

export { LoginUserForm }
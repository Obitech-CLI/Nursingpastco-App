"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import styles from "../styles.module.css";
import { Lock, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";

function CreateUserForm() {

    const { setShowCreateForm, setShowLoginForm, showCreateForm } = UseAuthProvider();

    const [focus, setFocus] = useState({
            fname: false,
            lname: false,
            email: false,
            password: false
        });

        useEffect(() => {
                document.body.style.overflow = showCreateForm ? "hidden" : "auto";
                    
                return () => { document.body.style.overflow = "auto"; }
        }, [showCreateForm])

    return (
        <form className="auth">
            <h2>create account</h2>
            <div className="change">
                <h4>already have an account?</h4>

                <button type="button" className="open" onClick={() => {
                    setShowLoginForm(true);
                    setShowCreateForm(false)
                }}>
                    login instead
                </button>
            </div>
            <h3>join in</h3>
            <label><User />
                <input type="text" name="firstname"
                onFocus={() => {
                    setFocus(prev => ({...prev, fname: true}));
                }}
                />
                <span style={{
                    top: focus.fname ? "-1rem" : "",
                }}>{focus.fname ? "enter your firstname" : "firstname"}</span>
            </label>

            <label><User />
                <input type="text" name="lastname"
                onFocus={() => {
                    setFocus(prev => ({...prev, lname: true}));
                }}
                />
                <span style={{
                    top: focus.lname ? "-1rem" : "",
                }}>{focus.lname ? "enter your lastname" : "lastname"}</span>
            </label>

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

export { CreateUserForm }
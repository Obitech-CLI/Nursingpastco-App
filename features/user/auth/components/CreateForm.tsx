"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import styles from "../styles.module.css";
import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";

function CreateUserForm() {

    const { setShowCreateForm, setShowLoginForm } = UseAuthProvider();

    const [focus, setFocus] = useState({
            fname: false,
            lname: false,
            email: false,
            password: false
        });

    return (
        <form className={styles.auth}>
            <h1>create account</h1>
            <div>
                <h3>already have an account?</h3>

                <button onClick={() => {
                    setShowLoginForm(true);
                    setShowCreateForm(false)
                }}>
                    login instead
                </button>
            </div>
            <h3>sign up</h3>
            <label><User />
                <input type="text" name="firstname"
                onFocus={() => {
                    setFocus(prev => ({...prev, fname: true}));
                }}
                />
                <span style={{
                    top: focus.fname ? "-0.9rem" : "",
                }}>{focus.fname ? "enter your firstname" : "firstname"}</span>
            </label>

            <label><User />
                <input type="text" name="lastname"
                onFocus={() => {
                    setFocus(prev => ({...prev, lname: true}));
                }}
                />
                <span style={{
                    top: focus.lname ? "-0.9rem" : "",
                }}>{focus.lname ? "enter your lastname" : "lastname"}</span>
            </label>

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

export { CreateUserForm }
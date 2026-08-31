"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { LoginUserType } from "@/types/user";
import { Lock, Mail } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

type Props = {
    formData: LoginUserType;
    setFormData: React.Dispatch<SetStateAction<LoginUserType>>;
    loading: boolean;
    submit: React.FormEventHandler<HTMLFormElement>;
}

function LoginUserForm({formData, setFormData, loading, submit}:Props) {

    const { setShowCreateForm, setShowLoginForm, showLoginForm } = UseAuthProvider();

    const [focus, setFocus] = useState({
        email: false,
        password: false
    });

    useEffect(() => {
        document.body.style.overflow = showLoginForm ? "hidden" : "auto";
            
        return () => { document.body.style.overflow = "auto" }
    }, [showLoginForm])

    return (
        <form className="auth" onSubmit={submit}>
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
                <input type="email" name="email" value={formData.email}
                onFocus={() => {
                    setFocus(prev => ({...prev, email: true}));
                }}
                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                />
                <span style={{
                    top: focus.email ? "-1rem" : "",
                }}>{focus.email ? "enter your email address" : "email address"}</span>
            </label>

            <label><Lock size={30}/>
                <input type="password" name="password" value={formData.password}
                onFocus={() => {
                    setFocus(prev => ({...prev, password: true}));
                }}
                onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                />
                <span style={{
                    top: focus.password ? "-1rem" : "",
                }}>{focus.password ? "enter your password" : "password"}</span>
            </label>

            <button type="submit" disabled={loading}>
                {loading ? (
                    <>
                    <ClipLoader size={25} color="black"/>
                    {"logging..."}
                    </>
                ) : "create"}
            </button>
        </form>
    )
}

export { LoginUserForm }
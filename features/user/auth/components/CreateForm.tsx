"use client";

import { UseAuthProvider } from "@/contexts/user/AuthFormProvider";
import { ChevronDown, Lock, Mail, RotateCcw, School2, User, X } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { UseFetch } from "@/hooks/useFetch";
import { ClipLoader } from "react-spinners";
import { InstituitionDataTypes } from "@/types/types";
import { CreateUserType } from "@/types/user";

type Props = {
    formData: CreateUserType;
    setFormData: React.Dispatch<SetStateAction<CreateUserType>>;
    loading: boolean;
    submit: React.FormEventHandler<HTMLFormElement>;
}

function CreateUserForm({formData, setFormData, loading, submit}: Props) {

    const { setShowCreateForm, setShowLoginForm, showCreateForm } = UseAuthProvider();

    const [focus, setFocus] = useState({
            fname: false,
            lname: false,
            email: false,
            password: false
        });

        const [instituitions, setInstituitions] = useState<InstituitionDataTypes []>([]);

        const FetchInstituitions = UseFetch();

        const HandleFetchInstituitions = async () =>
        {
            const res = await FetchInstituitions.Fetch("/instituitions");

            if (!res) return;

            if (res.success) {
                setInstituitions(res.instituitions)
            }
        }

        const [showInstituitions, setShowInstituitions] = useState(false);

        useEffect(() => {
                document.body.style.overflow = showCreateForm || showInstituitions ? "hidden" : "auto";
                    
                return () => { document.body.style.overflow = "auto"; }
        }, [showCreateForm, showInstituitions])

        useEffect(() => {
            HandleFetchInstituitions();
        }, [])

        const HandleFormChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            const target = e.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            setFormData(prev => ({...prev, [name]: value}));
        }

    return (
        <form className="auth" onSubmit={submit}>
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
            <p>{JSON.stringify(formData)}</p>
            <label><User size={30}/>
                <input type="text" name="firstname" value={formData.firstname}
                onFocus={() => {
                    setFocus(prev => ({...prev, fname: true}));
                }}
                onChange={HandleFormChange}
                />
                <span style={{
                    top: focus.fname ? "-1rem" : "",
                }}>{focus.fname ? "enter your firstname" : "firstname"}</span>
            </label>

            <label><User size={30}/>
                <input type="text" name="lastname" value={formData.lastname}
                onFocus={() => {
                    setFocus(prev => ({...prev, lname: true}));
                }}
                onChange={HandleFormChange}
                />
                <span style={{
                    top: focus.lname ? "-1rem" : "",
                }}>{focus.lname ? "enter your lastname" : "lastname"}</span>
            </label>

            <label><Mail size={30}/>
                <input type="email" name="email" value={formData.email}
                onFocus={() => {
                    setFocus(prev => ({...prev, email: true}));
                }}
                onChange={HandleFormChange}
                />
                <span style={{
                    top: focus.email ? "-1rem" : "",
                }}>{focus.email ? "enter your email address" : "email address"}</span>
            </label>

            <label><School2 size={30}/>
                <label className="select" style={{width: "100%"}}>
                    <>
                    {formData.instituition ? formData.instituition : "select instituition"}
                    <span onClick={() => {
                    setShowInstituitions(true);
                    }}><ChevronDown />
                    </span>
                    </>

                    <>
                    {showInstituitions && (
                        <div className="select-overlay">
                            <>
                            <span onClick={() => setShowInstituitions(false)}>
                                <X size={30} color="var(--bg-txt-color)"/>
                            </span>
                            </>
                        {!FetchInstituitions.loading ? (
                            <>
                            {instituitions.length > 0 ? (
                                <ul>
                                    <h3>select instituition</h3>
                                    {instituitions.map(i => (
                                        <li key={i.id} onClick={() => {
                                            setFormData(prev => ({...prev, instituition: i.instituition_name}));
                                            setShowInstituitions(false);
                                        }}>
                                            {i.instituition_name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="retry">
                                    <p>{FetchInstituitions.error}</p>
                                    <button type="button" onClick={HandleFetchInstituitions}>
                                        retry
                                    </button>
                                </div>
                            )}
                            </>
                        ) : (
                            <div className="loading" style={{
                                border: "none"
                            }}>
                                <ClipLoader size={40} color="var(--bg-txt-color)"/>
                            </div>
                        )}
                        </div>
                    )}
                    </>


                </label>
            </label>

            
            <label><Lock size={30}/>
                <input type="password" name="password" value={formData.password}
                onFocus={() => {
                    setFocus(prev => ({...prev, password: true}));
                }}
                onChange={HandleFormChange}
                />
                <span style={{
                    top: focus.password ? "-1rem" : "",
                }}>{focus.password ? "enter your password" : "password"}</span>
            </label>

            <div className="terms-check">
                i accept these
                <input type="checkbox" name="terms" checked={formData.terms}
                onChange={HandleFormChange}
                />
                <Link href="/terms">terms and conditions</Link>
            </div>

            <button type="submit" disabled={loading || !formData.terms}>
                {loading ? (
                    <>
                    <ClipLoader size={25} color="black"/>
                    {"creating..."}
                    </>
                ) : "create"}
            </button>
        </form>
    )
}

export { CreateUserForm }
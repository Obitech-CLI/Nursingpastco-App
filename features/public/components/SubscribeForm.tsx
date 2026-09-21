"use client";

import { SetStateAction } from "react";
import { ClipLoader } from "react-spinners";

type Props = {
    email: string;
    setEmail: React.Dispatch<SetStateAction<string>>;
    focus: boolean;
    setFocus: React.Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    submit: React.FormEventHandler<HTMLFormElement>;
    unSubscribe: () => void;
    unSubLoading: boolean;
}

function SubscribeForm({email, setEmail, focus, setFocus, loading, submit, unSubscribe, unSubLoading}:Props) {

    return (
        <form className="subscribe" onSubmit={submit}>
            <label>
                <span style={{
                    top: focus ? "-1rem" : ""
                }}>
                    {focus ? "enter your email address" : "email address"}
                </span>
                <input type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => {
                    if (!email) {
                        setFocus(false);
                    }
                }}
                />
            </label>

            <div className="btns">
                <button type="button" disabled={unSubLoading} onClick={unSubscribe}>
                {unSubLoading ? "unsubscribing..." : "unsubscribe"}
                {unSubLoading && <ClipLoader size={25}/>}
            </button>

            <button type="submit" disabled={loading}>
                {loading ? "subscribing..." : "subscribe"}
                {loading && <ClipLoader size={25}/>}
            </button>
            </div>
        </form>
    )
}

export { SubscribeForm }
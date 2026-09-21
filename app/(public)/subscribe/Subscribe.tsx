"use client";

import { useConfirmModal } from "@/contexts/modals/FeedbackContext";
import { SubscribeForm } from "@/features/public/components/SubscribeForm";
import { UseDelete } from "@/hooks/useDelete";
import { UsePost } from "@/hooks/usePost";
import { useEffect, useState } from "react";

function Subscribe() {

    const [ email, setEmail ] = useState("");
    const [ focus, setFocus ] = useState(false);

    const [deleteEmail, setDeleteEmail] = useState("");
    
    const { confirm, setShowConfirmModal, setConfirmMessage } = useConfirmModal();

    const PostSubscribe = UsePost();
    const Unsubscribe = UseDelete();

    const HandleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        const res = await PostSubscribe.Post("/subscribe", {email: email});

        if (res) {
            setEmail("");
            setFocus(false);
        }
    }

    const HandleUnsubscribeClick = () =>
    {
        if (!email) return;

        setDeleteEmail(email);

        setConfirmMessage("are you sure you want to unsubscribe to our newsletter?");
        setShowConfirmModal(true);
    }
    
    const Delete = async () => {

        if (!confirm && !deleteEmail) return;
    
        const res = await Unsubscribe.Delete(`/subscribe/${deleteEmail}`);
    
        if (res) {
            if (res.success) {
               setDeleteEmail("");
               setEmail("");
               setFocus(false);
            }
        }

    }
    
    useEffect(() => {
        Delete();
    }, [confirm]);

    return (
        <div className="Subscribe">
        <h3>subscribe to our newsletter</h3>
        <p>get notified about any latest update on our webite</p>
        <SubscribeForm
        email={email}
        setEmail={setEmail}
        focus={focus}
        setFocus={setFocus}
        submit={HandleFormSubmit}
        loading={PostSubscribe.loading}
        unSubLoading={Unsubscribe.loading}
        unSubscribe={HandleUnsubscribeClick}
        />
        </div>
    )
}

export { Subscribe }
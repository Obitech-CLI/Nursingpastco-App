"use client";

import { useConfirmModal, useErrorModal, useSuccessModal } from "@/contexts/modals/FeedbackContext";
import styles from "../ui.module.css";
import { CircleAlert, CircleCheck } from "lucide-react";
import { useEffect } from "react";

function SuccessModal() {

    const { successMessage, showSuccessModal, setSuccessMessage, setShowSuccessModal } = useSuccessModal();

    const dismissModal = () => {
        setShowSuccessModal(false)
        setSuccessMessage("")
    }

    useEffect(() => {
        document.body.style.overflow = successMessage ? "hidden" : "";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [successMessage]);

    return (
        <>
        {successMessage && showSuccessModal ? (
            <div className={styles.feedback_modal}>
                <div className={styles.success}>
                    <p>{successMessage}</p>
                    <CircleCheck size={30}/>
                    <button onClick={dismissModal}>ok</button>
                </div>
            </div>
        ) : (null)}
        </>
    )
}

function ErrorModal() {

    const { errorMessage, setErrorMessage, showErrorModal, setShowErrorModal } = useErrorModal();

    const dismissModal = () => {
        setShowErrorModal(false);
        setErrorMessage("")
    }

    useEffect(() => {
        document.body.style.overflow = errorMessage ? "hidden" : "";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [errorMessage]);

    return (
        <>
        {showErrorModal && errorMessage ? (
            <div className={styles.feedback_modal}>
                <div className={styles.error}>
                    <p>{errorMessage}</p>
                    <CircleAlert size={30}/>
                    <button onClick={dismissModal}>ok</button>
                </div>
            </div>
        ) : (null)}
        </>
    )
}

function ConfirmModal() {

    const { setConfirm, confirmMessage, setConfirmMessage, setShowConfirmModal , showConfirmModal} = 
    useConfirmModal();

    const dismissModal = () => {
        setShowConfirmModal(false);
        setConfirmMessage("");
        setConfirm(false);
    }

    useEffect(() => {
        document.body.style.overflow = confirmMessage ? "hidden" : "";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [confirmMessage]);

    return (
        <>
        {showConfirmModal && confirmMessage ? (
            <div className={styles.feedback_modal}>

                <div className={styles.error}>

                    <p>{confirmMessage}</p>
                    <CircleAlert size={30}/>
                    <button onClick={dismissModal}>cancel</button>

                    <button onClick={() => {
                        setConfirm(true);
                        setShowConfirmModal(false);
                        setConfirmMessage("");
                    }} style={{backgroundColor: "red"}}>
                        continue
                    </button>
                    
                </div>

            </div>
        ) : (null)}
        </>
    )
}

export { SuccessModal, ErrorModal, ConfirmModal }
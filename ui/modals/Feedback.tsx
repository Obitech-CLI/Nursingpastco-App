"use client";

import { useErrorModal, useSuccessModal } from "@/contexts/modals/FeedbackContext";
import styles from "../ui.module.css";
import { BadgeCheck, CircleAlert, CircleCheck, CircleX } from "lucide-react";

function SuccessModal() {

    const { successMessage, showSuccessModal, setSuccessMessage, setShowSuccessModal } = useSuccessModal();

    const dismissModal = () => {
        setShowSuccessModal(false)
        setSuccessMessage("")
    }

    return (
        <>
        {successMessage && showSuccessModal ? (
            <div className={styles.feedback_modal}>
                <div className={styles.success}>
                    <h3>{successMessage}</h3>
                    <CircleCheck size={40}/>
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
        setShowErrorModal(false)
        setErrorMessage("")
    }

    return (
        <>
        {showErrorModal && errorMessage ? (
            <div className={styles.feedback_modal}>
                <div className={styles.error}>
                    <h3>{errorMessage}</h3>
                    <CircleAlert size={40}/>
                    <button onClick={dismissModal}>ok</button>
                </div>
            </div>
        ) : (null)}
        </>
    )
}

export { SuccessModal, ErrorModal }
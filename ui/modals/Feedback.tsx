"use client";

import { useConfirmModal, useErrorModal, useSuccessModal } from "@/contexts/modals/FeedbackContext";
import styles from "../ui.module.css";
import { CircleAlert, CircleCheck } from "lucide-react";
import { UseDelete } from "@/hooks/useDelete";

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
                    <h4>{successMessage}</h4>
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
        setShowErrorModal(false)
        setErrorMessage("")
    }

    return (
        <>
        {showErrorModal && errorMessage ? (
            <div className={styles.feedback_modal}>
                <div className={styles.error}>
                    <h4>{errorMessage}</h4>
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

    return (
        <>
        {showConfirmModal && confirmMessage ? (
            <div className={styles.feedback_modal}>

                <div className={styles.error}>

                    <h4>{confirmMessage}</h4>
                    <CircleAlert size={30}/>
                    <button onClick={dismissModal}>cancel</button>

                    <button onClick={() => {
                        setConfirm(true);
                        setShowConfirmModal(false);
                        setConfirmMessage("");
                    }} style={{backgroundColor: "red"}}>
                        delete
                    </button>
                    
                </div>

            </div>
        ) : (null)}
        </>
    )
}

export { SuccessModal, ErrorModal, ConfirmModal }
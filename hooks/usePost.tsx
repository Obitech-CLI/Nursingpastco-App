"use client";

import { useErrorModal, useSuccessModal } from "@/contexts/modals/FeedbackContext";
import { api } from "@/lib/axios";
import axios from "axios";
import { useState } from "react";

function UsePost() {

    const [loading, setLoading] = useState(false);

    const { setSuccessMessage, setShowSuccessModal } = useSuccessModal();
    const { setErrorMessage, setShowErrorModal } = useErrorModal();

    const Post = async (url:string, formData:any) =>
    {
        try {
            if (!navigator.onLine) {
                setShowErrorModal(true);
                setErrorMessage("no internet connection");
                return;
            }

            setLoading(true);

            const { data } = await api.post(url, formData);

            setShowSuccessModal(true);
            setSuccessMessage(data.message);

            return data;

        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.code === "ECONNABORTED") {
                    setShowErrorModal(true);
                    setErrorMessage("request timed out");
                    return;
                }
                setShowErrorModal(true);
                setErrorMessage(err.response?.data?.error ?? "something went wrong");
            } else {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    }

    return { Post, loading }

}

export { UsePost }
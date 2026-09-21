"use client";

import {
  useConfirmModal,
  useErrorModal,
  useSuccessModal,
} from "@/contexts/modals/FeedbackContext";
import { api } from "@/lib/axios";
import axios from "axios";
import { useEffect, useState } from "react";

type errorType = {
  delete?: boolean;
};

function UseDelete() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<errorType | null>(null);

  const { setSuccessMessage, setShowSuccessModal } = useSuccessModal();
  const { setErrorMessage, setShowErrorModal } = useErrorModal();

  const { confirm, setConfirm } = useConfirmModal();

  const Delete = async (url: string) => {
    try {
      if (!navigator.onLine) {
        setShowErrorModal(true);
        setErrorMessage("no internet connection");
        return;
      }

      if (!confirm) return;

      setLoading(true);

      const { data } = await api.delete(url);

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
        setError(err?.response?.data);
        setShowErrorModal(true);
        setErrorMessage(err.response?.data?.error ?? "something went wrong");
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  return { Delete, loading, error };
}

export { UseDelete };

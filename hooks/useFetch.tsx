"use client";

import { api } from "@/lib/axios";
import axios from "axios";
import { useState } from "react";

function UseFetch() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const Fetch = async (url:string) =>
    {
        try {
            if (!navigator.onLine) {
                setError("no internet connection")
                return;
            }

            setLoading(true);

            const { data } = await api.get(url);
            return data;

        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.code === "ECONNABORTED") {
                    setError("request timed out");
                    return;
                }

                setError(err.response?.data?.error ?? "something went wrong")
            } else {
                console.error(err);
            }
        } finally {
            setLoading(false)
        }
    }

    return { Fetch, loading, error }

}

export { UseFetch }
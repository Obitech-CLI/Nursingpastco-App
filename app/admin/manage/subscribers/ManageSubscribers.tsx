"use client";

import { ModifySubscribers, SubscribersType } from "@/features/admin/manage/subscribers/components/Modify";
import { SearchEmail } from "@/features/admin/manage/subscribers/components/Search";
import { UseFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react"

function ManageSubscribers() {

    const [ subscribers, setSubscribers ] = useState<SubscribersType []>([]);

    const [ search, setSearch ] = useState("");
    const [ page, setPage ] = useState(1);

    const FetchSubscribers = UseFetch();
    const HandleFetchSubscribers = async () =>
    {
        const res = await FetchSubscribers.Fetch(`/subscribe?search=${search}&page=${page}`);

        setSubscribers([]);

        if (res) {
            if (res.success) {
                setSubscribers(res.subscribers)
            }
        }
    }

    useEffect(() => {
        HandleFetchSubscribers();
    },[search, page]);

    return (
        <>
        <SearchEmail
        search={search} 
        setSearch={setSearch}
        />
        <h3>subscribers</h3>
        <ModifySubscribers
        subscribers={subscribers}
        setSubscribers={setSubscribers}
        page={page}
        setPage={setPage}
        loading={FetchSubscribers.loading}
        error={FetchSubscribers.error}
        reload={HandleFetchSubscribers}
        />
        </>
    )
}

export default ManageSubscribers;
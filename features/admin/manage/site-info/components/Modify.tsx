"use client";

import { UseFetch } from "@/hooks/useFetch";
import { AppInfoCategories } from "@/ui/AppContent";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

type SiteInfoType = {
    id: number;
    category: string;
    information: string;
}

function ModifySiteInfo() {

    const [siteInfo, setSiteInfo] = useState<SiteInfoType[]>([]);

    const [selectedCategory, setSelectedCategory] = useState("");

    const FetchSiteInfo = UseFetch();

    const HandleFetchSiteInfo = async () =>
    {
        if (!selectedCategory) return;

        const res = await FetchSiteInfo.Fetch(`/site-info/${selectedCategory}`);

        if (!res) return;

        setSiteInfo(res.siteInfo);
    }

    useEffect(() => {
        HandleFetchSiteInfo();
    }, [selectedCategory])

    return (
        <>
        <div className="modify">

            {AppInfoCategories.length > 0 && (
                <div className="site-info-btns">
                {AppInfoCategories.map(category => (
                    <button type="button" key={category.id}
                    onClick={() => {
                        setSelectedCategory(category.category)
                    }}
                    style={{
                        backgroundColor: selectedCategory === category.category ? "transparent" : "",
                        color: selectedCategory === category.category ? "var(--bg-txt-color)" : "",
                        border: selectedCategory === category.category ? "var(--border)" : ""
                    }}
                    >
                        {category.category}
                    </button>
                ))}
                </div>
            )}

            {selectedCategory && (
                <>
                <h2>{selectedCategory}</h2>
                {!FetchSiteInfo.loading ? (
                    <>
                    {siteInfo.length > 0 ? (
                        <ul>
                        {siteInfo.map(info => (
                            <li key={info.id}>
                                {info.information}
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <>
                        {FetchSiteInfo.error && (
                            <div className="retry">
                            <p>{FetchSiteInfo.error}</p>
                            <button type="button" onClick={HandleFetchSiteInfo}>
                                retry
                            </button>
                        </div>
                        )}
                        </>
                    )}
                    </>
                ) : (
                    <div className="loading">
                        <ClipLoader size={40}/>
                    </div>
                )}
                </>
            )}

        </div>
        </>
    )
}

export { ModifySiteInfo }
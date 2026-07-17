"use client";

import { UseFetch } from "@/hooks/useFetch";
import { InstituitionDataTypes } from "@/types/types";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../styles.module.css";

type Props = {
    setSelectedInstituition: React.Dispatch<SetStateAction<string>>;
}

function SelectInstituition({setSelectedInstituition}:Props) {

    const [instituitions, setInstituitions] = useState<InstituitionDataTypes[]>([]);

    const FetchInstituitions = UseFetch();

    const HandleFetch = async () =>
    {
        const res = await FetchInstituitions.Fetch("/instituitions");

        if (!res) return;

        setInstituitions(res.instituitions);
    }

    useEffect(() => {
        HandleFetch();
    }, []);


    return (
        <>
        {!FetchInstituitions.loading ? (
        <>
        {!FetchInstituitions.error && instituitions.length > 0 ? (
            <div className={styles.instituitions}>
            {instituitions.map(instituition => (
                <div key={instituition.id} className={styles.instituition}>
                    <h2>{instituition.instituition_abbr}</h2>
                    <Image
                    src={instituition.instituition_logo}
                    alt=""
                    loading="eager"
                    width={150}
                    height={150}
                    />
                    <h3>{instituition.instituition_name}</h3>
                    
                    <button type="button" onClick={() => {
                        setSelectedInstituition(instituition.instituition_name);
                        }}>
                        past questions
                    </button>
                    
                </div>
            ))}
            </div>
        ) : (
            <>
            {FetchInstituitions.error ? (
                <div>
                    <p>{FetchInstituitions.error}</p>
                    <button onClick={HandleFetch}>
                     retry
                    </button>
                </div>
            ) : (
                <>
                {!FetchInstituitions.loading && (<p>no instituition found</p>)}
                </>
            )}
            </>
        )}
        </>
        ) : (
            <ClipLoader size={40} />
        )}
        </>
    )
}

export { SelectInstituition }
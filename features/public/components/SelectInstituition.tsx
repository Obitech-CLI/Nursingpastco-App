"use client";

import { UseFetch } from "@/hooks/useFetch";
import { InstituitionDataTypes } from "@/types/types";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../styles.module.css";
import InstituitionHero from "@/public/InstituitionLogo.jpeg";

type Props = {
    setSelectedInstituition: React.Dispatch<SetStateAction<string>>;
    setSelectedLogo: React.Dispatch<SetStateAction<string | null>>;
}

function SelectInstituition({setSelectedInstituition, setSelectedLogo}:Props) {

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
        <div className={styles.hero}>
            <Image alt="" src={InstituitionHero} />
            <h2>school of nursing</h2>
            <h3>here are the list of instituitions with available past questions</h3>
        </div>
        {!FetchInstituitions.loading ? (
        <>
        {!FetchInstituitions.error && instituitions.length > 0 ? (
            <div className={styles.instituitions}>
            {instituitions.map(instituition => (
                <div key={instituition.id} className={styles.instituition}>
                    <Image
                    src={instituition.instituition_logo}
                    alt=""
                    loading="eager"
                    width={200}
                    height={200}
                    />
                    <h2>{instituition.instituition_abbr}</h2>
                    <h4>{instituition.instituition_name}</h4>
                    
                    <button type="button" onClick={() => {
                        setSelectedInstituition(instituition.instituition_name);
                        setSelectedLogo(instituition.instituition_logo);
                        }}>
                        past questions
                    </button>
                    
                </div>
            ))}
            </div>
        ) : (
            <>
            {FetchInstituitions.error && !FetchInstituitions.loading ? (
                <div className="retry">
                    <h4>{FetchInstituitions.error}</h4>
                    <button onClick={HandleFetch}>
                     retry
                    </button>
                </div>
            ) : (null)}
            </>
        )}
        </>
        ) : (
            <div className="loading">
                <ClipLoader size={60} color="var(--bg-txt-color)"/>
            </div>
        )}
        </>
    )
}

export { SelectInstituition }
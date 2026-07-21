"use client";

import { UseFetch } from "@/hooks/useFetch";
import { InstituitionDataTypes } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../styles.module.css";
import { Edit3Icon, X } from "lucide-react";
import { useTheme } from "next-themes";

type Props = {
    reload: number;
}

function ModifyInstituitions({reload}:Props) {

    const [instituitions, setInstituitions] = useState<InstituitionDataTypes []>([]);

    const FetchInstituitions = UseFetch();

    const HandleFetch = async () =>
    {
        const res = await FetchInstituitions.Fetch("/instituitions");

        if (!res) return;

        setInstituitions(res.instituitions);
    }

    useEffect(() => {
        HandleFetch();
    }, [reload]);

    const { theme } = useTheme();

    return (
        <div className={styles.modify}>
            <h2>modify instituitions</h2>

            {!FetchInstituitions.loading ? (
            <>
            {instituitions.length > 0 ? (
                <div className={styles.instituitions}>
                    {instituitions.map(instituition => (
                        <div className={styles.instituition} key={instituition.id}>

                        <div>
                            <h4>{instituition.instituition_name}</h4>
                            <div className={styles.logo}>
                                <Image 
                                alt="" 
                                src={instituition.instituition_logo} 
                                height={130} 
                                width={130}
                                />
                            </div>
                            <span>{instituition.instituition_abbr}</span>
                        </div>

                        <div className={styles.btns}>
                            <button>
                                <Edit3Icon color="navy" size={30}/>
                            </button>

                            <button>
                                <X color="red" size={30}/>
                            </button>
                        </div>

                        </div>
                    ))}
                </div>
            ) : (
                <>
                {!FetchInstituitions.loading && !FetchInstituitions.error ? (
                    <p className={styles.notfound}>no instituitions found</p>
                ) : (
                    <div className={styles.retry}>
                        <p>{FetchInstituitions.error}</p>
                        <button onClick={HandleFetch}>
                            retry
                        </button>
                    </div>
                )}
                </>
            )}
            </>
            ) : (
                <div className={styles.spinner}>
                    <ClipLoader 
                    size={50} 
                    cssOverride={{ borderWidth: "2px" }}
                    color={theme !== "dark" ? "black" : "white"}
                    />
                </div>
            )}
        </div>
    )
}

export { ModifyInstituitions }
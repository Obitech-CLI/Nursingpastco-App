"use client";

import { UseFetch } from "@/hooks/useFetch";
import { InstituitionDataTypes } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../styles.module.css";
import { Edit, Edit3Icon, X } from "lucide-react";
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
        <div className="modify">

            {!FetchInstituitions.loading ? (
            <>
            {instituitions.length > 0 ? (
                <div className="searched">
                    <h2>instituitions</h2>

                    <div className="data">
                    {instituitions.map(instituition => (
                        <div key={instituition.id} className="instituitions">
                        
                            <Image 
                                alt="" 
                                src={instituition.instituition_logo} 
                                height={150} 
                                width={150}
                            />

                            <div>

                            <span>{instituition.instituition_abbr}</span>
                            <h4>{instituition.instituition_name}</h4>

                            <div className={styles.btns}>
                            <button>
                                <Edit color="navy" size={30}/>
                            </button>

                            <button>
                                <X color="red" size={30}/>
                            </button>
                            </div>

                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            ) : (
                <>
                {!FetchInstituitions.loading && !FetchInstituitions.error ? (
                    <p className={styles.notfound}>no instituitions found</p>
                ) : (
                    <div className="retry">
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
                <div className="loading">
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
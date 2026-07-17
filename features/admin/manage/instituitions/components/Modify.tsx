"use client";

import { UseFetch } from "@/hooks/useFetch";
import { InstituitionDataTypes } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

type Props = {
    reload: number;
}

function ModifyInstituitions({reload}:Props) {

    const [instituitions, setInstituitions] = useState<InstituitionDataTypes []>([]);

    const fetctInstituitions = UseFetch();

    const loading = fetctInstituitions.loading;

    const HandleFetch = async () =>
    {
        const res = await fetctInstituitions.Fetch("/instituitions");

        if (!res) return;

        setInstituitions(res.instituitions);
    }

    useEffect(() => {
        HandleFetch();
    }, [reload]);

    return (
        <div>
            <h2>instituitions</h2>

            {!loading ? (
            <>
            {instituitions.length > 0 ? (
                <div>
                    {instituitions.map(instituition => (
                        <div key={instituition.id}>
                            {instituition.instituition_name}
                            <div>
                                <Image 
                                alt="" 
                                src={instituition.instituition_logo} 
                                height={100} 
                                width={100}
                                />
                            </div>
                            {instituition.instituition_abbr}
                        </div>
                    ))}
                </div>
            ) : (<p>no instituitions found</p>)}
            </>
            ) : (
              <ClipLoader size={50} cssOverride={{ borderWidth: "5px" }} />
            )}
        </div>
    )
}

export { ModifyInstituitions }
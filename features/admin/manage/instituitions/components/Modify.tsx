"use client";

import { UseFetch } from "@/hooks/useFetch";
import { InstituitionDataTypes } from "@/types/types";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Edit, X } from "lucide-react";
import { useTheme } from "next-themes";
import { UseDelete } from "@/hooks/useDelete";
import { useConfirmModal } from "@/contexts/modals/FeedbackContext";

interface Nav {
    add: boolean;
    view: boolean;
}

interface editData {
    id: string,
    instituition_name: string,
    instituition_abbr: string,
}

type Props = {
    edit: boolean,
    setEdit: React.Dispatch<SetStateAction<boolean>>;
    setNav: React.Dispatch<SetStateAction<Nav>>;
    setEditData: React.Dispatch<SetStateAction<editData>>;
    editLogo: File | null;
    setEditLogo: React.Dispatch<SetStateAction<File | null>>;
}

function ModifyInstituitions({edit, setEdit, setNav, setEditData} : Props) {

    const [instituitions, setInstituitions] = useState<InstituitionDataTypes []>([]);

    const [deleteId, setDeleteId] = useState("");
    const [reload, setReload] = useState(0);

    const FetchInstituitions = UseFetch();
    const DeleteInstituition = UseDelete();

    const { confirm, setShowConfirmModal, setConfirmMessage } = useConfirmModal();

    const HandleFetch = async () =>
    {
        const res = await FetchInstituitions.Fetch("/instituitions");

        if (!res) return;

        setInstituitions(res.instituitions);
    }

    const HandleDeleteClick = (id: string) =>
    {
        if (!id) return;

        setConfirmMessage("are you sure you want to delete instituition?");
        setShowConfirmModal(true);
        setDeleteId(id);
    }

    const Delete = async () => {
        if (!confirm && !deleteId) return;
        await DeleteInstituition.Delete(`/instituitions/${deleteId}`);

        setReload(prev => prev + 1);
        setDeleteId("")
    }

    useEffect(() => {
        Delete();
    }, [confirm])

    useEffect(() => {
        HandleFetch();
    }, [reload]);

    return (
        <div className="modify">

            {!FetchInstituitions.loading ? (
            <>
            {instituitions.length > 0 ? (
                <>
                    <h3>all instituitions</h3>

                    <>
                    {instituitions.map(instituition => (
                        <div key={instituition.id} className="results">
                        
                            <Image 
                                alt="" 
                                src={instituition.instituition_logo} 
                                height={100} 
                                width={100}
                                style={{
                                    alignSelf: "center",
                                    objectFit: "contain"
                                }}
                            />

                            <div>

                            <h3 style={{textTransform: "uppercase"}}>
                                {instituition.instituition_abbr}
                            </h3>
                            <h4>{instituition.instituition_name}</h4>

                            <div className="btns">
                            <button onClick={() => {
                                setEdit(true);
                                setNav({add: true, view: false});
                                setEditData({
                                    id: String(instituition.id),
                                    instituition_name: instituition.instituition_name,
                                    instituition_abbr: instituition.instituition_abbr
                                })
                            }}>
                                <Edit color="navy" size={30}/>
                            </button>

                            <button onClick={() => HandleDeleteClick(String(instituition.id))} 
                                disabled={DeleteInstituition.loading}>
                                <X color="red" size={30}/>
                            </button>

                            {DeleteInstituition.loading && (
                                <div className="delete-loading">
                                  <ClipLoader size={40} color="var(--bg-txt-color)"/>
                                  <p>deleting instituition...</p>
                                  <p style={{textTransform: "lowercase"}}>hold on a bit</p>
                                </div>
                            )}
                            </div>

                            </div>
                        </div>
                    ))}
                    </>
                </>
            ) : (
                <>
                {!FetchInstituitions.error && (
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
                    size={40} 
                    color="var(--bg-txt-color)"
                    />
                </div>
            )}
        </div>
    )
}

export { ModifyInstituitions }
"use client";

import { useState } from "react";
import { DeleteAccount } from "./components/DeleteAccount";
import { DeleteIcon } from "lucide-react";

function AccountSettings() {

    const [open, setOpen] = useState({
        delete: false,
    })

    return (
        <>
        {!open.delete && (
            <div className="btn-nav">
                <button onClick={() => setOpen(prev => ({...prev, delete: true}))}>
                    <DeleteIcon color="red"/>delete account
                </button>
            </div>
        )}

        {open.delete && (
            <DeleteAccount />
        )}
        </>
    )
}

export default AccountSettings;
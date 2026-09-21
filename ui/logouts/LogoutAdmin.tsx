"use client";

import { UsePost } from "@/hooks/usePost";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

function LogoutAdminButton() {

    const PostLogoutAdmin = UsePost();

    const router = useRouter();

    const loading = PostLogoutAdmin.loading;

    const HandleLogout = async () =>
    {
        const res = await PostLogoutAdmin.Post("/admin/logout", {});

        if (!res) return;

        if (res.success) {

            localStorage.removeItem("admin");

            router.replace("/admin/login");

        }
        
    }

    return (
        <button type="button" 
        onClick={HandleLogout} 
        disabled={loading}>
            {!loading ? <LogOut size={30}/> : <ClipLoader size={20}/>}
            logout
        </button>
    )
}

export { LogoutAdminButton }
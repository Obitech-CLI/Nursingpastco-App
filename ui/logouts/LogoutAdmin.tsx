"use client";

import { UsePost } from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

function LogoutAdminButton() {

    const PostLogoutAdmin = UsePost();

    const router = useRouter();

    const loading = PostLogoutAdmin.loading;

    const HandleLogout = async () =>
    {
        const res = await PostLogoutAdmin.Post("/admin/logout", {});

        router.replace("/admin/login");
        
    }

    return (
        <button type="button" 
        onClick={HandleLogout} 
        disabled={loading}>
            {!loading ? "logout" : <ClipLoader size={20}/>}
        </button>
    )
}

export { LogoutAdminButton }
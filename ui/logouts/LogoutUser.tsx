"use client";

import { UsePost } from "@/hooks/usePost";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

function LogoutUserButton() {

    const PostLogoutUser = UsePost();

    const router = useRouter();

    const loading = PostLogoutUser.loading;

    const HandleLogout = async () =>
    {
        const res = await PostLogoutUser.Post("/user/logout", {});

        if (!res) return;

        if (res.success) {

            localStorage.removeItem("user");

            router.replace("/");

        }
        
    }

    return (
        <button type="button" 
        onClick={HandleLogout} 
        disabled={loading}>
            {!loading ? <LogOut size={30}/> : <ClipLoader size={20}/>}
        </button>
    )
}

export { LogoutUserButton }
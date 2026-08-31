"use client";

import { UseUser } from "@/contexts/user/UserProvider";
import { UsePost } from "@/hooks/usePost";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

function LogoutUserButton() {

    const PostLogoutUser = UsePost();

    const { setUser } = UseUser();

    const router = useRouter();

    const loading = PostLogoutUser.loading;

    const HandleLogout = async () =>
    {
        const res = await PostLogoutUser.Post("/user/logout", {});

        if (!res) return;

        if (res.success) {

            setUser(null);

            router.replace("/");
        }
        
    }

    return (
        <button type="button" 
        onClick={HandleLogout} 
        disabled={loading}>
            {!loading ? <LogOut size={30}/> : <ClipLoader size={20}/>}
            {!loading ? "logout" : "logging out..."}
        </button>
    )
}

export { LogoutUserButton }
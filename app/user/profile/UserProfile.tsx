"use client";

import { UseUser } from "@/contexts/user/UserProvider";
import { LogoutUserButton } from "@/ui/logouts/LogoutUser";

function UserProfile() {

    const { user } = UseUser();

    return (
        <div className="user-profile">

        <div className="user-image">
            {user?.firstname.slice(0, 1).toUpperCase()}
            {user?.lastname.slice(0, 1).toUpperCase()}
        </div>

        <div className="details">
            <h4><span>firstname</span>{user?.firstname}</h4>
            <h4><span>lastname</span>{user?.lastname}</h4>
            <h4><span>email address</span>{user?.email}</h4>
            <h4><span>my instituition</span>{user?.instituition}</h4>
        </div>

        <LogoutUserButton />

        </div>
    )
}

export { UserProfile }
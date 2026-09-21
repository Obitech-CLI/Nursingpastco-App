import AdminAuth from "@/lib/admin/admin.auth";
import AdminProfile from "./AdminProfile";
import "./profile.css";

export default async function Page() {

    await AdminAuth();

    return (
        <main className="admin-profile">
            <h2>my profile</h2>
            <AdminProfile />
        </main>
    )
}
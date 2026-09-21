import AdminAuth from "@/lib/admin/admin.auth";
import AdminDashboard from "./AdminDashboard";
import "./dashboard.css";

export default async function Page() {

    await AdminAuth();

    return (
        <main className="admin-dashboard">
            <AdminDashboard />
        </main>
    )
}
import AdminAuth from "@/lib/admin/admin.auth";
import AdminDashboard from "./AdminDashboard";

export default async function Page() {

    await AdminAuth();

    return (
        <main>
            <h1>admin dashboard</h1>
            <AdminDashboard />
        </main>
    )
}
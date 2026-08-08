import AdminAuth from "@/lib/admin/admin.auth";
import AdminDashboard from "./AdminDashboard";

export default async function Page() {

    await AdminAuth();

    return (
        <main>
            <AdminDashboard />
        </main>
    )
}
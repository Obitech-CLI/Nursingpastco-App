import { AdminCard } from "@/features/admin/dashboard/components/AdminCard";
import { AdminManageNav } from "@/features/admin/dashboard/components/AdminManageNav";

function AdminDashboard() {
    return (
        <>
        <h1>admin dashboard</h1>
        <AdminCard />
        <AdminManageNav />
        </>
    )
}

export default AdminDashboard;
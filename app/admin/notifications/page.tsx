import AdminAuth from "@/lib/admin/admin.auth";
import AdminNotifications from "./Notifications";

export default async function Page() {

    await AdminAuth();
    
    return (
        <main>
            <h2>notifications</h2>
            <AdminNotifications />
        </main>
    )
}
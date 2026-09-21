import AdminAuth from "@/lib/admin/admin.auth";
import ManageSubscribers from "./ManageSubscribers";
import "./subscribers.css";

export default async function Page() {

    await AdminAuth();
    
    return (
        <main className="manage subscribers">
            <h2>manage subscribers</h2>
            <ManageSubscribers />
        </main>
    )
}
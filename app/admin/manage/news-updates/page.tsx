import AdminAuth from "@/lib/admin/admin.auth";
import ManageNewsUpdates from "./ManageNewsUpdates";

export default async function Page() {

    await AdminAuth();
    
    return (
        <main className="manage">
            <h2>news and updates</h2>
            <ManageNewsUpdates />
        </main>
    )
}
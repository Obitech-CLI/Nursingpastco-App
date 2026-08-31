import AdminAuth from "@/lib/admin/admin.auth";
import AdminManageSiteInfo from "./ManageSiteInfo";

export default async function Page() {

    await AdminAuth();
    
    return (
        <main className="manage">
            <AdminManageSiteInfo />
        </main>
    )
}
import AdminAuth from "@/lib/admin/admin.auth";
import AdminManageInstituitions from "./AdminManageInstituitions";

export default async function Page() {

    await AdminAuth();

    return (
        <main className="manage">
            <AdminManageInstituitions />
        </main>
    )
}
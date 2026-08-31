import AdminAuth from "@/lib/admin/admin.auth";
import AdminManageCourses from "./AdminManageCourses";

export default async function Page() {

    await AdminAuth();
    
    return (
        <main className="manage">
            <AdminManageCourses />
        </main>
    )
}
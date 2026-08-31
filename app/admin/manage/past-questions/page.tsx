import AdminAuth from "@/lib/admin/admin.auth";
import AdminManagePastQuestions from "./ManagePastQuestions";

export default async function Page() {

    await AdminAuth();
    
    return (
        <main className="manage">
            <AdminManagePastQuestions />
        </main>
    )
}
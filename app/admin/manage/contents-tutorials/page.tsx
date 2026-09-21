import AdminAuth from "@/lib/admin/admin.auth";
import ManageContentTutorials from "./ManageContentsTutorials";

export default async function Page() {

    await AdminAuth();

    return (
        <main className="manage">
            <h2>contents</h2>
            <ManageContentTutorials />
        </main>
    )
}
import AdminAuth from "@/lib/admin/admin.auth";
import ManageRecommendations from "./ManageRecommendations";

export default async function Page() {

    await AdminAuth();

    return (
        <main className="manage">
            <h2>recommendations</h2>
            <ManageRecommendations />
        </main>
    )
}
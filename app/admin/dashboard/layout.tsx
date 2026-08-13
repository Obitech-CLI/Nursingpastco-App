import { AdminFooter } from "@/app/components/footers/Admin";
import { AdminDashHeader } from "@/app/components/headers/AdminDashHeader";

export default function AdminDashboardLayout(
    {children}:{children:React.ReactNode}) {
    return (
        <>
        <AdminDashHeader />
        {children}
        <AdminFooter />
        </>
    )
}
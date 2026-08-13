import { AdminFooter } from "@/app/components/footers/Admin";
import { AdminAuthHeader } from "@/app/components/headers/AdminAuthHeader";

export default function AdminAuthLayout(
    {children}:{children:React.ReactNode}) {
    return (
        <>
        <AdminAuthHeader />
        {children}
        <AdminFooter />
        </>
    )
}
import { Footer } from "@/app/components/Footer";
import { AdminDashHeader } from "@/app/components/headers/AdminDashHeader";

export default function AdminDashboardLayout(
    {children}:{children:React.ReactNode}) {
    return (
        <>
        <AdminDashHeader />
        {children}
        <Footer />
        </>
    )
}
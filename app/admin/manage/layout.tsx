import { Footer } from "@/app/components/Footer";
import { AdminManageHeader } from "@/app/components/headers/AdminHeader";

export default function AdminManageLayout(
    {children}:{children:React.ReactNode}) {
    return (
        <>
        <AdminManageHeader />
        {children}
        <Footer />
        </>
    )
}
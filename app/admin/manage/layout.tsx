import { Footer } from "@/app/components/Footer";
import { AdminManageHeader } from "@/app/components/headers/AdminHeader";
import { ManageNavProvider } from "@/contexts/admin/ManageNavProvider";

export default function AdminManageLayout(
    {children}:{children:React.ReactNode}) {
    return (
        <>
        <AdminManageHeader />

        <ManageNavProvider>
        {children}
        </ManageNavProvider>
        
        <Footer />
        </>
    )
}
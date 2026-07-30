import { Footer } from "@/app/components/Footer";
import { AdminManageHeader } from "@/app/components/headers/AdminHeader";
import { ManageCoursesProvider } from "@/contexts/admin/ManageCoursesProvider";

export default function AdminManageLayout(
    {children}:{children:React.ReactNode}) {
    return (
        <>
        <AdminManageHeader />

        <ManageCoursesProvider>
        {children}
        </ManageCoursesProvider>
        
        <Footer />
        </>
    )
}
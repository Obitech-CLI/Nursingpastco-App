import { AdminManageHeader } from "@/app/components/headers/AdminHeader";
import { ManageNavProvider } from "@/contexts/admin/ManageNavProvider";
import "./manage.css";
import { AdminFooter } from "@/app/components/footers/Admin";

export default function AdminManageLayout(
    {children}:{children:React.ReactNode}) {
    return (
        <>
        <AdminManageHeader />

        <ManageNavProvider>
        {children}
        </ManageNavProvider>
        
        <AdminFooter />
        </>
    )
}
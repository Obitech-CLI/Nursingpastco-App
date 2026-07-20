import { Footer } from "@/app/components/Footer";
import { AdminAuthHeader } from "@/app/components/headers/AdminAuthHeader";

export default function AdminAuthLayout(
    {children}:{children:React.ReactNode}) {
    return (
        <>
        <AdminAuthHeader />
        {children}
        <Footer />
        </>
    )
}
import { Footer } from "../components/Footer";
import { AdminAuthHeader } from "../components/headers/AdminAuthHeader";

export default function AdminManageLayout(
    {children}:{children:React.ReactNode}) {
    return (
        <>
        <AdminAuthHeader />
        {children}
        <Footer/>
        </>
    )
}
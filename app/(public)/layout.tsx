import { Footer } from "../components/Footer";
import { PublicHeader } from "../components/headers/PublicHeader";

export default function PublicLayout(
    {children}:{children:React.ReactNode}) {
    return (
        <>
        <PublicHeader />
        {children}
        <Footer/>
        </>
    )
}
import { PublicFooter } from "../components/footers/Public";
import { PublicHeader } from "../components/headers/PublicHeader";

export default function PublicLayout(
    {children}:{children:React.ReactNode}) {
    return (
        <>
        <PublicHeader />
        {children}
        <PublicFooter/>
        </>
    )
}
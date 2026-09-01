import Link from "next/link";
import "../user.css";
import { Settings2Icon } from "lucide-react";

export default function Page() {
    return (
        <main className="user-settings">
            <h2>settings</h2>
            <nav>
                <Link href="/user/setting/profile"><Settings2Icon />profile setting</Link>
                <Link href="/user/setting/account"><Settings2Icon />account setting</Link>
            </nav>
        </main>
    )
}
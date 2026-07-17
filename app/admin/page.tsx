import Link from "next/link";

export default function Page() {
    return (
        <main>
            <h1>admin</h1>

            <nav>
                <Link href="/admin/create">create</Link>
                <Link href="/admin/login">login</Link>
            </nav>
        </main>
    )
}
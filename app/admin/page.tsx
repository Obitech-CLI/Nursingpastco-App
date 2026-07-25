import { Check, CheckCircle, Lock, ShieldCheck, UserPlus } from "lucide-react";
import Link from "next/link";
import "./admin.css";

export default function Page() {
    return (
        <main className="admin-home">
            <div className="hero">
                <div>
                    <h1>welcome to the admin panel</h1>
                    <h3>manage your app users and content efficiently.</h3>
                    <h3>choose an option to get started below.</h3>
                </div>
            </div>

            <div className="auth">
                <div>
                    <span className="create"><UserPlus /></span>
                    <h2>create admin</h2>
                    <h3>create a new administrator account to access admin dashboard</h3>
                    <ul>
                        <li><CheckCircle color="green"/>secure account creation</li>
                        <li><CheckCircle color="green"/>role: administrator</li>
                        <li><CheckCircle color="green"/>full system access</li>
                    </ul>
                    <Link href="/admin/create">create admin</Link>
                </div>
                
                <div>
                    <span className="login"><Lock /></span>
                    <h2>login admin</h2>
                    <h3>login with your admin credentials to access dashboard.</h3>
                    <ul>
                        <li><CheckCircle color="green"/>secure login</li>
                        <li><CheckCircle color="green"/>protected dashboard</li>
                        <li><CheckCircle color="green"/>manage your app</li>
                    </ul>
                    <Link href="/admin/login">login admin</Link>
                </div>
            </div>

            <section className="warning">
                <ShieldCheck />
                <h3>restricted area</h3>
                <p>this is a restricted area. Only authorised administrator can create accounts and access the admin dashboard.</p>
            </section>
        </main>
    )
}
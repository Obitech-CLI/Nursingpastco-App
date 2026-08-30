"use client";

import { Mail, MailOpenIcon } from "lucide-react";
import Link from "next/link";

function ContactUs() {
    return (
        <main>
            <h2>contact us</h2>
            
            <div className="contact-us">

            <div className="email">
                <div>
                    <h3>send us an email</h3>
                    <p>For collaboration, partnership and sponsorship?</p>
                    <i> Reach out to us via email.</i>
                </div>
                <Link href="">Email Now <Mail /></Link>
            </div>

            <form>
                <div>
                    <h3>send us a message</h3>
                    <p>for complaint or enquiry about our website?</p>
                    <i>You can send us a direct message.</i>
                </div>
                <label>
                    <input type="name"/>
                    <span>your name</span>
                </label>
                <label>
                    <input type="email"/>
                    <span>your email</span>
                </label>
                <label>
                    <textarea placeholder="enter your message"/>
                </label>

                <button type="submit">
                    submit
                </button>
            </form>

            </div>
        </main>
    )
}

export default ContactUs;
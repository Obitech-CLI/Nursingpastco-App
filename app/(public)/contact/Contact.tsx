"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const [focus, setFocus] = useState({
    fname: false,
    email: false,
  });

  const HandleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <main className="contact">
      <h2>contact us</h2>

      <section>
        <h3>we'd love to hear from you</h3>
        <p>
          whether you are a nursing student looking for help, have a suggestion
          for improving the platform, want to report an issue, or simply want to
          reach out, you can contact us using the methods below
        </p>
      </section>

      <div className="contact-us">
        <div className="email">
          <div>
            <h3>send us an email</h3>
            <p>For collaboration, partnership and sponsorship?</p>
          </div>
          <i> Reach out to us via email.</i>
          <Link href="mailto:Nursingpastco@gmail.com">
            Email Now <Mail />
          </Link>
        </div>

        <form>
          <div>
            <h3>send us a message</h3>
            <p>for complaint or enquiry about our website?</p>
          </div>
          <i>You can send us a direct message.</i>
          <label>
            <input
              type="name"
              value={formData.fullname}
              name="fullname"
              onChange={HandleFormChange}
              onFocus={() => {
                setFocus((prev) => ({ ...prev, fname: true }));
              }}
              onBlur={() => {
                if (!formData.email) {
                  setFocus((prev) => ({ ...prev, fname: false }));
                }
              }}
            />
            <span
              style={{
                top: focus.fname ? "-1rem" : "",
              }}
            >
              {focus.fname ? "enter your fullname" : "fullname"}
            </span>
          </label>
          <label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={HandleFormChange}
              onFocus={() => {
                setFocus((prev) => ({ ...prev, email: true }));
              }}
              onBlur={() => {
                if (!formData.email) {
                  setFocus((prev) => ({ ...prev, email: false }));
                }
              }}
            />
            <span
              style={{
                top: focus.email ? "-1rem" : "",
              }}
            >
              {focus.email ? "enter your email" : "email"}
            </span>
          </label>
          <label>
            <textarea
              placeholder="enter your message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </label>

          <button type="submit">submit</button>
        </form>
      </div>
    </main>
  );
}

export default ContactUs;

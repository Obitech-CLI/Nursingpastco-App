"use client";

function ContactUs() {
    return (
        <main>
            <h2>contact us</h2>
            
            <div className="contact-us">

            <form>
                <h3>send us a message</h3>
                <p>for complaint or enquiry about our website? you can reach out to us by sending a direct message to our
                admin panel for a quick response
                </p>
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
import "./Contact.css";
import React, { useRef } from "react";

import emailjs from "@emailjs/browser";

function Contact() {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Thank You for connecting, Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      );
  };
  return (
    <section className="contact" id="contact">
      <h1 className="heading">
        <span>contact</span> us
      </h1>

      {/* MAP */}
      <div className="row">
        <iframe
          className="map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14031.836770367425!2d77.5841978!3d28.4506465!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cbf94deb6bc39%3A0x7ba6bedc9a2b537f!2sBennett%20University%20(Times%20of%20India%20Group)!5e0!3m2!1sen!2sin!4v1713554345576!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* CONTACT FORM */}
        <form ref={formRef} className="contact-form" onSubmit={sendEmail}>
          <h3>get in touch</h3>

          <input
            type="text"
            name="name"
            className="box"
            placeholder="Name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            className="box"
          />

          <input
            type="tel"
            name="phone"
            className="box"
            placeholder="Phone Number"
          />

          <textarea
            name="message"
            className="box"
            placeholder="Message"
            required
          />

          <button className="btn" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;

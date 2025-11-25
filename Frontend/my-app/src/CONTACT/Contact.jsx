import "./Contact.css";

function Contact() {
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
        <form action="feedback_form.php" method="POST">
          <h3>get in touch</h3>

          <input type="text" placeholder="Name" className="box" name="name" />
          <input
            type="email"
            placeholder="Email"
            className="box"
            name="email"
          />
          <input
            type="number"
            placeholder="Contact Number"
            className="box"
            name="contact_number"
          />
          <textarea
            className="box"
            cols="30"
            rows="10"
            placeholder="Message"
            name="message"
          ></textarea>
          <input type="submit" value="send message" className="btn" />
        </form>
      </div>
    </section>
  );
}

export default Contact;

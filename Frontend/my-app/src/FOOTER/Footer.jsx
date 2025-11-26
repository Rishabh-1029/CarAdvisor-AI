import "./Footer.css";

function Footer() {
  return (
    <section className="footer">
      <div className="footer-box-container">
        {/* Branches */}
        <div className="box">
          <h3>our branches</h3>
          <a>
            <i className="fa-solid fa-location-dot"></i> Delhi
          </a>
          <a>
            <i className="fa-solid fa-location-dot"></i> Mumbai
          </a>
          <a>
            <i className="fa-solid fa-location-dot"></i> Chennai
          </a>
          <a>
            <i className="fa-solid fa-location-dot"></i> Bengaluru
          </a>
        </div>

        {/* Quick Links */}
        <div className="box">
          <h3>quick links</h3>

          <a href="#hero">
            <i className="fa-solid fa-arrow-right"></i> home
          </a>

          <a href="#vehicles">
            <i className="fa-solid fa-arrow-right"></i> vehicles
          </a>

          <a href="#ourservices">
            <i className="fa-solid fa-arrow-right"></i> services
          </a>

          <a href="#featured">
            <i className="fa-solid fa-arrow-right"></i> featured
          </a>
        </div>

        {/* Contact Links */}
        <div className="box">
          <h3>Contact</h3>

          <a href="#contact">
            <i className="fa-solid fa-phone"></i>+91 8700122543
          </a>

          <a href="#contact">
            <i className="fa-solid fa-envelope"></i>info@TrueDrive.co.in
          </a>

          <a>
            <i className="fa-solid fa-location-dot"></i> Delhi, india
          </a>
        </div>
      </div>

      <div className="copyright">
        TrueDrive.com &copy; 2025 | all rights reserved
      </div>
    </section>
  );
}

export default Footer;

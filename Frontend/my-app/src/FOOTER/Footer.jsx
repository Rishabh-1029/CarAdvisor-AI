import "./Footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const goToSection = (id) => {
    navigate("/");

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section className="footer">
      <div className="footer-box-container">
        {/* Branches */}
        <div className="box">
          <h3>our branches</h3>
          <a>
            <i className="fa-solid fa-location-dot" /> Delhi
          </a>
          <a>
            <i className="fa-solid fa-location-dot" /> Mumbai
          </a>
          <a>
            <i className="fa-solid fa-location-dot" /> Chennai
          </a>
          <a>
            <i className="fa-solid fa-location-dot" /> Bengaluru
          </a>
        </div>

        {/* Quick Links */}
        <div className="box">
          <h3>quick links</h3>

          <button onClick={() => goToSection("hero")}>
            <i className="fa-solid fa-arrow-right"></i> home
          </button>

          <button onClick={() => goToSection("vehicles")}>
            <i className="fa-solid fa-arrow-right"></i> vehicles
          </button>

          <button onClick={() => goToSection("ourservices")}>
            <i className="fa-solid fa-arrow-right"></i> services
          </button>

          <button onClick={() => goToSection("featured")}>
            <i className="fa-solid fa-arrow-right"></i> featured
          </button>
        </div>

        {/* Contact */}
        <div className="box">
          <h3>contact</h3>

          <button onClick={() => goToSection("contact")}>
            <i className="fa-solid fa-phone"></i>+91 8700122543
          </button>

          <button onClick={() => goToSection("contact")}>
            <i className="fa-solid fa-envelope"></i>info@TrueDrive.co.in
          </button>

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

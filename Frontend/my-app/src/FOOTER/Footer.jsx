import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { MdAutoAwesome } from "react-icons/md";
import { FaLinkedin, FaUser } from "react-icons/fa";

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

          <button onClick={() => navigate("/carlist")}>
            <i className="fa-solid fa-arrow-right"></i> vehicles
          </button>

          <button onClick={() => navigate("/findcar")}>
            <i className="fa-solid fa-arrow-right"></i> CarAdvisor AI
          </button>

          <button onClick={() => navigate("/expense")}>
            <i className="fa-solid fa-arrow-right"></i> Expense Forecast
          </button>
        </div>

        {/* Contact */}
        <div className="box">
          <h3>contact</h3>

          <button onClick={() => (window.location.href = "tel:+918700122543")}>
            <i className="fa-solid fa-phone"></i>+91 8700122543
          </button>

          <button
            onClick={() =>
              (window.location.href = "mailto:rspsurana@gmail.com")
            }
          >
            <i className="fa-solid fa-envelope"></i>info@TrueDrive.co.in
          </button>

          <button
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/rishabh-surana-718582253/",
                "_blank"
              )
            }
          >
            <i>
              <FaLinkedin size={16.5} />
            </i>
            Rishabh Surana
          </button>

          <button
            onClick={() =>
              window.open("https://rishabh-surana.netlify.app/", "_blank")
            }
          >
            <i>
              <FaUser size={16} />
            </i>
            Developer Portfolio
          </button>
        </div>
      </div>

      <div className="copyright">
        TrueDrive.com &copy; 2025 | all rights reserved
      </div>
    </section>
  );
}

export default Footer;

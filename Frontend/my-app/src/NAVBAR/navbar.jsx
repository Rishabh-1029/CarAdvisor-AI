import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { MdAutoAwesome } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();

  const goToSection = (id) => {
    navigate("/");

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <header className="header">
      {/* Menu Icon */}
      <div id="menu-btn" className="fa-solid fa-bars"></div>

      {/* Logo */}
      <a href="/#hero" className="logo">
        True<span>Drive</span>
      </a>

      {/* Navbar links */}
      <nav className="navbar">
        <a onClick={() => goToSection("hero")}>Home</a>
        <a onClick={() => navigate("/carlist")}>Vehicles</a>
        <a onClick={() => goToSection("ourservices")}>Services</a>
        <a onClick={() => goToSection("contact")}>Contact</a>
      </nav>

      {/* Login + AI button */}
      <div id="login-btn">
        <a onClick={() => navigate("/findcar")} className="carAdvisior-AI-btn">
          <MdAutoAwesome size={18} />
          CarAdvisor AI
        </a>
        <button type="button" className="btn">
          Login
        </button>
        <i className="fa-regular fa-user"></i>
      </div>
    </header>
  );
}

export default Navbar;

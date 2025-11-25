import "./navbar.css";

function Navbar() {
  return (
    <header className="header">
      {/* Menu Icon */}
      <div id="menu-btn" className="fa-solid fa-bars"></div>

      {/* Logo */}
      <a href="#" className="logo">
        True<span>Drive</span>
      </a>

      {/* Navbar links */}
      <nav className="navbar">
        <a href="#home">Home</a>
        <a href="#vehicles">Vehicles</a>
        <a href="#services">Services</a>
        <a href="#featured">Featured</a>
        <a href="#reviews">Feedback</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Login button */}
      <div id="login-btn">
        <button type="button" className="btn">
          Login
        </button>
        <i className="fa-regular fa-user"></i>
      </div>
    </header>
  );
}

export default Navbar;

import "./Hero.css";
import car from "../assets/car.png";
import { useNavigate } from "react-router-dom";
import Findcar from "../FINDCAR/Findcar";

function Hero() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        {/* LEFT TEXT BLOCK */}
        <div className="hero-left">
          <h1>
            Find the Perfect Car. <br /> Choose Smart. <br />
            Drive True.
          </h1>

          <p className="subtitle">
            Buying a car shouldn’t be a guess. <br />
            Our AI analyzes your city, driving habits, and fuel trends to
            recommend the perfect car for you that fits your budget, your
            family, and your lifestyle.
          </p>

          <div className="cta-group">
            <button
              className="primary-btn"
              onClick={() => navigate("/findcar")}
            >
              Find My Car Now ➜
            </button>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="hero-right">
          <div className="hero-bg"></div>
          <img src={car} alt="car" className="hero-car" />
        </div>
      </section>
      {/* Icon section */}
      <section className="icons-container">
        <div className="icons">
          <i className="fa-solid fa-map-location-dot"></i>
          <div className="content">
            <h3>04+</h3>
            <p>Cities</p>
          </div>
        </div>

        <div className="icons">
          <i className="fa-solid fa-car-side"></i>
          <div className="content">
            <h3>50+</h3>
            <p>Cars Available</p>
          </div>
        </div>

        <div className="icons">
          <i className="fa-solid fa-star"></i>
          <div className="content">
            <h3>50+</h3>
            <p>Happy Reviews</p>
          </div>
        </div>

        <div className="icons">
          <i className="fa-solid fa-rocket"></i>
          <div className="content">
            <h3>20+</h3>
            <p>Upcoming Cars</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;

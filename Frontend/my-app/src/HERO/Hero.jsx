import "./Hero.css";
import car from "../assets/car.png";

function Hero() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        {/* LEFT TEXT BLOCK */}
        <div className="hero-left">
          <h1>
            Find the Perfect Car. <br /> Predict the Future Cost.
          </h1>

          <p className="subtitle">
            Don't just buy a car based on price. Our AI analyzes your city,
            usage, and fuel trends to recommend the best car for your budget
            over the next 10 years.
          </p>

          <div className="cta-group">
            <button className="primary-btn">Find My Car Now ➜</button>
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
          <i className="fa-solid fa-house"></i>
          <div className="content">
            <h3>04+</h3>
            <p>branches</p>
          </div>
        </div>

        <div className="icons">
          <i className="fa-solid fa-car"></i>
          <div className="content">
            <h3>50+</h3>
            <p>Cars Available</p>
          </div>
        </div>

        <div className="icons">
          <i className="fa-solid fa-users"></i>
          <div className="content">
            <h3>50+</h3>
            <p>happy Reviews</p>
          </div>
        </div>

        <div className="icons">
          <i className="fa-solid fa-car"></i>
          <div className="content">
            <h3>20+</h3>
            <p>upcoming cars</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;

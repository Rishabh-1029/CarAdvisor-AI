import "./Ourservices.css";

function Ourservices() {
  return (
    <section className="services" id="services">
      <h1 className="heading">
        our <span>services</span>
      </h1>

      <div className="box-container">
        <div className="box">
          <i className="fa-solid fa-car"></i>
          <h3>Car Listing</h3>
          <p>
            Discover your perfect dream car.
            <br />
            Start your adventure now!
          </p>
          <a href="#featured" className="btn">
            Explore
          </a>
        </div>

        <div className="box">
          <i className="fa-solid fa-gas-pump"></i>
          <h3>Expense Forecasting</h3>
          <p>
            Forecast your car expenses effortlessly.
            <br />
            Predict, plan, prosper with our tool.
          </p>
          <a href="#hero" className="btn">
            Explore
          </a>
        </div>

        <div className="box">
          <i className="fa-solid fa-headset"></i>
          <h3>User Support</h3>
          <p>
            Support that's always there when you need it.
            <br />
            We've got your back.
          </p>
          <a href="#contact" className="btn">
            Explore
          </a>
        </div>
      </div>
    </section>
  );
}

export default Ourservices;

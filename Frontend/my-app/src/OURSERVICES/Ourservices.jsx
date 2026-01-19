import "./Ourservices.css";
import { useNavigate } from "react-router-dom";

function Ourservices() {
  const navigate = useNavigate();
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
          <button className="btn" onClick={() => navigate("/carlist")}>
            Explore
          </button>
        </div>

        <div className="box">
          <i className="fa-solid fa-robot"></i>
          <h3>AI Car Recommendations</h3>
          <p>
            Find the Perfect Car based on your prefrences.
            <br />
            Smart insights, Clear decisions!
          </p>
          <button className="btn" onClick={() => navigate("/findcar")}>
            Explore
          </button>
        </div>

        <div className="box">
          <i className="fa-solid fa-gas-pump"></i>
          <h3>Expense Forecasting</h3>
          <p>
            Forecast your car expenses effortlessly.
            <br />
            Predict, plan, prosper with our tool.
          </p>
          <button className="btn" onClick={() => navigate("/expense")}>
            Explore
          </button>
        </div>
      </div>
    </section>
  );
}

export default Ourservices;

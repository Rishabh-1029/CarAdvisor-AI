import "./Findcar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Findcar() {
  const navigate = useNavigate();

  // STATE
  const [formData, setFormData] = useState({
    city: "",
    budget: "",
    fuelType: "",
    fuelFlexibility: true,
    seats: "",
    usage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleFuelFlexibility = () => {
    setFormData({ ...formData, fuelFlexibility: !formData.fuelFlexibility });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/process-car-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("API Response:", result);

      if (result && result.cars) {
        console.log("Navigating with data:", result.cars);
        navigate("/report", { state: { reportData: result } });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <div className="findcar-container">
        <h1 className="title">
          Find your <span className="perfect-car">Perfect Car</span>
        </h1>

        <form className="findcar-form" onSubmit={handleSubmit}>
          {/* CITY */}
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select your city</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
          </select>

          {/* BUDGET */}
          <label>Budget (₹)</label>
          <input
            type="number"
            name="budget"
            placeholder="Enter max budget"
            value={formData.budget}
            onWheel={(e) => e.target.blur()}
            onChange={handleChange}
          />

          {/* FUEL TYPE */}
          <div className="fuel-row">
            <div className="fuel-header">
              <label>Fuel Type</label>

              <div className="fuel-switch">
                <span className="fuel-value">
                  {formData.fuelFlexibility ? "Flexible" : "Strict"}
                </span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={formData.fuelFlexibility}
                    onChange={toggleFuelFlexibility}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>

            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="">Select fuel type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          {/* SEATING */}
          <label>Seating Capacity</label>
          <select name="seats" value={formData.seats} onChange={handleChange}>
            <option value="">Select seating capacity</option>
            <option value="4">4 Seater</option>
            <option value="5">5 Seater</option>
            <option value="7">7 Seater</option>
          </select>

          {/* USAGE */}
          <label>Average Monthly Usage (km)</label>
          <input
            type="number"
            name="usage"
            placeholder="Ex: 1000"
            value={formData.usage}
            onChange={handleChange}
            onWheel={(e) => e.target.blur()}
          />

          <button type="submit" className="submit-btn">
            View Cars
          </button>
        </form>
      </div>
    </>
  );
}

export default Findcar;

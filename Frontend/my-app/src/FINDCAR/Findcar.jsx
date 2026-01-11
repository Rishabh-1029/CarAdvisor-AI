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
    fuelFlexibility: false,
    seats: "",
    usage: "",
    transmission: "",
    transmissionFlexibility: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleFuelFlexibility = () => {
    setFormData({ ...formData, fuelFlexibility: !formData.fuelFlexibility });
  };

  const toggleTransmissionFlexibility = () => {
    setFormData({
      ...formData,
      transmissionFlexibility: !formData.transmissionFlexibility,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("User Response:", formData);

      const res = await fetch("http://localhost:8000/process-car-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("API Response:", result);

      if (result && result.cars) {
        console.log("Navigating with data:", result.cars);
        navigate("/report", {
          state: { reportData: result, formData: formData },
        });
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
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select your city</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
          </select>

          {/* BUDGET */}
          <label>Budget (₹)</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          >
            <option value="">Select budget range</option>
            <option value="500000">Up to ₹5 Lakhs</option>
            <option value="800000">Up to ₹8 Lakhs</option>
            <option value="1200000">Up to ₹12 Lakhs</option>
            <option value="2000000">Up to ₹20 Lakhs</option>
            <option value="Above">Above ₹20 Lakhs</option>
          </select>

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
              required
            >
              <option value="">Select fuel type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="ev">Electric</option>
              <option value="cng">CNG</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* SEATING */}
          <label>Seating Capacity</label>
          <select
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            required
          >
            <option value="">Select seating capacity</option>
            <option value="4">4 Seater</option>
            <option value="5">5 Seater</option>
            <option value="7">7 Seater</option>
          </select>

          {/* USAGE */}
          <label>Average Monthly Usage</label>
          <select
            name="usage"
            value={formData.usage}
            onChange={handleChange}
            required
          >
            <option value="">Select usage level</option>
            <option value="Low">Occasional usage</option>
            <option value="Mid">Daily commute</option>
            <option value="High">Long daily usage</option>
          </select>

          {/* Transmission */}
          <div className="fuel-row">
            <div className="fuel-header">
              <label>Transmission Type</label>
              <div className="fuel-switch">
                <span className="fuel-value">
                  {formData.transmissionFlexibility ? "Flexible" : "Strict"}
                </span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={formData.transmissionFlexibility}
                    onChange={toggleTransmissionFlexibility}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>

            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              required
            >
              <option value="">Select Transmission Type</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            View Cars
          </button>
        </form>
      </div>
    </>
  );
}

export default Findcar;

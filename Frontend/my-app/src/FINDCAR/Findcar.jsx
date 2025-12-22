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
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // TOGGLE FLEXIBILITY
  const toggleFuelFlexibility = () => {
    setFormData({ ...formData, fuelFlexibility: !formData.fuelFlexibility });
  };

  // SUBMIT HANDLER
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

      // Navigate to /report with API data
      if (result && result.data) {
        navigate("/report", { state: { reportData: result.data } });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="findcar-container">
      <h1 className="title">Find the Right Car For You</h1>

      <form className="findcar-form" onSubmit={handleSubmit}>
        {/* CITY */}
        <label>City</label>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select your city</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Kolkata">Kolkata</option>
        </select>

        {/* BUDGET */}
        <label>Budget (₹)</label>
        <input
          type="number"
          name="budget"
          placeholder="Enter max budget"
          value={formData.budget}
          onChange={handleChange}
        />

        {/* FUEL TYPE */}
        <label>Fuel Type</label>
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

        {/* FLEXIBILITY */}
        <div className="toggle-flex">
          <span>Fuel Requirement: </span>
          <button
            type="button"
            className={`toggle-btn ${formData.fuelFlexibility ? "active" : ""}`}
            onClick={toggleFuelFlexibility}
          >
            {formData.fuelFlexibility ? "Flexible" : "Strict"}
          </button>
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
        />

        <button type="submit" className="submit-btn">
          Show My Results
        </button>
      </form>
    </div>
  );
}

export default Findcar;

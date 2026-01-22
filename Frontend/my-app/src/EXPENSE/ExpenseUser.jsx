import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ExpenseUser.css";

import { MdAutoAwesome } from "react-icons/md";

function ExpenseUser() {
  const navigate = useNavigate();
  const [formExpenseData, setFormExpenseData] = useState({
    city: "",
    fuelType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormExpenseData({ ...formExpenseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("User query for expense: ", formExpenseData);

      const res = await fetch("http://localhost:8000/fuel-cost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formExpenseData),
      });

      const result = await res.json();
      console.log("API expense-user Response:", result);

      if (result && result.fuel_cost) {
        console.log("Navigating with data:", result.fuel_cost);
        navigate("/expenseReport", {
          state: { expenseReport: result, formExpenseData: formExpenseData },
        });
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <>
      <div className="expense-user-container">
        <h1 className="expense-user-title">
          <MdAutoAwesome size={32} color="var(--accent)" /> Fuel Price{" "}
          <span className="forecast-title">Forecast</span>
        </h1>

        <form className="expense-user-form" onSubmit={handleSubmit}>
          {/* City */}

          <label>City</label>
          <select
            name="city"
            value={formExpenseData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select your city</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
          </select>

          {/* Fuel Type */}

          <label>Fuel</label>
          <select
            name="fuelType"
            value={formExpenseData.fuelType}
            onChange={handleChange}
            required
          >
            <option value="">Select fuel type</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="ev">Electric</option>
          </select>

          {/* Submit */}

          <button type="submit" className="expense-user-submit-btn">
            Forecast
          </button>
        </form>
      </div>
    </>
  );
}

export default ExpenseUser;

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ExpenseUser.css";

function ExpenseUser() {
  const navigate = useNavigate();
  const [formExpenseData, setFormExpenseData] = useState({
    city: "",
    fuelType: "",
    years: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormExpenseData({ ...formExpenseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("User query for expense: ", formExpenseData);

      const res = await fetch("http://localhost:8000/expense-user", {
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
          Fuel Expense <span className="forecast-title">Forecast</span>
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
          {/* Year */}
          <label>Number of Years</label>
          <select
            name="years"
            value={formExpenseData.years}
            onChange={handleChange}
            required
          >
            <option value="">Select Number of Year</option>
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
            <option value="15">15 Years</option>
            <option value="20">20 Years</option>
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

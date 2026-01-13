import "./ExpenseReport.css";

import Ailoading from "../AILOADING/Ailoading.jsx";

import { useLocation, useNavigate } from "react-router-dom";
import { MdAutoAwesome } from "react-icons/md";
import { useState, useEffect } from "react";

function ExpenseReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const expenseReport = location.state?.expenseReport;
  const formExpenseData = location.state?.formExpenseData || {};
  const [loading, setLoading] = useState(true);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Ailoading />;

  if (
    !expenseReport ||
    !Array.isArray(expenseReport.fuel_cost) ||
    expenseReport.fuel_cost.length === 0
  ) {
    return (
      <div className="expense-empty">
        <h3>This combination does not exist in the Indian market</h3>
        <button onClick={() => navigate("/expense")}>Try Again</button>
      </div>
    );
  }

  const yearlyData = expenseReport.fuel_cost[0];

  return (
    <div className="expense-report-container">
      <h2 className="expense-title">
        <MdAutoAwesome /> Fuel Expense Forecast
      </h2>

      {/* User Summary */}
      <div className="expense-user-summary">
        <div>
          <span>City</span>
          <strong>{formExpenseData.city}</strong>
        </div>
        <div>
          <span>Fuel</span>
          <strong>{formExpenseData.fuelType}</strong>
        </div>
        <div>
          <span>Years</span>
          <strong>{formExpenseData.years}</strong>
        </div>
      </div>

      {/* Forecast Table */}
      <div className="expense-table">
        <div className="expense-table-head">
          <span>
            Year : {currentYear} – {currentYear + Number(formExpenseData.years)}
          </span>
          <span>Estimated Cost (₹)</span>
        </div>

        {expenseReport.fuel_cost.map((row) => (
          <div className="expense-row" key={row.year}>
            <span>{row.year}</span>
            <strong>₹ {Number(row.cost).toLocaleString()}</strong>
          </div>
        ))}
      </div>

      <button className="expense-back-btn" onClick={() => navigate("/expense")}>
        Try Another Forecast
      </button>
    </div>
  );
}

export default ExpenseReport;

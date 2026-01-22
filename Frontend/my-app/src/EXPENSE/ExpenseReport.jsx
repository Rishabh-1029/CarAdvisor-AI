import "./ExpenseReport.css";
import Ailoading from "../AILOADING/Ailoading.jsx";

import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useLocation, useNavigate } from "react-router-dom";
import { MdAutoAwesome } from "react-icons/md";
import { useState, useEffect } from "react";

function ExpenseReport() {
  const navigate = useNavigate();
  const location = useLocation();

  const expenseReport = location.state?.expenseReport;
  const formExpenseData = location.state?.formExpenseData || {};

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Ailoading />;

  // Safety check
  if (
    !expenseReport ||
    !expenseReport.fuel_cost ||
    !Array.isArray(expenseReport.fuel_cost.forecast)
  ) {
    return (
      <div className="expense-empty">
        <h3>This fuel forecast is currently unavailable</h3>
        <button onClick={() => navigate("/expense")}>Try Again</button>
      </div>
    );
  }

  const { forecast, summary } = expenseReport.fuel_cost;
  const currentPrice = forecast[0]?.price;
  const yearendPrice = forecast[11]?.price;

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
          <span>Current Price</span>
          <strong>₹ {currentPrice}</strong>
        </div>
      </div>

      <div className="expense-summary-card">
        <h2>Projected Annual Change</h2>

        <div>
          <div className="curr-price-summary">
            <h4>Current Price : </h4>
            <strong>₹ {currentPrice}</strong>
          </div>
          <div className="curr-price-summary">
            <h4>Year End Price : </h4>
            <strong>₹ {yearendPrice}</strong>
          </div>
        </div>

        <div>
          <h2>Expected Change : </h2>
          <strong>₹ {summary.absolute_increase}</strong>{" "}
          <span>(+{summary.percentage_increase}%)</span>
        </div>
        <p>{summary.trend}</p>
      </div>

      {/* Monthly Forecast */}
      <div className="expense-table">
        <div className="expense-table-head">
          <span>Month</span>
          <span>Expected Price (₹)</span>
        </div>

        {forecast.map((row, idx) => (
          <div className="expense-row" key={idx}>
            <span>{row.month}</span>
            <strong>₹ {row.price}</strong>
            {/* {row.type !== "current" && (
              <span className={row.delta >= 0 ? "delta-up" : "delta-down"}>
                {row.delta >= 0 ? "↑" : "↓"} ₹{row.delta}
              </span>
            )} */}
          </div>
        ))}
      </div>

      {/* Price Trend Graph */}
      <div className="expense-graph">
        <div className="expense-graph-header">
          <h2>Fuel Price Trend</h2>
          <span className="graph-subtitle">Next 12 months projection</span>
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={forecast}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid className="graph-grid" vertical={false} />

            <XAxis dataKey="month" tickLine={false} className="graph-axis" />

            <YAxis
              type="number"
              tickLine={false}
              tickCount={6}
              className="graph-axis"
              allowDecimals={false}
              tickFormatter={(value) => `₹ ${Math.round(value)} `}
              domain={["dataMin - 0.8", "dataMax + 0.8"]}
            />

            <Tooltip
              className="graph-tooltip"
              formatter={(value, name) =>
                name === "price" ? [`₹ ${value}`, "Cost"] : null
              }
            />

            <Area
              type="monotone"
              dataKey="high"
              stroke="none"
              fill="var(--accent)"
              fillOpacity={0.12}
            />

            <Area type="monotone" dataKey="low" stroke="none" fillOpacity={0} />

            <Line
              type="monotone"
              dataKey="price"
              className="graph-line"
              dot={({ cx, cy, payload }) =>
                payload.type === "current" ? (
                  <circle cx={cx} cy={cy} r={4} fill="var(--primary-light)" />
                ) : (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={3}
                    opacity={0.6}
                    stroke="white"
                    strokeWidth={1}
                    fill="var(--primary-light)"
                  />
                )
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button className="expense-back-btn" onClick={() => navigate("/expense")}>
        Try Another Forecast
      </button>

      <p className="accuracy-hint">
        Forecast based on historical trends and average monthly variation.
        Actual fuel prices may vary due to policy changes and market conditions.
      </p>
    </div>
  );
}

export default ExpenseReport;

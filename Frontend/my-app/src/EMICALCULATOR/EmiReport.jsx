import "./EmiReport.css";
import Ailoading from "../AILOADING/Ailoading.jsx";
import ScrollToTop from "../ScrollTop/ScrollToTop";

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

function EmiReport() {
  const navigate = useNavigate();
  const location = useLocation();

  const emiReport = location.state?.emiReport;
  const FormData = location.state?.emiFormData || {};

  const yearlyChartData = emiReport.yearly_summary
    ? emiReport.yearly_summary.map((y) => ({
        year: `Y${y.year}`,
        interest: Math.round(y.interest_paid),
        principal: Math.round(y.principal_paid),
        balance: Math.round(y.remaining_balance),
      }))
    : [];

  const [loading, setLoading] = useState(true);
  const [showMonth, setShowMonth] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Ailoading />;

  // Safety check
  if (!emiReport || !Array.isArray(emiReport.monthly_breakdown)) {
    return (
      <div className="emi-empty">
        <h3>EMI calculation is currently unavailable</h3>
        <button onClick={() => navigate("/emi")}>Try Again</button>
      </div>
    );
  }

  const {
    loan_amount,
    interest_rate,
    tenure_years,
    monthly_emi,
    monthly_breakdown,
    yearly_summary,
  } = emiReport;

  const totalMonths = tenure_years * 12;
  const totalPayable = yearly_summary
    ? yearly_summary.reduce((acc, y) => acc + y.total_emi_paid, 0)
    : monthly_emi * totalMonths;

  const principal = emiReport.principal;

  const totalInterest = totalPayable - principal;

  const date = new Date();
  const currentYear = date.getFullYear();
  const startYear = currentYear;
  const endYear = currentYear + tenure_years - 1;

  const getMonthLabel = (offset) => {
    const baseDate = new Date();
    baseDate.setDate(1);
    baseDate.setMonth(baseDate.getMonth() + offset);

    return baseDate.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Chart data
  const chartData = monthly_breakdown.map((m, index) => ({
    month: getMonthLabel(index),
    balance: Math.round(m.remaining_balance),
    interest: Math.round(m.interest),
  }));

  const formatINRCompact = (value) => {
    if (value >= 100000) {
      return `₹ ${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 1)}L`;
    }

    if (value >= 1000) {
      return `₹ ${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
    }

    return `₹ ${value}`;
  };

  return (
    <>
      <ScrollToTop />
      <div className="emi-report-container">
        <h2 className="emi-title">
          <MdAutoAwesome /> EMI Breakdown Report
        </h2>

        {/* User Summary */}
        <div className="emi-user-summary">
          <div>
            <span>Car Price</span>
            <strong>₹ {emiReport.original_price.toLocaleString()}</strong>
          </div>

          <div>
            <span>Loan Amount</span>
            <strong>₹ {emiReport.principal.toLocaleString()}</strong>
          </div>

          <div>
            <span>Interest Rate</span>
            <strong>{interest_rate} %</strong>
          </div>
          <div>
            <span>Tenure</span>
            <strong>{tenure_years} Years</strong>
          </div>
        </div>

        {/* EMI Summary Card */}
        <div className="emi-summary-card">
          <h2>Loan Summary</h2>

          <div className="emi-summary-row">
            <span>Down Payment ({emiReport.down_payment_percent}%)</span>
            <strong>₹ {emiReport.down_payment.toLocaleString()}</strong>
          </div>

          <div className="emi-summary-row">
            <span>Loan Amount</span>
            <strong>₹ {emiReport.principal.toLocaleString()}</strong>
          </div>

          <div className="emi-summary-row">
            <span>Monthly EMI</span>
            <strong>₹ {monthly_emi.toLocaleString()}</strong>
          </div>

          <div className="emi-summary-row">
            <span>Total Interest</span>
            <strong>₹ {totalInterest.toLocaleString()}</strong>
          </div>

          <div className="emi-summary-row">
            <span>Total Payable</span>
            <strong>
              ₹ {(totalPayable + emiReport.down_payment).toLocaleString()}
            </strong>
          </div>
        </div>

        {/* Yearly Breakup */}
        <div className="emi-table">
          <div className="emi-graph-header-monthly">
            <h2>Annual EMI Summary</h2>
            <span className="graph-subtitle">
              {startYear} – {endYear}
            </span>
          </div>
          <div className="emi-table-head">
            <span>Year</span>
            <span>Principal (₹)</span>
            <span>Interest (₹)</span>
            <span>Total EMI (₹)</span>
            <span>Balance (₹)</span>
          </div>

          {yearly_summary.map((row) => (
            <div className="emi-row" key={row.year}>
              <span>{currentYear + row.year - 1}</span>
              <span>₹ {row.principal_paid.toLocaleString()}</span>
              <span>₹ {row.interest_paid.toLocaleString()}</span>
              <strong>₹ {row.total_emi_paid.toLocaleString()}</strong>
              <span>
                ₹ {Math.round(row.remaining_balance).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Balance Trend Graph */}
        <div className="emi-graph">
          <div className="emi-graph-header">
            <h2>Remaining Loan Balance Over Time</h2>
            <span className="graph-subtitle">
              Outstanding loan amount across the tenure
            </span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={chartData}
              margin={{ top: 30, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid className="graph-grid" vertical={false} />

              <XAxis
                dataKey="month"
                tickLine={false}
                className="graph-axis"
                tickCount={6}
              />

              <YAxis
                tickLine={false}
                className="graph-axis"
                allowDecimals={false}
                tickFormatter={(v) => `${formatINRCompact(v)}`}
                tickCount={5}
              />

              <Tooltip
                formatter={(value, name) => {
                  return [`₹ ${value.toLocaleString()}`, "Remaining Balance"];
                }}
              />

              <Line
                type="monotone"
                dataKey="balance"
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

        {/* Monthly Breakdown Table */}
        {showMonth && (
          <div className="emi-table">
            <div className="emi-graph-header-monthly">
              <h2>Monthly Breakdown</h2>
              <span className="graph-subtitle">
                {getMonthLabel(0)} –{" "}
                {getMonthLabel(monthly_breakdown.length - 1)}
              </span>
            </div>
            <div className="emi-table-head">
              <span>Month</span>
              <span>Principal (₹)</span>
              <span>Interest (₹)</span>
              <span>EMI (₹)</span>
              <span>Balance (₹)</span>
            </div>

            {monthly_breakdown.map((row) => (
              <div className="emi-row" key={row.month}>
                <span>{getMonthLabel(row.month - 1)}</span>
                <span>₹ {row.principal.toLocaleString()}</span>
                <span>₹ {row.interest.toLocaleString()}</span>
                <strong>₹ {row.emi.toLocaleString()}</strong>
                <span>
                  ₹ {Math.round(row.remaining_balance).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="emi-report-btn-section">
          {!showMonth && (
            <button className="emi-back-btn" onClick={() => setShowMonth(true)}>
              Show Monthly Breakdown
            </button>
          )}
          <button className="emi-back-btn" onClick={() => navigate("/emi")}>
            Calculate Another EMI
          </button>
        </div>

        <p className="accuracy-hint">
          EMI calculations are based on standard banking formulas. Actual loan
          terms may vary depending on lender policies.
        </p>
      </div>
    </>
  );
}

export default EmiReport;

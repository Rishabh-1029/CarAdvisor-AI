import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Emi.css";

import { MdAutoAwesome } from "react-icons/md";

function EmiCalculator() {
  const navigate = useNavigate();
  const location = useLocation();

  const prefillAmount = location.state?.prefillAmount || "";
  const prefillrate = location.state?.prefillrate || "";
  const prefillduration = location.state?.prefillduration || "";
  const prefilldownPay = location.state?.prefilldownPay || "";

  const BackendAPI = import.meta.env.VITE_BACKEND_API;

  const [emiFormData, setEmiFormData] = useState({
    loan_amount: prefillAmount,
    rate: prefillrate,
    duration: prefillduration,
    downPay: prefilldownPay,
    include_yearly: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEmiFormData({
      ...emiFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(BackendAPI + "/emi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loan_amount: Number(emiFormData.loan_amount),
          rate: Number(emiFormData.rate),
          duration: Number(emiFormData.duration),
          include_yearly: emiFormData.include_yearly,
          downPay: Number(emiFormData.downPay),
        }),
      });

      const result = await res.json();

      if (result && result.emi_report) {
        navigate("/emiReport", {
          state: {
            emiReport: result.emi_report,
            emiFormData: emiFormData,
          },
        });
      }
    } catch (err) {
      console.error("EMI Error:", err);
    }
  };

  return (
    <>
      <div className="expense-user-container">
        <h1 className="expense-user-title">
          <MdAutoAwesome size={32} color="var(--accent)" />
          <span className="forecast-title"> EMI</span> Calculator
        </h1>

        <form className="expense-user-form" onSubmit={handleSubmit}>
          {/* Loan Amount */}
          <label>Total Amount (₹)</label>
          <input
            type="number"
            name="loan_amount"
            placeholder="e.g. 850000"
            value={emiFormData.loan_amount}
            onChange={handleChange}
            required
          />

          {/* Interest Rate */}
          <label>Interest Rate (% per annum)</label>
          <input
            type="number"
            step="0.1"
            name="rate"
            placeholder="e.g. 9.2"
            value={emiFormData.rate}
            onChange={handleChange}
            required
          />

          <label>Down Payment (%)</label>
          <select
            name="downPay"
            value={emiFormData.downPay}
            onChange={handleChange}
            required
          >
            <option value="">Select Down Payment (%)</option>
            <option value="0">0</option>
            <option value="10">10 %</option>
            <option value="20">20 %</option>
            <option value="30">30 %</option>
          </select>

          {/* Duration */}
          <label>Loan Duration (Years)</label>
          <select
            name="duration"
            value={emiFormData.duration}
            onChange={handleChange}
            required
          >
            <option value="">Select tenure</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
            <option value="6">6 Years</option>
            <option value="7">7 Years</option>
          </select>

          {/* Submit */}
          <button type="submit" className="expense-user-submit-btn">
            Calculate EMI
          </button>
        </form>
      </div>
    </>
  );
}

export default EmiCalculator;

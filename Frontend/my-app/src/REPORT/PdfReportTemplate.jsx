import React, { forwardRef } from "react";
import "./PdfReportTemplate.css";
import {
  MdDirectionsCar, MdEventSeat, MdLocalGasStation, MdSpeed,
  MdOutlineSettings, MdSecurity, MdAutoAwesome, MdAccountBalance,
  MdPayments, MdLanguage, MdSearch, MdCalculate, MdArticle,
} from "react-icons/md";

function calcEMI(principal, ratePercent, years) {
  const r = ratePercent / 12 / 100;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const PdfReportTemplate = forwardRef(
  ({ selectedCar, formData, currentYear, formattedDate, usage, fuelList, transmissionList }, ref) => {
    if (!selectedCar) return null;

    const usageKm = formData?.usage === "Low" ? "8,000 km/yr" : formData?.usage === "Mid" ? "12,000 km/yr" : "18,000 km/yr";
    const loanAmount = selectedCar.price[0] * 0.8;
    const rate = 9;
    const emiData = [3, 5, 7].map(yr => {
      const emi = calcEMI(loanAmount, rate, yr);
      const totalPaid = emi * yr * 12;
      return { years: yr, emi: Math.round(emi), total: Math.round(totalPaid), interest: Math.round(totalPaid - loanAmount) };
    });

    const totalPages = 5;

    const Header = ({ subtitle }) => (
      <div className="pdf-header">
        <div className="pdf-logo"><h1><span className="title-true">True</span><span className="title-drive">Drive</span></h1></div>
        <div className="pdf-header-meta">{subtitle}<br/>Generated: {formattedDate}</div>
      </div>
    );
    const Footer = ({ page }) => (
      <div className="pdf-footer"><span>TrueDrive AI • AI-Powered Car Intelligence</span><span>Page {page} of {totalPages}</span></div>
    );

    return (
      <div className="pdf-report-wrapper" ref={ref}>

        {/* ══════ PAGE 1: Requirements + Car Overview + Specs ══════ */}
        <div className="pdf-page">
          <Header subtitle="Car Recommendation Report" />
          <div className="pdf-content-area">
            <div className="pdf-page-title"><MdAutoAwesome /> AI-Powered Recommendation Report</div>

            {/* User Requirements */}
            <div className="pdf-section">
              <h3 className="pdf-section-title">Your Search Criteria</h3>
              <div className="pdf-req-grid">
                <div className="pdf-req-row"><span>City</span><strong>{formData?.city || "Any"}</strong></div>
                <div className="pdf-req-row"><span>Fuel</span><strong>{formData?.fuelType || "Any"}</strong></div>
                <div className="pdf-req-row"><span>Transmission</span><strong>{formData?.transmission || "Any"}</strong></div>
                <div className="pdf-req-row"><span>Seating</span><strong>{formData?.seats || "Any"} Seater</strong></div>
                <div className="pdf-req-row"><span>Usage</span><strong>{usage} ({usageKm})</strong></div>
                <div className="pdf-req-row"><span>Budget</span><strong>{formData?.budget === "Above" ? "> ₹20L" : `≤ ₹${Number(formData?.budget).toLocaleString("en-IN")}`}</strong></div>
              </div>
            </div>

            {/* Car Hero */}
            <div className="pdf-hero">
              <img src={selectedCar.img} alt={selectedCar.car_name} className="pdf-car-img" crossOrigin="anonymous" />
              <div className="pdf-hero-text">
                <h2 className="pdf-car-title">{selectedCar.car_name}</h2>
                <p className="pdf-car-price">
                  {selectedCar.price.length === 1 ? `₹ ${selectedCar.price[0].toLocaleString("en-IN")}` : `₹ ${selectedCar.price[0].toLocaleString("en-IN")} – ₹ ${selectedCar.price[1].toLocaleString("en-IN")}`}
                  <span style={{ fontSize: "9px", color: "#94a3b8", marginLeft: "6px" }}>*Ex-Showroom</span>
                </p>
                <div className="pdf-badges">
                  {selectedCar.model_year && <span className="pdf-badge pdf-badge-accent">{selectedCar.model_year}</span>}
                  {selectedCar.accuracy && <span className="pdf-badge pdf-badge-green">AI: {selectedCar.accuracy}</span>}
                  <span className="pdf-badge pdf-badge-accent">{selectedCar.body_type}</span>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="pdf-section">
              <h3 className="pdf-section-title">Key Specifications</h3>
              <div className="pdf-specs-grid">
                <span className="pdf-spec-item"><MdDirectionsCar />{selectedCar.body_type}</span>
                <span className="pdf-spec-item"><MdEventSeat />{selectedCar.seating} Seater</span>
                <span className="pdf-spec-item"><MdSpeed />{selectedCar.mileage} {selectedCar.fuel[0] === "Electric" ? "Km Range" : "Km/L"}</span>
                <span className="pdf-spec-item"><MdSecurity />{selectedCar.adas === "1" ? "ADAS" : "No ADAS"}</span>
                <span className="pdf-spec-item"><MdLocalGasStation />{fuelList.join(" / ")}</span>
                <span className="pdf-spec-item"><MdOutlineSettings />{transmissionList.join(" / ")}</span>
              </div>
            </div>

            {/* AI Reasoning + Usage */}
            <div className="pdf-section">
              <h3 className="pdf-section-title">AI Recommendation</h3>
              <div className="pdf-reasoning">"{selectedCar.description}"</div>
            </div>

            <div className="pdf-section">
              <h3 className="pdf-section-title">Usage Suitability</h3>
              <div className="pdf-usage-grid">
                <div className={`pdf-usage-item ${selectedCar.accuracy_label ? "yes" : "no"}`}><span>{selectedCar.accuracy_label ? "✔" : "✖"}</span><span>{selectedCar.accuracy_label}</span></div>
                <div className={`pdf-usage-item ${selectedCar.city_use ? "yes" : "no"}`}><span>{selectedCar.city_use ? "✔" : "✖"}</span><span>City</span></div>
                <div className={`pdf-usage-item ${selectedCar.highway_use ? "yes" : "no"}`}><span>{selectedCar.highway_use ? "✔" : "✖"}</span><span>Highway</span></div>
                <div className={`pdf-usage-item ${selectedCar.commercial === 1 ? "yes" : "no"}`}><span>{selectedCar.commercial === 1 ? "✔" : "✖"}</span><span>Commercial</span></div>
              </div>
            </div>
          </div>
          <Footer page={1} />
        </div>

        {/* ══════ PAGE 2: Govt Charges + On-Road + Insurance ══════ */}
        <div className="pdf-page pdf-page-break">
          <Header subtitle="On-Road Cost Analysis" />
          <div className="pdf-content-area">
            <div className="pdf-page-title"><MdAccountBalance /> On-Road Price & Government Charges ({formData?.city})</div>

            {selectedCar.onroad_charges && Object.entries(selectedCar.onroad_charges).map(([fuelType, charges]) => (
              <div className="pdf-section" key={fuelType}>
                <h3 className="pdf-section-title">{fuelType} — Government Charges</h3>
                <table className="pdf-table">
                  <thead><tr><th>Charge</th><th>Amount (₹)</th></tr></thead>
                  <tbody>
                    <tr><td>Road Tax (RTO)</td><td>₹ {charges.min_price_band.road_tax.toLocaleString()} – ₹ {charges.max_price_band.road_tax.toLocaleString()}</td></tr>
                    <tr><td>Registration (RC)</td><td>₹ {charges.min_price_band.registration.toLocaleString()}</td></tr>
                    <tr><td>FASTag</td><td>₹ {charges.min_price_band.fastag.toLocaleString()}</td></tr>
                    {(charges.min_price_band.min_tcs > 0 || charges.max_price_band.max_tcs > 0) && (
                      <tr><td>TCS</td><td>₹ {charges.min_price_band.min_tcs.toLocaleString()} – ₹ {charges.max_price_band.max_tcs.toLocaleString()}</td></tr>
                    )}
                    <tr><td>Other Charges</td><td>₹ {charges.min_price_band.other_charges.toLocaleString()}</td></tr>
                    <tr className="pdf-table-row-total"><td>Total Govt Charges</td><td>₹ {charges.min_price_band.total_extra_charges.toLocaleString()} – ₹ {charges.max_price_band.total_extra_charges.toLocaleString()}</td></tr>
                  </tbody>
                </table>
              </div>
            ))}

            {/* On-Road Summary */}
            {selectedCar.fuel_cost_forcast && (
              <div className="pdf-section">
                <h3 className="pdf-section-title">On-Road Price Summary</h3>
                <table className="pdf-table">
                  <thead><tr><th>Variant</th><th>Ex-Showroom</th><th>Insurance (Yr 1)</th><th>Govt Charges</th><th>On-Road Price</th></tr></thead>
                  <tbody>
                    {Object.entries(selectedCar.fuel_cost_forcast).map(([fuelType]) => {
                      const ch = selectedCar.onroad_charges?.[fuelType];
                      const ins = selectedCar.insurance_cost_forecast;
                      if (!ch || !ins) return null;
                      const min = selectedCar.price[0] + ch.min_price_band.total_extra_charges + ins.year1.min;
                      const max = (selectedCar.price[1] || selectedCar.price[0]) + ch.max_price_band.total_extra_charges + ins.year1.max;
                      return (
                        <tr key={fuelType} className="pdf-table-row-total">
                          <td>{fuelType}</td>
                          <td>{selectedCar.price.length === 1 ? `₹ ${selectedCar.price[0].toLocaleString("en-IN")}` : `₹ ${selectedCar.price[0].toLocaleString("en-IN")} – ₹ ${selectedCar.price[1].toLocaleString("en-IN")}`}</td>
                          <td>₹ {ins.year1.min.toLocaleString()} – ₹ {ins.year1.max.toLocaleString()}</td>
                          <td>₹ {ch.min_price_band.total_extra_charges.toLocaleString()} – ₹ {ch.max_price_band.total_extra_charges.toLocaleString()}</td>
                          <td>₹ {min.toLocaleString("en-IN")} – ₹ {max.toLocaleString("en-IN")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Insurance Forecast */}
            {selectedCar.insurance_cost_forecast && (
              <div className="pdf-section">
                <h3 className="pdf-section-title">Insurance Forecast (3 Years)</h3>
                <table className="pdf-table">
                  <thead><tr><th>Year</th><th>Estimated Premium (₹)</th></tr></thead>
                  <tbody>
                    {["year1", "year2", "year3"].map((yr, i) => (
                      <tr key={yr}><td>{currentYear + i}</td><td>₹ {selectedCar.insurance_cost_forecast[yr].min.toLocaleString()} – ₹ {selectedCar.insurance_cost_forecast[yr].max.toLocaleString()}</td></tr>
                    ))}
                    <tr className="pdf-table-row-total"><td>Total (3 Years)</td><td>₹ {selectedCar.insurance_cost_forecast.total_3yr.min.toLocaleString()} – ₹ {selectedCar.insurance_cost_forecast.total_3yr.max.toLocaleString()}</td></tr>
                  </tbody>
                </table>
              </div>
            )}
            <p className="pdf-disclaimer">* All charges are estimates. Actual amounts may vary by city, insurer, and dealer.</p>
          </div>
          <Footer page={2} />
        </div>

        {/* ══════ PAGE 3: Fuel + Maintenance Forecast ══════ */}
        <div className="pdf-page pdf-page-break">
          <Header subtitle="Financial Intelligence" />
          <div className="pdf-content-area">
            <div className="pdf-page-title"><MdLocalGasStation /> 3-Year Expense Forecast</div>

            {/* Fuel */}
            {selectedCar.fuel_cost_forcast && Object.entries(selectedCar.fuel_cost_forcast).map(([fuelType, cost]) => (
              <div className="pdf-section" key={fuelType}>
                <h3 className="pdf-section-title">{fuelType} — Fuel Expense</h3>
                <table className="pdf-table">
                  <thead><tr><th>Year</th><th>Rate</th><th>Estimated Cost</th></tr></thead>
                  <tbody>
                    <tr><td>{currentYear}</td><td>₹ {cost.today_cost}/L</td><td>₹ {cost.year1.toLocaleString()}</td></tr>
                    <tr><td>{currentYear + 1}</td><td>+6% YoY</td><td>₹ {cost.year2.toLocaleString()}</td></tr>
                    <tr><td>{currentYear + 2}</td><td>+6% YoY</td><td>₹ {cost.year3.toLocaleString()}</td></tr>
                    <tr className="pdf-table-row-total"><td>Total</td><td></td><td>₹ {cost.total_3yr.toLocaleString()}</td></tr>
                  </tbody>
                </table>
              </div>
            ))}

            {/* Maintenance */}
            {selectedCar.maintaince_cost_forecast && (
              <div className="pdf-section">
                <h3 className="pdf-section-title">Maintenance Forecast</h3>
                <table className="pdf-table">
                  <thead><tr><th>Year</th><th>Services</th><th>Service Cost</th><th>Misc</th><th>Total</th></tr></thead>
                  <tbody>
                    {["year1", "year2", "year3"].map((yr, i) => {
                      const d = selectedCar.maintaince_cost_forecast[yr];
                      return (
                        <tr key={yr}><td>{currentYear + i}</td><td>{d.services}</td><td>₹ {d.service_cost.toLocaleString()}</td><td>₹ {d.misc_cost.toLocaleString()}</td><td>₹ {d.total.toLocaleString()}</td></tr>
                      );
                    })}
                    <tr className="pdf-table-row-total"><td>Total</td><td></td><td></td><td></td><td>₹ {selectedCar.maintaince_cost_forecast.total_3yr.toLocaleString()}</td></tr>
                  </tbody>
                </table>
              </div>
            )}
            <p className="pdf-disclaimer">* Fuel cost based on {usageKm} driving with 6% YoY inflation. Maintenance includes routine servicing & misc upkeep.</p>
          </div>
          <Footer page={3} />
        </div>

        {/* ══════ PAGE 4: TCO + EMI + Links ══════ */}
        <div className="pdf-page pdf-page-break">
          <Header subtitle="Ownership & EMI Analysis" />
          <div className="pdf-content-area">
            <div className="pdf-page-title"><MdPayments /> Total Cost of Ownership & EMI</div>

            {/* TCO */}
            {selectedCar.fuel_cost_forcast && Object.entries(selectedCar.fuel_cost_forcast).map(([fuelType, fuelCost]) => {
              const tMin = Number(fuelCost.total_3yr) + Number(selectedCar.maintaince_cost_forecast?.total_3yr || 0) + Number(selectedCar.insurance_cost_forecast?.total_3yr?.min || 0) + Number(selectedCar.onroad_charges?.[fuelType]?.min_price_band?.total_extra_charges || 0);
              const tMax = Number(fuelCost.total_3yr) + Number(selectedCar.maintaince_cost_forecast?.total_3yr || 0) + Number(selectedCar.insurance_cost_forecast?.total_3yr?.max || 0) + Number(selectedCar.onroad_charges?.[fuelType]?.max_price_band?.total_extra_charges || 0);
              return (
                <div className="pdf-section" key={fuelType}>
                  <h3 className="pdf-section-title">{fuelType} — 3-Year TCO</h3>
                  <table className="pdf-table">
                    <thead><tr><th>Component</th><th>Cost (₹)</th></tr></thead>
                    <tbody>
                      <tr><td>Fuel Expense</td><td>₹ {fuelCost.total_3yr.toLocaleString()}</td></tr>
                      <tr><td>Maintenance</td><td>₹ {selectedCar.maintaince_cost_forecast?.total_3yr.toLocaleString()}</td></tr>
                      <tr><td>Insurance</td><td>₹ {selectedCar.insurance_cost_forecast?.total_3yr.min.toLocaleString()} – ₹ {selectedCar.insurance_cost_forecast?.total_3yr.max.toLocaleString()}</td></tr>
                      <tr><td>Government Charges</td><td>₹ {(selectedCar.onroad_charges?.[fuelType]?.min_price_band?.total_extra_charges || 0).toLocaleString()} – ₹ {(selectedCar.onroad_charges?.[fuelType]?.max_price_band?.total_extra_charges || 0).toLocaleString()}</td></tr>
                      <tr><td>Ex-Showroom Price</td><td>{selectedCar.price.length === 1 ? `₹ ${selectedCar.price[0].toLocaleString("en-IN")}` : `₹ ${selectedCar.price[0].toLocaleString("en-IN")} – ₹ ${selectedCar.price[1].toLocaleString("en-IN")}`}</td></tr>
                      <tr className="pdf-table-row-total"><td>Total Ownership Cost</td><td>₹ {(tMin + selectedCar.price[0]).toLocaleString("en-IN")}{selectedCar.price.length > 1 ? ` – ₹ ${(tMax + selectedCar.price[1]).toLocaleString("en-IN")}` : ""}</td></tr>
                    </tbody>
                  </table>
                </div>
              );
            })}

            {/* EMI */}
            <div className="pdf-section">
              <h3 className="pdf-section-title"><MdCalculate /> EMI Breakdown (80% Financing @ {rate}% p.a.)</h3>
              <div className="pdf-emi-grid">
                {emiData.map(e => (
                  <div className="pdf-emi-card" key={e.years}>
                    <h4>{e.years}-Year Tenure</h4>
                    <p className="pdf-emi-amount">₹ {e.emi.toLocaleString("en-IN")}/mo</p>
                    <p className="pdf-emi-detail">Total: ₹ {e.total.toLocaleString("en-IN")} • Interest: ₹ {e.interest.toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>
              <p className="pdf-disclaimer">Loan: ₹ {loanAmount.toLocaleString("en-IN")} (80% of ₹ {selectedCar.price[0].toLocaleString("en-IN")}), Down Payment: 20%</p>
            </div>
          </div>
          <Footer page={4} />
        </div>

        {/* ══════ PAGE 5: Explore More ══════ */}
        <div className="pdf-page pdf-page-break">
          <Header subtitle="Resources & Links" />
          <div className="pdf-content-area">
            <div className="pdf-page-title"><MdLanguage /> Your Next Move</div>

            <div className="pdf-section">
              <p style={{ fontSize: "11px", color: "#475569", lineHeight: "1.7", marginBottom: "10px" }}>
                Thank you for choosing <strong style={{ color: "#0b1e33" }}>TrueDrive</strong> to explore your next car. This report has been carefully compiled using real-time market data, AI-driven insights, and transparent financial projections — all designed to help you make a confident, well-informed purchase decision.
              </p>
              <p style={{ fontSize: "11px", color: "#475569", lineHeight: "1.7", marginBottom: "10px" }}>
                <strong style={{ color: "#0b1e33" }}>What's inside this report:</strong> A complete breakdown of the <strong style={{ color: "#3ac6ff" }}>{selectedCar.car_name}</strong> — including key specifications, AI suitability analysis tailored to your driving habits, government charges specific to <strong>{formData?.city}</strong>, year-by-year fuel & maintenance forecasts with 6% inflation modeling, insurance estimates, total cost of ownership, and EMI projections across multiple tenures.
              </p>
              <p style={{ fontSize: "11px", color: "#475569", lineHeight: "1.7", marginBottom: "10px" }}>
                <strong style={{ color: "#0b1e33" }}>How we generate this:</strong> TrueDrive's recommendation engine analyzes 100+ Indian car models across parameters like fuel efficiency, price-to-feature ratio, body type, transmission, and usage patterns. Fuel prices are scraped live from market sources with a 24-hour cache, and all cost projections follow industry-standard inflation and depreciation models.
              </p>
              <p style={{ fontSize: "11px", color: "#475569", lineHeight: "1.7", marginBottom: "14px" }}>
                <strong style={{ color: "#0b1e33" }}>Next steps:</strong> Use the quick actions below to explore the official {selectedCar.car_name} page, compare other cars, or calculate a custom EMI plan. Whether you're buying your first car or upgrading, TrueDrive is here to make every rupee count.
              </p>
              <p style={{ fontSize: "11px", color: "#475569", lineHeight: "1.7", marginBottom: "14px" }}>
                <strong style={{ color: "#0b1e33" }}>Important Note:</strong> The prices, specifications, and features listed in this report are based on the latest available market data as of {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}. However, on-road prices can vary significantly depending on your exact location, dealer-specific offers, insurance provider charges, and final configuration choices. Always verify the final figures with the official manufacturer website and your local dealership before making a purchase decision.
              </p>
              
              <h3 className="pdf-section-title">Quick Actions</h3>
              
              <div className="pdf-links-row">
                <a href={selectedCar.link} target="_blank" rel="noreferrer" className="pdf-link-btn"><MdDirectionsCar /> Explore {selectedCar.car_name}</a>
                <a href="https://truedrive.netlify.app/findcar" target="_blank" rel="noreferrer" className="pdf-link-btn"><MdSearch /> Find Your Car</a>
                <a href="https://truedrive.netlify.app/carlist" target="_blank" rel="noreferrer" className="pdf-link-btn"><MdArticle /> Browse All Cars</a>
                <a href="https://truedrive.netlify.app/emi" target="_blank" rel="noreferrer" className="pdf-link-btn"><MdCalculate /> EMI Calculator</a>
              </div>
            </div>

            <div className="pdf-branding">
              <h2><span className="title-true">True</span><span className="title-drive">Drive</span></h2>
              <p>India's AI-Powered Car Recommendation & Financial Intelligence Platform</p>
              <div className="pdf-branding-features">
                <span className="pdf-branding-feature">AI Recommendations</span>
                <span className="pdf-branding-feature">Live Fuel Prices</span>
                <span className="pdf-branding-feature">3-Year TCO</span>
                <span className="pdf-branding-feature">EMI Calculator</span>
              </div>
            </div>

            <p className="pdf-disclaimer" style={{ marginTop: "12px", textAlign: "center" }}>
              Report auto-generated by TrueDrive AI on {formattedDate}. All estimates are for guidance only. Visit the official manufacturer website or connect with them at <strong style={{ color: "#0b1e33" }}>{selectedCar.car_name}</strong> dealership for accurate pricing.
            </p>
          </div>
          <Footer page={5} />
        </div>
      </div>
    );
  }
);

export default PdfReportTemplate;

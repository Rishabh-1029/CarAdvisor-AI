import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  MdAutoAwesome,
  MdDirectionsCar,
  MdEventSeat,
  MdOutlineSettings,
  MdLocalGasStation,
  MdSpeed,
  MdSecurity,
  MdAccountBalance,
  MdPayments,
} from "react-icons/md";

import "./Report.css";
import Ailoading from "../AILOADING/Ailoading.jsx";
import { useState, useEffect, useRef } from "react";

function Report() {
  const navigate = useNavigate();
  const location = useLocation();
  const reportData = location.state?.reportData;
  const formData = location.state?.formData || {};

  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [forecast, setForecast] = useState(false);
  const [forecastLoading, setForecastLoading] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");

  const formattedDate = `${day}-${month}-${currentYear}`;

  const handleForecastClick = () => {
    setForecastLoading(true);

    setTimeout(() => {
      setForecastLoading(false);
      setForecast(true);
    }, 4000);
  };

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedCar ? "hidden" : "auto";
  }, [selectedCar]);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setSelectedCar(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const usageMap = {
    Low: "Occasional",
    Mid: "Daily Commute",
    High: "High Mileage",
  };

  const transmissionList = selectedCar
    ? selectedCar.transmission === "Manual / Automatic"
      ? ["Manual", "Automatic"]
      : [selectedCar.transmission]
    : [];

  const fuelList = selectedCar
    ? Array.isArray(selectedCar.fuel)
      ? selectedCar.fuel
      : selectedCar.fuels
        ? [selectedCar.fuels]
        : []
    : [];

  const usage = usageMap[formData.usage] || "Any";

  // Loading Page

  if (loading) {
    return <Ailoading />;
  }

  // No Car Found

  if (
    !reportData ||
    !Array.isArray(reportData.cars) ||
    reportData.cars.length === 0
  ) {
    return (
      <div className="cars-not-exist-ml">
        <aside className="filter-panel-ml">
          <div className="cars-not-exist-ml-truedrive-logo">
            {/* Title - TrueDrive */}
            <h1>
              <span className="title-true">True</span>
              <span className="title-drive">Drive</span>
            </h1>
          </div>
          <h3>
            <p>This combination does not exist in the Indian market</p>
          </h3>

          {/* User Input Data */}

          <div className="pref-row-ml">
            <span>City</span>
            <strong>{formData.city || "Any"}</strong>
          </div>

          <div className="pref-row-ml">
            <span>Fuel</span>
            <strong>{formData.fuelType}</strong>
          </div>

          <div className="pref-row-ml">
            <span>Transmission</span>
            <strong>{formData.transmission}</strong>
          </div>

          <div className="pref-row-ml">
            <span>Seat</span>
            <strong>{formData.seats} Seater</strong>
          </div>

          <div className="pref-row-ml">
            <span>usage</span>
            <strong>{usage}</strong>
          </div>

          <div className="pref-row-ml">
            <span>Budget</span>
            <strong>
              {formData.budget === "Above"
                ? "Above ₹ 2,000,000"
                : `Up to ₹ ${Number(formData.budget).toLocaleString()}`}
            </strong>
          </div>

          {/* T & C */}

          <div className="pref-note-ml">
            These preferences are inferred by the AI based on your inputs.
          </div>

          {/* Button */}

          <div className="car-cta-no-car-btn">
            <button
              className="car-cta-ml-explore"
              onClick={() => navigate("/findcar")}
            >
              Explore Other Cars
            </button>
            <button
              className="car-cta-ml-explore"
              onClick={() => navigate("/carlist")}
            >
              Browse All Cars
            </button>
          </div>
        </aside>
      </div>
    );
  }

  // Cars Found

  const cars = reportData.cars;

  return (
    <div className="report-container-ml">
      <h2 className="report-title-ml">
        <span className="car-rec-title-ml">
          <MdAutoAwesome size={36} /> AI
        </span>{" "}
        Recommendations
      </h2>
      <div className="car-layout-ml">
        {/* LEFT - User Input*/}

        <aside className="filter-panel-ml">
          <h3>User Requirement</h3>

          <div className="pref-row-ml">
            <span>City</span>
            <strong>{formData.city || "Any"}</strong>
          </div>

          <div className="pref-row-ml">
            <span>Fuel</span>
            <strong>{formData.fuelType}</strong>
          </div>

          <div className="pref-row-ml">
            <span>Transmission</span>
            <strong>{formData.transmission}</strong>
          </div>

          <div className="pref-row-ml">
            <span>Seat</span>
            <strong>{formData.seats} Seater</strong>
          </div>

          <div className="pref-row-ml">
            <span>usage</span>
            <strong>{usage}</strong>
          </div>

          <div className="pref-row-ml">
            <span>Budget</span>
            <strong>
              {formData.budget === "Above"
                ? "Above ₹ 2,000,000"
                : `Up to ₹ ${Number(formData.budget).toLocaleString()}`}
            </strong>
          </div>

          <div className="pref-note-ml">
            These preferences are inferred by the AI based on your inputs.
          </div>
        </aside>

        {/* RIGHT – CAR GRID */}

        <div className="car-grid-ml">
          {cars.map((car, index) => (
            <div
              key={car.id ?? index}
              className="car-card-ml"
              onClick={() => setSelectedCar(car)}
            >
              {car.accuracy && (
                <span className="acc-badge-ml">{car.accuracy}</span>
              )}
              {car.model_year && (
                <span className="model-badge-ml">{car.model_year}</span>
              )}

              <div className="car-card-list-ml">
                <div className="car-image-wrapper-ml">
                  <img
                    src={car.img}
                    alt={car.car_name}
                    className="car-image-ml"
                    loading="lazy"
                  />
                </div>

                <div className="car-info-ml">
                  <h3 className="car-name-ml">{car.car_name}</h3>

                  <div className="car-price-ml">
                    {car.price.length === 1
                      ? `₹ ${car.price[0].toLocaleString("en-IN")}`
                      : `₹ ${car.price[0].toLocaleString("en-IN")} – ₹ ${car.price[1].toLocaleString("en-IN")}`}
                  </div>

                  <div className="car-specs-ml">
                    {car.body_type && (
                      <span className="spec-item-ml">{car.body_type}</span>
                    )}
                    {car.seating && (
                      <span className="spec-item-ml">{car.seating} Seater</span>
                    )}
                    {car.transmission && (
                      <span className="spec-item-ml">{car.transmission}</span>
                    )}
                  </div>

                  <div className="car-meta-ml">
                    {car.mileage}
                    {car.fuel[0] === "Electric" ? " Km Range " : " Km/L "}
                    {"  •  "}
                    {car.fuel.join(" • ")}
                    {car.adas && (
                      <span
                        className={`spec-item-adas-ml ${
                          car.adas === "1" ? "adas-yes-ml" : "adas-no-ml"
                        }`}
                      >
                        {car.adas === "1" ? "ADAS" : "No ADAS"}
                      </span>
                    )}
                  </div>
                  <div className="car-cta-ml">View Details</div>
                  <p className="ex-showroom-star-comment-ml">
                    *Ex-Showroom Price
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Card */}

      {selectedCar && (
        <div
          className="car-modal-overlay"
          onClick={() => {
            setSelectedCar(null);
            setForecast(false);
          }}
        >
          <div className="car-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="car-modal-close"
              onClick={() => {
                setSelectedCar(null);
                setForecast(false);
              }}
            >
              ✕
            </button>
            {/* TrueDrive Logo */}
            <div className="cars-not-exist-ml-truedrive-logo">
              <h1>
                <span className="title-true">True</span>
                <span className="title-drive">Drive</span>
              </h1>
            </div>
            {/* Car Img */}
            <img
              src={selectedCar.img}
              alt={selectedCar.car_name}
              className="car-modal-image"
            />

            <div className="car-modal-header">
              <div>
                {/* Car Name */}
                <h2>{selectedCar.car_name}</h2>
                <p className="car-modal-price">
                  {selectedCar.price.length === 1
                    ? `₹ ${selectedCar.price[0].toLocaleString("en-IN")}`
                    : `₹ ${selectedCar.price[0].toLocaleString("en-IN")} – ₹ ${selectedCar.price[1].toLocaleString("en-IN")}`}
                </p>
                {/* Predection Accuracy */}
                {selectedCar.accuracy && (
                  <span className="acc-badge-ml-detailcard">
                    {selectedCar.accuracy}
                  </span>
                )}
                {/* Car Model Year */}
                {selectedCar.model_year && (
                  <span className="year-badge-ml-detailcard">
                    {selectedCar.model_year}
                  </span>
                )}
                <div className="ex-showroom-price-tag">
                  ( Ex-Showroom price )
                </div>
              </div>
            </div>

            {/* Car Specification */}

            <div className="car-modal-body">
              <div className="spec-grid">
                {/* Body Type */}
                <span>
                  <MdDirectionsCar />
                  {selectedCar.body_type}
                </span>
                {/* No. Of Seats */}
                <span>
                  <MdEventSeat />
                  {selectedCar.seating} Seater
                </span>
                {/* Fuel Types */}
                {fuelList.map((fuels) => (
                  <span key={fuels}>
                    <MdLocalGasStation />
                    {fuels}
                  </span>
                ))}
                {/* Mileage */}
                <span>
                  <MdSpeed />
                  {selectedCar.mileage}
                  {selectedCar.fuel[0] === "Electric" ? " Km Range" : " Km/L"}
                </span>
                {/* Transmission */}
                {transmissionList.map((type) => (
                  <span key={type}>
                    <MdOutlineSettings />
                    {type}
                  </span>
                ))}
                {/* ADAS */}
                <span
                  className={
                    selectedCar.adas === "1"
                      ? "adas-yes-ml-detail-card"
                      : "adas-no-ml-detail-card"
                  }
                >
                  <MdSecurity />
                  {selectedCar.adas === "1" ? "ADAS" : "No ADAS"}
                </span>
              </div>

              {/* Car Description */}
              <div className="ai-reasoning">
                <p>{selectedCar.description}</p>
              </div>
              {/* Usage Suitability */}
              <div className="usage-suitability">
                <h4>Usage Suitability</h4>

                <div className="usage-list">
                  {/* Accuracy Label */}
                  <div
                    className={`usage-item ${
                      selectedCar.accuracy_label ? "yes" : "no"
                    }`}
                  >
                    <span>{selectedCar.accuracy_label}</span>
                    <strong>{selectedCar.accuracy_label ? "✔" : "✖"}</strong>
                  </div>
                  {/* City use */}
                  <div
                    className={`usage-item ${
                      selectedCar.city_use ? "yes" : "no"
                    }`}
                  >
                    <span>City Use</span>
                    <strong>{selectedCar.city_use ? "✔" : "✖"}</strong>
                  </div>
                  {/* Highway Use */}
                  <div
                    className={`usage-item ${
                      selectedCar.highway_use ? "yes" : "no"
                    }`}
                  >
                    <span>Highway Use</span>
                    <strong>{selectedCar.highway_use ? "✔" : "✖"}</strong>
                  </div>
                  {/* Commercial Use */}
                  <div
                    className={`usage-item ${
                      selectedCar.commercial === 1 ? "yes" : "no"
                    }`}
                  >
                    <span>Commercial Use</span>
                    <strong>{selectedCar.commercial === 1 ? "✔" : "✖"}</strong>
                  </div>
                </div>
              </div>

              {/* Usage Summary */}
              <div className={`usage-summary ${selectedCar.accuracy_label}`}>
                <MdAutoAwesome size={12} color="var(--accent)" />
                {/* Usage description */}
                <strong> {selectedCar.accuracy_label}</strong> — Based on your
                requirements, this car aligns well with your{" "}
                <strong>{usage.toLowerCase()}</strong> needs. It is best suited
                for {selectedCar.city_use && "city driving"}
                {selectedCar.city_use &&
                  selectedCar.highway_use &&
                  " as well as "}
                {selectedCar.highway_use && "highway use"}.
                <span className="accuracy-hint">
                  {/* AI confidence */}
                  AI confidence: {selectedCar.accuracy}
                </span>
              </div>
            </div>

            {/* Forecast Loading */}
            {forecastLoading && <Ailoading />}

            {/* Expense Forecasting */}
            {forecast && !forecastLoading && (
              <div className="Cost-grid">
                {/* Fuel Cost */}

                <div className="fuel-cost-3year">
                  <h2 className="fuel-cost-title">
                    <MdAutoAwesome /> Fuel Expense Forecast for 3 years
                  </h2>

                  {selectedCar.fuel_cost_forcast &&
                    Object.entries(selectedCar.fuel_cost_forcast).map(
                      ([fuelType, cost]) => (
                        <div className="fuel-cost-table" key={fuelType}>
                          <div className="fuel-cost-table-head">
                            <span>
                              <span className="today-fuel">{fuelType}</span>
                              {" • "}
                              {formattedDate}
                              {" • "}
                              <span className="today-rate">
                                ₹ {cost.today_cost.toLocaleString()}
                              </span>
                            </span>
                            <span>Estimated Cost (₹)</span>
                          </div>

                          {/* Year 1 */}

                          <div className="fuel-cost-row">
                            <span>{currentYear}</span>
                            <strong>₹ {cost.year1.toLocaleString()}</strong>
                          </div>

                          {/* Year 2 */}

                          <div className="fuel-cost-row">
                            <span>{currentYear + 1}</span>
                            <strong>₹ {cost.year2.toLocaleString()}</strong>
                          </div>

                          {/* Year 3 */}

                          <div className="fuel-cost-row">
                            <span>{currentYear + 2}</span>
                            <strong>₹ {cost.year3.toLocaleString()}</strong>
                          </div>

                          {/* Total Cost */}

                          <div className="fuel-cost-row total">
                            <span>{fuelType} cost for 3 years</span>
                            <strong>₹ {cost.total_3yr.toLocaleString()}</strong>
                          </div>
                        </div>
                      ),
                    )}
                  {/* T & C */}

                  <span className="accuracy-hint">
                    Estimated fuel cost is calculated for{" "}
                    <span className="accuracy-hint-usage">
                      {formData.usage === "Low"
                        ? "Occasional Usage (8,000 km/year)"
                        : formData.usage === "Mid"
                          ? "Daily Commute (12,000 km/year)"
                          : "Long-distance Travel (18,000 km/year)"}{" "}
                    </span>
                    based on standard historical usage data. Actual costs may
                    vary depending on individual driving patterns and fuel
                    prices.
                  </span>
                </div>

                {/* Maintance Cost */}

                <div className="Maintenance-cost-3year">
                  <h2 className="fuel-cost-title">
                    <MdAutoAwesome /> Maintenance Cost Forecast for 3 Years
                  </h2>

                  {selectedCar.maintaince_cost_forecast && (
                    <div className="fuel-cost-table">
                      <div className="maintain-cost-table-head">
                        <span>Year</span>
                        <span>Service Cost (₹)</span>
                        <span>Miscellaneous (₹)</span>
                        <span>Total Cost (₹)</span>
                      </div>

                      {/* Year 1 */}

                      <div className="maintain-cost-row">
                        <span>{currentYear}</span>
                        <strong>
                          {selectedCar.maintaince_cost_forecast.year1.services}{" "}
                          Service
                          {selectedCar.maintaince_cost_forecast.year1.services >
                          1
                            ? "s - "
                            : " - "}
                          ₹{" "}
                          {selectedCar.maintaince_cost_forecast.year1.service_cost.toLocaleString()}
                        </strong>
                        <strong>
                          ₹{" "}
                          {selectedCar.maintaince_cost_forecast.year1.misc_cost.toLocaleString()}
                        </strong>
                        <strong>
                          ₹{" "}
                          {selectedCar.maintaince_cost_forecast.year1.total.toLocaleString()}
                        </strong>
                      </div>

                      {/* Year 2 */}

                      <div className="maintain-cost-row">
                        <span>{currentYear + 1}</span>
                        <strong>
                          {selectedCar.maintaince_cost_forecast.year2.services}{" "}
                          Service
                          {selectedCar.maintaince_cost_forecast.year2.services >
                          1
                            ? "s - "
                            : " - "}
                          ₹{" "}
                          {selectedCar.maintaince_cost_forecast.year2.service_cost.toLocaleString()}
                        </strong>
                        <strong>
                          ₹{" "}
                          {selectedCar.maintaince_cost_forecast.year2.misc_cost.toLocaleString()}
                        </strong>
                        <strong>
                          ₹{" "}
                          {selectedCar.maintaince_cost_forecast.year2.total.toLocaleString()}
                        </strong>
                      </div>

                      {/* Year 3 */}

                      <div className="maintain-cost-row">
                        <span>{currentYear + 2}</span>
                        <strong>
                          {selectedCar.maintaince_cost_forecast.year3.services}{" "}
                          Service
                          {selectedCar.maintaince_cost_forecast.year3.services >
                          1
                            ? "s - "
                            : " - "}
                          ₹{" "}
                          {selectedCar.maintaince_cost_forecast.year3.service_cost.toLocaleString()}
                        </strong>
                        <strong>
                          ₹{" "}
                          {selectedCar.maintaince_cost_forecast.year3.misc_cost.toLocaleString()}
                        </strong>
                        <strong>
                          ₹{" "}
                          {selectedCar.maintaince_cost_forecast.year3.total.toLocaleString()}
                        </strong>
                      </div>

                      {/* Total Cost */}

                      <div className="fuel-cost-row total">
                        <span>Maintenance Cost for 3 years</span>
                        <strong>
                          ₹{" "}
                          {selectedCar.maintaince_cost_forecast.total_3yr.toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  )}

                  {/* T & C */}

                  <span className="accuracy-hint">
                    Maintenance Cost Includes routine servicing and
                    miscellaneous upkeep.
                  </span>
                </div>

                {/* Insurance cost */}

                <div className="Maintenance-cost-3year">
                  <h2 className="fuel-cost-title">
                    <MdAutoAwesome /> Insurance Cost Forecast for 3 Years
                  </h2>

                  {selectedCar.insurance_cost_forecast && (
                    <div className="fuel-cost-table">
                      <div className="fuel-cost-table-head">
                        <span className="inline-icon-text">
                          Insurance Cost (₹)
                        </span>
                        <span>Estimated Cost (₹)</span>
                      </div>

                      {/* Year 1 */}

                      <div className="fuel-cost-row">
                        <span>{currentYear}</span>
                        <strong>
                          ₹{" "}
                          {selectedCar.insurance_cost_forecast.year1.min.toLocaleString()}{" "}
                          – ₹{" "}
                          {selectedCar.insurance_cost_forecast.year1.max.toLocaleString()}
                        </strong>
                      </div>

                      {/* Year 2 */}

                      <div className="fuel-cost-row">
                        <span>{currentYear + 1}</span>
                        <strong>
                          ₹{" "}
                          {selectedCar.insurance_cost_forecast.year2.min.toLocaleString()}{" "}
                          – ₹{" "}
                          {selectedCar.insurance_cost_forecast.year2.max.toLocaleString()}
                        </strong>
                      </div>

                      {/* Year 3 */}

                      <div className="fuel-cost-row">
                        <span>{currentYear + 2}</span>
                        <strong>
                          ₹{" "}
                          {selectedCar.insurance_cost_forecast.year3.min.toLocaleString()}{" "}
                          – ₹{" "}
                          {selectedCar.insurance_cost_forecast.year3.max.toLocaleString()}
                        </strong>
                      </div>

                      {/* Total Cost */}

                      <div className="fuel-cost-row total">
                        <span>Total Insurance Cost (3 Years)</span>
                        <strong>
                          ₹{" "}
                          {selectedCar.insurance_cost_forecast.total_3yr.min.toLocaleString()}{" "}
                          – ₹{" "}
                          {selectedCar.insurance_cost_forecast.total_3yr.max.toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  )}

                  {/* T & C */}

                  <span className="accuracy-hint">
                    Insurance cost shown as a range based on variant price.
                    Actual premiums may vary by insurer, city, and selected
                    add-ons.
                  </span>
                </div>

                {/* Additional cost */}

                <div className="Maintenance-cost-3year">
                  <h2 className="fuel-cost-title">
                    <MdAccountBalance />
                    Government Charges
                  </h2>

                  {selectedCar.onroad_charges &&
                    Object.entries(selectedCar.onroad_charges).map(
                      ([fuelType, charges]) => (
                        <div className="fuel-cost-table" key={fuelType}>
                          <div className="fuel-cost-table-head">
                            <span className="inline-icon-text">
                              <span className="today-fuel">{fuelType}</span> •
                              Government Charges
                            </span>
                            <span>Amount (₹)</span>
                          </div>

                          {/* Road Tax */}

                          <div className="fuel-cost-row">
                            <span>Road Tax (RTO)</span>
                            <strong>
                              ₹{" "}
                              {charges.min_price_band.road_tax.toLocaleString()}{" "}
                              – ₹{" "}
                              {charges.max_price_band.road_tax.toLocaleString()}
                            </strong>
                          </div>

                          {/* Registration */}

                          <div className="fuel-cost-row">
                            <span>Registration (RC)</span>
                            <strong>
                              ₹{" "}
                              {charges.min_price_band.registration.toLocaleString()}
                            </strong>
                          </div>

                          {/* FASTag */}

                          <div className="fuel-cost-row">
                            <span>FASTag</span>
                            <strong>
                              ₹ {charges.min_price_band.fastag.toLocaleString()}
                            </strong>
                          </div>

                          {/* tcs */}

                          {(charges.min_price_band.min_tcs > 0 ||
                            charges.max_price_band.max_tcs > 0) && (
                            <div className="fuel-cost-row">
                              <span>TCS</span>
                              {charges.min_price_band.min_tcs > 0 && (
                                <strong>
                                  ₹ {charges.min_price_band.min_tcs} - ₹{" "}
                                  {charges.max_price_band.max_tcs}
                                </strong>
                              )}
                              {!charges.min_price_band.min_tcs > 0 &&
                                charges.max_price_band.max_tcs > 0 && (
                                  <strong>
                                    ₹ {charges.max_price_band.max_tcs}
                                  </strong>
                                )}
                            </div>
                          )}

                          {/* Other Govt Charges */}

                          <div className="fuel-cost-row">
                            <span>Other Charges</span>
                            <strong>
                              ₹{" "}
                              {charges.min_price_band.other_charges.toLocaleString()}
                            </strong>
                          </div>

                          {/* TOTAL */}

                          <div className="fuel-cost-row total">
                            <span>Total Government Charges</span>
                            <strong>
                              ₹{" "}
                              {charges.min_price_band.total_extra_charges.toLocaleString()}{" "}
                              – ₹{" "}
                              {charges.max_price_band.total_extra_charges.toLocaleString()}
                            </strong>
                          </div>
                        </div>
                      ),
                    )}

                  {/* T & C */}

                  <span className="accuracy-hint">
                    Government charges include RTO tax, registration, FASTag,
                    and other government fees applicable in {formData.city}.
                  </span>
                </div>

                {/* On Road Expense */}

                <div className="Maintenance-cost-3year">
                  <h2 className="fuel-cost-title">
                    <MdDirectionsCar />
                    Expected On-Road Price ({formData.city})
                  </h2>

                  {selectedCar.fuel_cost_forcast &&
                    Object.entries(selectedCar.fuel_cost_forcast).map(
                      ([fuelType, fuelCost]) => {
                        return (
                          <div className="fuel-cost-table" key={fuelType}>
                            <div className="fuel-cost-table-head">
                              <span className="inline-icon-text">
                                <span className="today-fuel">{fuelType}</span> •
                                On-Road Cost
                              </span>
                              <span>Total Cost (₹)</span>
                            </div>

                            {/* Ex-Showroom */}

                            <div className="fuel-cost-row">
                              <span>Ex-Showroom Price</span>
                              {selectedCar.price.length === 1 ? (
                                <strong>
                                  ₹{" "}
                                  {selectedCar.price[0].toLocaleString("en-IN")}
                                </strong>
                              ) : (
                                <strong>
                                  ₹{" "}
                                  {selectedCar.price[0].toLocaleString("en-IN")}{" "}
                                  - ₹{" "}
                                  {selectedCar.price[1].toLocaleString("en-IN")}
                                </strong>
                              )}
                            </div>

                            {/* Insurance */}

                            <div className="fuel-cost-row">
                              <span>Insurance ({currentYear})</span>
                              <strong>
                                ₹{" "}
                                {selectedCar.insurance_cost_forecast.year1.min.toLocaleString()}{" "}
                                – ₹{" "}
                                {selectedCar.insurance_cost_forecast.year1.max.toLocaleString()}
                              </strong>
                            </div>

                            {/* On-road */}

                            {selectedCar.onroad_charges?.[fuelType] && (
                              <div className="fuel-cost-row">
                                <span>Government Charges</span>
                                <strong>
                                  ₹{" "}
                                  {selectedCar.onroad_charges[
                                    fuelType
                                  ].min_price_band.total_extra_charges.toLocaleString()}{" "}
                                  – ₹{" "}
                                  {selectedCar.onroad_charges[
                                    fuelType
                                  ].max_price_band.total_extra_charges.toLocaleString()}
                                </strong>
                              </div>
                            )}

                            {/* Final on-road */}

                            <div className="fuel-cost-row total">
                              <span>On-Road Price</span>
                              {selectedCar.price.length === 1 ? (
                                <strong>
                                  ₹{" "}
                                  {(
                                    selectedCar.onroad_charges[fuelType]
                                      .min_price_band.total_extra_charges +
                                    selectedCar.insurance_cost_forecast.year1
                                      .min +
                                    selectedCar.price[0]
                                  ).toLocaleString("en-IN")}
                                </strong>
                              ) : (
                                <strong>
                                  ₹{" "}
                                  {(
                                    selectedCar.onroad_charges[fuelType]
                                      .min_price_band.total_extra_charges +
                                    selectedCar.insurance_cost_forecast.year1
                                      .min +
                                    selectedCar.price[0]
                                  ).toLocaleString("en-IN")}{" "}
                                  – ₹{" "}
                                  {(
                                    selectedCar.onroad_charges[fuelType]
                                      .max_price_band.total_extra_charges +
                                    selectedCar.insurance_cost_forecast.year1
                                      .max +
                                    selectedCar.price[1]
                                  ).toLocaleString("en-IN")}
                                </strong>
                              )}
                            </div>
                          </div>
                        );
                      },
                    )}

                  {/* T & C */}

                  <span className="accuracy-hint">
                    The On-Road Price includes ex-showroom Price, road tax,
                    registration, insurance, and other mandatory government
                    charges. Accessories are excluded.
                  </span>
                </div>

                {/* Total Expense */}

                <div className="Maintenance-cost-3year">
                  <h2 className="fuel-cost-title">
                    <MdPayments />
                    Total Cost of Ownership (3 Years)
                  </h2>

                  {selectedCar.fuel_cost_forcast &&
                    Object.entries(selectedCar.fuel_cost_forcast).map(
                      ([fuelType, fuelCost]) => {
                        const totalMin =
                          Number(fuelCost.total_3yr) +
                          Number(
                            selectedCar.maintaince_cost_forecast.total_3yr,
                          ) +
                          Number(
                            selectedCar.insurance_cost_forecast.total_3yr.min,
                          ) +
                          Number(
                            selectedCar.onroad_charges?.[fuelType]
                              ?.min_price_band?.total_extra_charges || 0,
                          );

                        const totalMax =
                          Number(fuelCost.total_3yr) +
                          Number(
                            selectedCar.maintaince_cost_forecast.total_3yr,
                          ) +
                          Number(
                            selectedCar.insurance_cost_forecast.total_3yr.max,
                          ) +
                          Number(
                            selectedCar.onroad_charges?.[fuelType]
                              ?.max_price_band?.total_extra_charges || 0,
                          );

                        return (
                          <div className="fuel-cost-table" key={fuelType}>
                            <div className="fuel-cost-table-head">
                              <span className="inline-icon-text">
                                <span className="today-fuel">{fuelType}</span> •
                                Ownership Cost (3 Years)
                              </span>
                              <span>Total Cost (₹)</span>
                            </div>

                            {/* Fuel */}

                            <div className="fuel-cost-row">
                              <span>Fuel Expense</span>
                              <strong>
                                ₹ {fuelCost.total_3yr.toLocaleString()}
                              </strong>
                            </div>

                            {/* Maintenance */}

                            <div className="fuel-cost-row">
                              <span>Maintenance</span>
                              <strong>
                                ₹{" "}
                                {selectedCar.maintaince_cost_forecast.total_3yr.toLocaleString()}
                              </strong>
                            </div>

                            {/* Insurance */}

                            <div className="fuel-cost-row">
                              <span>Insurance</span>
                              <strong>
                                ₹{" "}
                                {selectedCar.insurance_cost_forecast.total_3yr.min.toLocaleString()}{" "}
                                – ₹{" "}
                                {selectedCar.insurance_cost_forecast.total_3yr.max.toLocaleString()}
                              </strong>
                            </div>

                            {/* On-road */}

                            {selectedCar.onroad_charges?.[fuelType] && (
                              <div className="fuel-cost-row">
                                <span>Government Charges</span>
                                <strong>
                                  ₹{" "}
                                  {selectedCar.onroad_charges[
                                    fuelType
                                  ].min_price_band.total_extra_charges.toLocaleString()}{" "}
                                  – ₹{" "}
                                  {selectedCar.onroad_charges[
                                    fuelType
                                  ].max_price_band.total_extra_charges.toLocaleString()}
                                </strong>
                              </div>
                            )}

                            {/* TOTAL */}

                            <div className="fuel-cost-row total">
                              <span>Additional Cost (3 Years)</span>
                              <strong>
                                ₹ {totalMin.toLocaleString()} – ₹{" "}
                                {totalMax.toLocaleString()}
                              </strong>
                            </div>

                            <div className="fuel-cost-row">
                              <span>Ex-Showroom Price</span>
                              {selectedCar.price.length === 1 ? (
                                <strong>
                                  ₹{" "}
                                  {selectedCar.price[0].toLocaleString("en-IN")}
                                </strong>
                              ) : (
                                <strong>
                                  ₹{" "}
                                  {selectedCar.price[0].toLocaleString("en-IN")}{" "}
                                  - ₹{" "}
                                  {selectedCar.price[1].toLocaleString("en-IN")}
                                </strong>
                              )}
                            </div>

                            <div className="fuel-cost-row total">
                              <span>Total Cost of Ownership (3 Years)</span>
                              {selectedCar.price.length === 1 ? (
                                <strong>
                                  ₹{" "}
                                  {(
                                    totalMin + selectedCar.price[0]
                                  ).toLocaleString("en-IN")}
                                </strong>
                              ) : (
                                <strong>
                                  ₹{" "}
                                  {(
                                    totalMin + selectedCar.price[0]
                                  ).toLocaleString("en-IN")}{" "}
                                  – ₹{" "}
                                  {(
                                    totalMax + selectedCar.price[1]
                                  ).toLocaleString("en-IN")}
                                </strong>
                              )}
                            </div>
                          </div>
                        );
                      },
                    )}

                  {/* T & C */}

                  <span className="accuracy-hint">
                    The total cost includes fuel, routine maintenance, road tax,
                    registration, insurance, and other mandatory government
                    charges. Accessories and unforeseen repairs are excluded.
                  </span>
                </div>
              </div>
            )}

            {/* Buttons */}

            {/* Expense Forecast Button */}
            <div className="car-modal-actions">
              {!forecast && (
                <button className="car-cta-ml" onClick={handleForecastClick}>
                  Expense Forecast
                </button>
              )}

              {/* Download PDF Button */}
              {forecast && <button className="car-cta-ml">Download PDF</button>}

              {/* Explore Car Button */}
              <a
                href={selectedCar.link}
                target="_blank"
                rel="noreferrer"
                className="car-cta-ml"
              >
                Explore {selectedCar.car_name}
              </a>
            </div>

            {/* Final T & C */}

            <span className="disc-warning">
              All estimates are for guidance purposes. For the most accurate and
              up-to-date information, please visit the official{" "}
              {selectedCar.car_name} website.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Report;

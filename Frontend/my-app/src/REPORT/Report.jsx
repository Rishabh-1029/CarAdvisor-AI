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
} from "react-icons/md";

import "./Report.css";
import Ailoading from "../AILOADING/Ailoading.jsx";
import { useState, useEffect } from "react";

function Report() {
  const navigate = useNavigate();
  const location = useLocation();
  const reportData = location.state?.reportData;
  const formData = location.state?.formData || {};
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

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

  if (loading) {
    return <Ailoading />;
  }

  if (
    !reportData ||
    !Array.isArray(reportData.cars) ||
    reportData.cars.length === 0
  ) {
    return (
      <div className="cars-not-exist-ml">
        <aside className="filter-panel-ml">
          <h3>
            <p>This combination does not exist in the Indian market</p>
          </h3>

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
          <button
            className="car-cta-ml-explore"
            onClick={() => navigate("/carlist")}
          >
            Browse All Available Cars
          </button>
        </aside>
      </div>
    );
  }

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
        {/* LEFT */}
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

                  <div className="car-price-ml">{car.price}</div>

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
                    {car.fuel === "Electric" ? " Km Range " : " Km/L "}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCar && (
        <div className="car-modal-overlay" onClick={() => setSelectedCar(null)}>
          <div className="car-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="car-modal-close"
              onClick={() => setSelectedCar(null)}
            >
              ✕
            </button>

            <img
              src={selectedCar.img}
              alt={selectedCar.car_name}
              className="car-modal-image"
            />

            <div className="car-modal-header">
              <div>
                <h2>{selectedCar.car_name}</h2>
                <p className="car-modal-price">{selectedCar.price}</p>

                {selectedCar.accuracy && (
                  <span className="acc-badge-ml-detailcard">
                    {selectedCar.accuracy}
                  </span>
                )}

                {selectedCar.model_year && (
                  <span className="year-badge-ml-detailcard">
                    {selectedCar.model_year}
                  </span>
                )}
              </div>
            </div>

            <div className="car-modal-body">
              <div className="spec-grid">
                <span>
                  <MdDirectionsCar />
                  {selectedCar.body_type}
                </span>

                <span>
                  <MdEventSeat />
                  {selectedCar.seating} Seater
                </span>

                {fuelList.map((fuels) => (
                  <span key={fuels}>
                    <MdLocalGasStation />
                    {fuels}
                  </span>
                ))}

                <span>
                  <MdSpeed />
                  {selectedCar.mileage}
                  {selectedCar.fuel === "Electric" ? " Km Range" : " Km/L"}
                </span>

                {transmissionList.map((type) => (
                  <span key={type}>
                    <MdOutlineSettings />
                    {type}
                  </span>
                ))}

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

              <div className="ai-reasoning">
                <p>{selectedCar.description}</p>
              </div>

              <div className="usage-suitability">
                <h4>Usage Suitability</h4>

                <div className="usage-list">
                  <div
                    className={`usage-item ${
                      selectedCar.accuracy_label ? "yes" : "no"
                    }`}
                  >
                    <span>{selectedCar.accuracy_label}</span>
                    <strong>{selectedCar.accuracy_label ? "✔" : "✖"}</strong>
                  </div>
                  <div
                    className={`usage-item ${
                      selectedCar.city_use ? "yes" : "no"
                    }`}
                  >
                    <span>City Use</span>
                    <strong>{selectedCar.city_use ? "✔" : "✖"}</strong>
                  </div>

                  <div
                    className={`usage-item ${
                      selectedCar.highway_use ? "yes" : "no"
                    }`}
                  >
                    <span>Highway Use</span>
                    <strong>{selectedCar.highway_use ? "✔" : "✖"}</strong>
                  </div>

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

              <div className={`usage-summary ${selectedCar.accuracy_label}`}>
                <MdAutoAwesome size={12} color="var(--accent)" />
                <strong> {selectedCar.accuracy_label}</strong> — Based on your
                requirements, this car aligns well with your{" "}
                <strong>{usage.toLowerCase()}</strong> needs. It is best suited
                for {selectedCar.city_use && "city driving"}
                {selectedCar.city_use &&
                  selectedCar.highway_use &&
                  " as well as "}
                {selectedCar.highway_use && "highway use"}.
                <span className="accuracy-hint">
                  AI confidence: {selectedCar.accuracy}
                </span>
              </div>
            </div>

            <div className="car-modal-actions">
              <a
                href={selectedCar.link}
                target="_blank"
                rel="noreferrer"
                className="car-cta-ml"
              >
                Explore More
              </a>
            </div>

            <span className="disc-warning">
              *Details are AI-assisted and should be verified on the official
              website.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Report;

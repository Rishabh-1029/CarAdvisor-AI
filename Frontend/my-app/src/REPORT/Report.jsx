import { useLocation } from "react-router-dom";
import "./Report.css";

function Report() {
  const location = useLocation();
  const reportData = location.state?.reportData;
  const formData = location.state?.formData || {};

  if (
    !reportData ||
    !Array.isArray(reportData.cars) ||
    reportData.cars.length === 0
  ) {
    return (
      <div className="report-container-ml">
        <p>No data available. Please fill the form first.</p>
      </div>
    );
  }

  const cars = reportData.cars;

  const usageMap = {
    Low: "Occasional",
    Mid: "Daily Commute",
    High: "High Mileage",
  };

  const usage = usageMap[formData.usage] || "Any";

  return (
    <div className="report-container-ml">
      <h2 className="report-title-ml">
        <span className="car-rec-title-ml">AI</span> Recommendations
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
            <a
              key={car.id ?? index}
              href={car.link}
              target="_blank"
              rel="noreferrer"
              className="car-card-ml"
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
                    {car.fuel}

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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Report;

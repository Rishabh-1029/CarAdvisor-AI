import { useLocation } from "react-router-dom";
import "./Report.css";

function Report() {
  const location = useLocation();
  const reportData = location.state?.reportData;

  // Guard: direct access without data
  if (!reportData || !Array.isArray(reportData.cars)) {
    return (
      <div className="report-container">
        <p>No data available. Please fill the form first.</p>
      </div>
    );
  }

  const cars = reportData.cars;

  return (
    <div className="report-container">
      <h1>
        <span className="car-rec-title">Car</span> Recommendations
      </h1>

      <div className="cards-container">
        {cars.map((car, index) => (
          <a
            key={car.id ?? index}
            href={car.link}
            target="_blank"
            rel="noreferrer"
            className="car-card"
          >
            {car.fuel && <span className="fuel-badge">{car.fuel}</span>}
            {car.accuracy && <span className="acc-badge">{car.accuracy}</span>}

            <div className="car-card-list">
              {/* Image Section */}
              <div className="car-image-wrapper">
                <img
                  src={car.img}
                  alt={car.car_name || "Car"}
                  className="car-image"
                  loading="lazy"
                />
              </div>

              {/* Content Section */}
              <div className="car-info">
                {/* Car Name */}
                <h2 className="car-name">{car.car_name || "Unknown Model"}</h2>

                {/* Price */}
                {car.price && <div className="car-price">{car.price}</div>}

                {/* Specs Row */}
                <div className="car-specs">
                  {car.mileage && (
                    <span className="spec-item">{car.mileage}</span>
                  )}

                  {car.body_type && (
                    <span className="spec-item">{car.body_type}</span>
                  )}

                  {car.transmission && (
                    <span className="spec-item">{car.transmission}</span>
                  )}
                </div>

                {/* Secondary Info */}
                <div className="car-meta">
                  {car.seating && <span>{car.seating} Seater</span>}
                  {car.city && <span>{car.city}</span>}
                </div>

                {/* CTA */}
                <div className="car-cta">View Details →</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Report;

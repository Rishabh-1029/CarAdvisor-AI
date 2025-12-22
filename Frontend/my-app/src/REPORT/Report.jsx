import { useLocation } from "react-router-dom";
import "./Report.css";

function Report() {
  const location = useLocation();
  const reportData = location.state?.reportData;

  if (!reportData) {
    return <p>No data available. Please fill the form first.</p>;
  }
  const reportArray = Array.isArray(reportData) ? reportData : [reportData];

  return (
    <div className="report-container">
      <h1>Car Recommendations</h1>
      <div className="cards-container">
        {reportArray.map((car, index) => (
          <div className="car-card" key={index}>
            <img
              src={car.image || "https://via.placeholder.com/150"}
              alt={car.model || "Car"}
              className="car-image"
            />
            <div className="car-info">
              <h2>{car.model || "Unknown Model"}</h2>
              <p>
                <strong>City:</strong> {car.city}
              </p>
              <p>
                <strong>Price:</strong> ₹{car.price}
              </p>
              <p>
                <strong>Fuel Type:</strong> {car.fuelType}
              </p>
              <p>
                <strong>Seats:</strong> {car.seats}
              </p>
              <p>
                <strong>Expected Usage:</strong> {car.usage} km/month
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Report;

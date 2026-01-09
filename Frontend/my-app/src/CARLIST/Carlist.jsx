import { useEffect, useState } from "react";
import "./Carlist.css";

function Carlist() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/car-listing")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cars");
        return res.json();
      })
      .then((data) => {
        setCars(data.cars || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="center-text">Loading cars...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="carlist-container">
      <h2 className="page-title">Browse Cars</h2>

      <div className="car-grid">
        {cars.map((car) => (
          <div key={car.car_id} className="car-card">
            <img src={car.img} alt={car.car_name} className="car-image" />

            <div className="car-info">
              <h3>{car.car_name}</h3>
              <p className="body-type">{car.body_type}</p>

              <p>
                <strong>Fuel:</strong> {car.fuel_types.join(", ")}
              </p>
              <p className="price">
                ₹{car.min_price.toLocaleString()} – ₹
                {car.max_price.toLocaleString()}
              </p>

              <p className="description">{car.description}</p>

              <a
                href={car.link}
                target="_blank"
                rel="noreferrer"
                className="view-btn"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carlist;

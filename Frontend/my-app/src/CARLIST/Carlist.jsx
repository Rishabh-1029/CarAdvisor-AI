import { useEffect, useState } from "react";
import "./Carlist.css";

function Carlist() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [bodyType, setBodyType] = useState("All");
  const [brand, setBrand] = useState("All");
  const [fuelType, setFuelType] = useState("All");
  const [transmissionType, setTransmissionType] = useState("All");
  const [minPrice, setMinPrice] = useState(400000);
  const [maxPrice, setMaxPrice] = useState(5000000);

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

  const filteredCars = cars.filter((car) => {
    if (bodyType !== "All" && car.body_type !== bodyType) return false;
    if (fuelType !== "All" && !car.fuel_types.includes(fuelType)) return false;
    if (brand !== "All" && car.car_brand !== brand) return false;
    if (transmissionType !== "All") {
      if (!car.transmission.includes(transmissionType)) return false;
    }

    if (car.min_price > maxPrice || car.max_price < minPrice) return false;
    return true;
  });

  if (loading) return <p className="center-text">Loading cars...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="carlist-container">
      <h2 className="page-title">
        Browse <span className="title-word-car">Cars</span>
      </h2>

      <div className="car-layout">
        {/* LEFT FILTER PANEL */}
        <aside className="filter-panel">
          <h3>Filters</h3>

          <div className="filter-group">
            <label>Body Type</label>
            <select onChange={(e) => setBodyType(e.target.value)}>
              <option value="All">All</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Brand</label>
            <select onChange={(e) => setBrand(e.target.value)}>
              <option value="All">All</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Honda">Honda</option>
              <option value="Tata">Tata</option>
              <option value="Mahindra">Mahindra</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Fuel Type</label>
            <select onChange={(e) => setFuelType(e.target.value)}>
              <option value="All">All</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
              <option value="EV">EV</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Transmission</label>
            <select onChange={(e) => setTransmissionType(e.target.value)}>
              <option value="All">All</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range (₹)</label>

            <div className="max-min-label">
              <label>Min</label>
              <input
                type="range"
                min="400000"
                max="5000000"
                step="50000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </div>
            <div className="max-min-label">
              <label>Max</label>
              <input
                type="range"
                min="400000"
                max="5000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>

            <div className="price-labels">
              <span>₹ {minPrice.toLocaleString()}</span>
              <span className="dash">–</span>
              <span>₹ {maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </aside>

        {/* RIGHT GRID */}
        <div className="car-grid">
          {filteredCars.map((car) => (
            <div key={car.car_id} className="car-card">
              <div className="year-badge">{car.launch_year}</div>

              <img src={car.img} alt={car.car_name} className="car-image" />

              <div className="car-info">
                <h3>{car.car_name}</h3>

                <div className="capsule-row">
                  <span className="capsule">{car.body_type}</span>
                  <span className="capsule">{car.seat} Seater</span>
                  <span className="capsule">{car.transmission}</span>
                </div>

                <p className="fuel-line">{car.fuel_types.join(" • ")}</p>

                <p className="spec-line">
                  {car.fuel_types.length === 1 && car.fuel_types[0] === "EV"
                    ? `${car.milage} km range`
                    : `${car.milage} km/l`}

                  {car.adas === 1 && <span className="adas-badge">ADAS</span>}
                </p>

                <div className="price">
                  ₹{car.min_price.toLocaleString()} – ₹
                  {car.max_price.toLocaleString()}
                  <div className="ex-showroom-star-comment">
                    *Ex-Showroom Price
                  </div>
                </div>

                <a
                  href={car.link}
                  target="_blank"
                  rel="noreferrer"
                  className="view-btn"
                >
                  View Details
                </a>
              </div>
              <div className="card-overlay">
                <p>{car.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carlist;

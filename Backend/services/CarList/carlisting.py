import pandas as pd
from db import engine
from sqlalchemy import text

# brew services start postgresql@15
# psql truedrive

def fetch_cars_from_db():
    query = text("SELECT * FROM cars")
    with engine.connect() as conn:
        result = conn.execute(query)
        return [dict(row._mapping) for row in result]


def carlisting():
    cars = []
    rows = fetch_cars_from_db()

    for row in rows:
        fuel_types = []
        if row["fuel_petrol"]:
            fuel_types.append("Petrol")
        if row["fuel_diesel"]:
            fuel_types.append("Diesel")
        if row["fuel_cng"]:
            fuel_types.append("CNG")
        if row["fuel_ev"]:
            fuel_types.append("EV")
        if row["fuel_hybrid"]:
            fuel_types.append("Hybrid")
        
        if row["transmission_manual"] and row["transmission_automatic"]:
            transmission = "Manual / Automatic"
        elif row["transmission_manual"]:
            transmission = "Manual"
        elif row["transmission_automatic"]:
            transmission = "Automatic"
        else:
            transmission = "Unknown"

        cars.append({
            "car_id": row["car_id"],
            "car_brand": row["car_brand"],
            "car_name": f"{row['car_name']}",
            "body_type": row["car_body_type"],
            "min_price": row["min_price"],
            "max_price": row["max_price"],
            "fuel_types": fuel_types,
            "description": row["description"],
            "img": row["img"],
            "link": row["web_link"],
            "seat": row["seat"],
            "transmission": transmission,
            "launch_year": row["model_year"],
            "milage": row["mileage"],
            "adas":row["adas"]
        })

    return cars

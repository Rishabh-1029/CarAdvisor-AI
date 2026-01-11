import pandas as pd

df = pd.read_excel(
    "/Users/rishabhsurana/Desktop/Rishabh/CarGo.com/CarAdvisor-AI/Backend/car_data.xlsx",
    header=0
)

df.columns = df.columns.str.strip().str.lower()
df = df.loc[:, ~df.columns.astype(str).str.contains("^unnamed", case=False)]

def carlisting():
    """
    Returns a clean list of cars for catalog browsing
    """
    cars = []

    for _, row in df.iterrows():
        fuel_types = []
        if row["fuel_petrol"] == 1:
            fuel_types.append("Petrol")
        if row["fuel_diesel"] == 1:
            fuel_types.append("Diesel")
        if row["fuel_cng"] == 1:
            fuel_types.append("CNG")
        if row["fuel_ev"] == 1:
            fuel_types.append("EV")
        if row["fuel_hybrid"] == 1:
            fuel_types.append("Hybrid")
        
        if row["transmission_manual"] == 1 and row["transmission_automatic"] == 1:
            transmission = "Manual / Automatic"
        elif row["transmission_manual"] == 1:
            transmission = "Manual"
        elif row["transmission_automatic"] == 1:
            transmission = "Automatic"
        else:
            transmission = "Unknown"

        

        cars.append({
            "car_id": row["car_id"],
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

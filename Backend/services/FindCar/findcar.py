from sklearn.neighbors import NearestNeighbors
import numpy as np
from services.FindCar.vector_store import df, vectors
from services.FindCar.filters import apply_hard_filters
from services.FindCar.user_vector import build_user_vector
from services.FindCar.formatters import get_fuel_type, get_transmission, format_price, get_usage_match, get_accuracy_label

from services.Expense.Aiforecast.fuelcost import calculate_fuel_cost_by_year
from services.Expense.Aiforecast.maintaincecost import calculate_maintaince_cost_forecast
from services.Expense.Aiforecast.insurancecost import calculate_insurance_cost_forecast
from services.Expense.Aiforecast.onroad import calculate_onroad_charges


def findcar(user):
    filtered_df = apply_hard_filters(df, user)

    if filtered_df.empty:
        return []

    filtered_idx = filtered_df.index.to_numpy()

    filtered_vectors = vectors[filtered_idx]

    user_vector = np.array([build_user_vector(user)])

    knn = NearestNeighbors(metric="cosine", algorithm="brute")
    knn.fit(filtered_vectors)

    distances, indices = knn.kneighbors(user_vector, n_neighbors=min(30, len(filtered_vectors)))

    results = []

    for local_idx, dist in zip(indices[0], distances[0]):
        real_idx = filtered_idx[local_idx]
        row = df.iloc[real_idx]

        similarity = (1 - dist) * 100

        results.append({
            "id": row["car_id"],
            "car_name": row["car_name"],
            "city": user["city"],
            "fuel": get_fuel_type(row),
            "price": format_price(row["min_price"], row["max_price"]),
            "mileage": f"{row['mileage']}",
            "seating": str(row["seat"]),
            "body_type": row["car_body_type"],
            "transmission": get_transmission(row),
            "accuracy": f"{similarity:.2f}%",
            "accuracy_label": get_accuracy_label(similarity),
            "city_use": bool(row["city_use"]),
            "highway_use": bool(row["highway_use"]),
            "commercial_use": bool(row["commercial"]),
            "link": row["web_link"],
            "img": row["img"],
            "description": row["description"],
            "adas": str(row["adas"]),
            "model_year" : row["model_year"],
            "fuel_cost_forcast": calculate_fuel_cost_by_year(row, user["usage"]),
            "maintaince_cost_forecast": calculate_maintaince_cost_forecast(row, user["usage"]),
            "insurance_cost_forecast": calculate_insurance_cost_forecast(row["min_price"], row["max_price"]),
            "onroad_charges": calculate_onroad_charges(row["min_price"], row["max_price"], get_fuel_type(row), user["city"])
        })

        if len(results) == 20:
            break

    return results

from sklearn.neighbors import NearestNeighbors
import numpy as np
from services.vector_store import df, vectors
from services.filters import apply_hard_filters
from services.user_vector import build_user_vector
from services.formatters import get_fuel_type, get_transmission, format_price

def findcar(user):
    filtered_df = apply_hard_filters(df, user)

    if filtered_df.empty:
        return []

    # get row indexes of surviving cars
    filtered_idx = filtered_df.index.to_numpy()

    # get only allowed vectors
    filtered_vectors = vectors[filtered_idx]

    # build user vector
    user_vector = np.array([build_user_vector(user)])

    # create temporary KNN on filtered space
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
            "mileage": f"{row['mileage']} km/l",
            "seating": str(row["seat"]),
            "body_type": row["car_body_type"],
            "transmission": get_transmission(row),
            "accuracy": f"{similarity:.2f}%",
            "link": row["web_link"],
            "img": row["img"],
        })

        if len(results) == 20:
            break

    return results

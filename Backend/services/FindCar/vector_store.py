import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors
from services.FindCar.filters import apply_hard_filters

# Load dataset
df = pd.read_excel(
    "/Users/rishabhsurana/Desktop/Rishabh/CarGo.com/CarAdvisor-AI/Backend/car_data.xlsx",
    header=0
)

# Normalize column names
df.columns = df.columns.str.strip().str.lower()

# Remove accidental index columns
df = df.loc[:, ~df.columns.astype(str).str.contains("^unnamed", case=False)]


print("COLUMNS:", df.columns.tolist())

REQUIRED_COLUMNS = [
    "transmission_manual", "transmission_automatic",
    "fuel_diesel", "fuel_petrol", "fuel_cng", "fuel_ev", "fuel_hybrid",
    "usage_low", "usage_medium", "usage_high",
    "seat", "city_use", "highway_use"
]

missing = [c for c in REQUIRED_COLUMNS if c not in df.columns]
assert not missing, f"Missing required columns: {missing}"



def seat_one_hot(seat):
    seat = int(seat)
    return {
        "seat_4": 1 if seat == 4 else 0,
        "seat_5": 1 if seat == 5 else 0,
        "seat_7": 1 if seat == 7 else 0,
    }

VECTOR_COLUMNS = [
    "fuel_petrol",
    "fuel_diesel",
    "fuel_cng",
    "fuel_ev",
    "fuel_hybrid",
    "transmission_manual",
    "transmission_automatic",
    "usage_low",
    "usage_medium",
    "usage_high",
    "city_use",
    "highway_use",
    "seat_4",
    "seat_5",
    "seat_7",
]

vectors = []

for _, row in df.iterrows():
    seat_vec = seat_one_hot(row["seat"])

    vector = [
        row["fuel_petrol"],
        row["fuel_diesel"],
        row["fuel_cng"],
        row["fuel_ev"],
        row["fuel_hybrid"],
        row["transmission_manual"],
        row["transmission_automatic"],
        row["usage_low"],
        row["usage_medium"],
        row["usage_high"],
        row["city_use"],
        row["highway_use"],
        seat_vec["seat_4"],
        seat_vec["seat_5"],
        seat_vec["seat_7"],
    ]

    vectors.append(vector)

X = np.array(vectors, dtype=np.float32)
assert X.ndim == 2 and X.shape[0] > 0

knn = NearestNeighbors(metric="cosine", algorithm="brute")
knn.fit(X)

vectors = X         
df = df
CAR_IDS = df["car_id"].values


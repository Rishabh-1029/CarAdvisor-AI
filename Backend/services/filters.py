def apply_hard_filters(df, user):
    # ---------- Budget ----------
    if user["budget"] == "Above":
        df = df[df["max_price"] >= 2000000]
    else:
        max_budget = int(user["budget"])
        df = df[df["min_price"] <= max_budget]

    # ---------- Seating ----------
    df = df[df["seat"] >= int(user["seats"])]

    # ---------- Fuel (Strict) ----------
    FUEL_MAP = {
        "petrol": "fuel_petrol",
        "diesel": "fuel_diesel",
        "ev": "fuel_ev",
        "electric": "fuel_ev",
        "cng": "fuel_cng",
        "hybrid": "fuel_hybrid"
    }

    if not user["fuelFlexibility"]:
        fuel_key = user["fuelType"].lower()
        fuel_col = FUEL_MAP.get(fuel_key)

        if fuel_col is None:
            raise ValueError(f"Unsupported fuel type: {user['fuelType']}")

        df = df[df[fuel_col] == 1]

    # ---------- Transmission (Strict) ----------
    TRANS_MAP = {
        "manual": "transmission_manual",
        "automatic": "transmission_automatic"
    }

    if not user["transmissionFlexibility"]:
        trans_key = user["transmission"].lower()
        trans_col = TRANS_MAP.get(trans_key)

        if trans_col is None:
            raise ValueError(f"Unsupported transmission: {user['transmission']}")

        df = df[df[trans_col] == 1]

    return df

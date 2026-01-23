def calculate_onroad_charges(min_price, max_price, fuel_types, city):
    STATE_MAP = {
        "Delhi": "Delhi",
        "Mumbai": "Maharashtra",
        "Pune": "Maharashtra",
        "Bengaluru": "Karnataka"
    }

    ROAD_TAX = {
        "Delhi": {
            "Petrol": 0.10,
            "Diesel": 0.12,
            "CNG": 0.08,
            "Hybrid": 0.10,
            "Electric": 0.00
        },
        "Maharashtra": {
            "Petrol": 0.11,
            "Diesel": 0.13,
            "CNG": 0.09,
            "Electric": 0.01
        }
    }

    FIXED_CHARGES = {
        "registration": 1500,
        "fastag": 600,
        "other_charges": 1500
    }

    state = STATE_MAP.get(city, "Delhi")

    min_tcs = (0.01) * min_price if (min_price >= 1000000) else 0
    max_tcs = (0.01) * max_price if (max_price >= 1000000) else 0
    results = {}

    for fuel in fuel_types:
        tax_rate = ROAD_TAX.get(state, {}).get(fuel, 0.10)

        def compute(price):
            road_tax = int(price * tax_rate)
            tcs = 0 if price < 1000000 else (0.01) * price
            total = (
                road_tax +
                FIXED_CHARGES["registration"] +
                FIXED_CHARGES["fastag"] +
                FIXED_CHARGES["other_charges"] + tcs
            )
            return {
                "road_tax": road_tax,
                "registration": FIXED_CHARGES["registration"],
                "fastag": FIXED_CHARGES["fastag"],
                "other_charges": FIXED_CHARGES["other_charges"],
                "total_extra_charges": total,
                "min_tcs": min_tcs,
                "max_tcs": max_tcs
            }

        results[fuel] = {
            "min_price_band": compute(min_price),
            "max_price_band": compute(max_price)
        }

    return results

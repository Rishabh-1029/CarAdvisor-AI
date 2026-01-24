def calculate_onroad_charges(min_price, max_price, fuel_types, city):
    STATE_MAP = {
        "Delhi": "Delhi",
        "Mumbai": "Maharashtra",
        "Chennai": "Tamil Nadu",
        "Bangalore": "Karnataka"
    }

    def get_road_tax_rate(state, fuel_type, ex_showroom_price):

        price_lakhs = ex_showroom_price / 100000.0

        if state == "Delhi":
            if fuel_type == "Electric":
                return 0.00 
            if price_lakhs <= 6:
                return 0.04 if fuel_type == "Petrol" or fuel_type == "CNG" or fuel_type == "Hybrid" else 0.05
            elif 6 < price_lakhs <= 10:
                return 0.07 if fuel_type == "Petrol" or fuel_type == "CNG" or fuel_type == "Hybrid" else 0.0875
            else:
                return 0.10 if fuel_type == "Petrol" or fuel_type == "CNG" or fuel_type == "Hybrid" else 0.125

        elif state == "Maharashtra":
            if fuel_type == "Electric":
                return 0.01 
            if price_lakhs <= 10:
                if fuel_type == "CNG": return 0.07
                return 0.11 if fuel_type == "Petrol" or fuel_type == "Hybrid" else 0.13
            elif 10 < price_lakhs <= 20:
                if fuel_type == "CNG": return 0.08
                return 0.12 if fuel_type == "Petrol" or fuel_type == "Hybrid" else 0.14
            else:
                if fuel_type == "CNG": return 0.09
                return 0.13 if fuel_type == "Petrol" or fuel_type == "Hybrid" else 0.15
                
        elif state == "Tamil Nadu":
            if fuel_type == "Electric":
                return 0.00 
            if price_lakhs <= 5:
                return 0.12
            elif 5 < price_lakhs <= 10:
                return 0.13
            elif 10 < price_lakhs <= 20:
                return 0.18
            else:
                return 0.20

        elif state == "Karnataka":
            if fuel_type == "Electric":
                return 0.00
            if price_lakhs <= 5:
                return 0.13
            elif 5 < price_lakhs <= 10:
                return 0.14
            elif 10 < price_lakhs <= 20:
                return 0.17
            else:
                return 0.18

        return 0.0



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
        def compute(price):
            tax_rate = get_road_tax_rate(state, fuel, price)
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

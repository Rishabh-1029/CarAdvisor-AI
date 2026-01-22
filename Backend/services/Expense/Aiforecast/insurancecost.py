insurance_rate = 0.028  

depreciation = {
        "year1": 1.0,
        "year2": 0.9,
        "year3": 0.8
    }


def calculate_insurance_cost_forecast(min_price, max_price):

    forecast = {}
    total_min = 0
    total_max = 0

    for year, factor in depreciation.items():
        min_cost = min_price * insurance_rate * factor
        max_cost = max_price * insurance_rate * factor

        min_cost = int(round(min_cost, -2))
        max_cost = int(round(max_cost, -2))

        forecast[year] = {
            "min": min_cost,
            "max": max_cost
        }

        total_min += min_cost
        total_max += max_cost

    forecast["total_3yr"] = {
        "min": int(round(total_min, -2)),
        "max": int(round(total_max, -2))
    }

    return forecast

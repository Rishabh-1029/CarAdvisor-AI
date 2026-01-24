insurance_rate = 0.028  
def get_insurance_rate(price):
    rate = 0.0
    if(price <= 700000):
        rate = 0.04
    elif(price > 700000 and price <= 1600000):
        rate = 0.038
    elif(price > 1600000 and price <= 3500000):
        rate = 0.028
    else:
        rate = 0.024
    
    # if ev: 
    #     rate -= 0.005
    
    return rate
    
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
        min_cost = min_price * get_insurance_rate(min_price) * factor
        max_cost = max_price * get_insurance_rate(max_price) * factor

        min_cost += 0.18 * min_cost
        max_cost += 0.18 * max_cost

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

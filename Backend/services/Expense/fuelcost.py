from services.FindCar.formatters import get_fuel_type

ANNUAL_KM = {"Low":8000, "Mid":12000, "High": 18000}

def get_fuel_prices(city=None):
    return {
        "Petrol": 105.0,     
        "Diesel": 92.0,
        "CNG": 75.0,
        "Electric": 8.0     
    }

def calculate_fuel_cost_by_year(row, user_usage):
    annual_km = ANNUAL_KM.get(user_usage, 12000)
    fuel_prices = get_fuel_prices()
    fuels = get_fuel_type(row)

    fuel_costs = {}

    for fuel in fuels:
        price = fuel_prices.get(fuel)
        mileage = row.get("mileage")

        if not price or not mileage:
            continue

        cost_per_km = price / mileage

        yearly_cost = annual_km * cost_per_km

        fuel_costs[fuel] = {
            "year1": round(yearly_cost, -2),
            "year2": round(yearly_cost, -2),
            "year3": round(yearly_cost, -2),
            "total_3yr": round(yearly_cost * 3, -2),
        }

    return fuel_costs


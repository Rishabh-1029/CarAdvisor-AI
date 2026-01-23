from services.FindCar.formatters import get_fuel_type

ANNUAL_KM = {"Low":8000, "Mid":12000, "High": 18000}

def get_fuel_prices(city):
    city=city.lower()
    if city == "delhi":
        return {
            "Petrol": 94.77,     
            "Diesel": 87.67,
            "CNG": 77.09,
            "Electric": 4.50     
        }
    if city == "mumbai":
        return {
            "Petrol": 104.21,     
            "Diesel": 92.15,
            "CNG": 92.43,
            "Electric": 18.94     
        }
    if city == "chennai":
        return {
            "Petrol": 100.90,     
            "Diesel": 87.67,
            "CNG": 92.43,
            "Electric": 20.0     
        }
    if city == "bangalore":
        return {
            "Petrol": 99.84,     
            "Diesel": 85.93,
            "CNG": 89.50,
            "Electric": 7.51     
        }

def calculate_fuel_cost_by_year(row, user_usage, city):
    annual_km = ANNUAL_KM.get(user_usage, 12000)
    fuel_prices = get_fuel_prices(city)
    fuels = get_fuel_type(row)

    fuel_costs = {}

    for fuel in fuels:
        price = fuel_prices.get(fuel)
        mileage = row.get("mileage")

        if not price or not mileage:
            continue

        cost_per_km = price / mileage

        yearly_cost_year1 = annual_km * cost_per_km
        yearly_cost_year2 = yearly_cost_year1 + (0.06 * yearly_cost_year1)
        yearly_cost_year3 = yearly_cost_year2 + (0.06 * yearly_cost_year2)
        total_3_year = yearly_cost_year3 + yearly_cost_year2 + yearly_cost_year1

        fuel_costs[fuel] = {
            "year1": round(yearly_cost_year1, -2),
            "year2": round(yearly_cost_year2, -2),
            "year3": round(yearly_cost_year3, -2),
            "total_3yr": round(total_3_year, -2),
            "today_cost": price,
        }

    return fuel_costs


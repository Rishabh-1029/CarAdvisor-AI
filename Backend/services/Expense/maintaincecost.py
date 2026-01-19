from services.FindCar.formatters import get_fuel_type

SERVICES_PER_YEAR = {
    "Low": 1,
    "Mid": 1,
    "High": 2
}

SERVICE_COST = {
    "Petrol": 4000,
    "Diesel": 5500,
    "CNG": 4500,
    "Electric": 2000,
    "Hybrid": 6000
}

MISC_COST_PER_YEAR = {
    "Petrol": 2000,
    "Diesel": 2500,
    "CNG": 2200,
    "Electric": 1000,
    "Hybrid": 3000
}


def calculate_maintaince_cost_forecast(row, user_usage):

    fuels = get_fuel_type(row)
    usage = user_usage

    services_per_year = SERVICES_PER_YEAR.get(usage, 1)

    # pick the highest-cost fuel (safe, conservative)
    service_cost = max(SERVICE_COST.get(fuel, 4000) for fuel in fuels)
    misc_cost = max(MISC_COST_PER_YEAR.get(fuel, 2000) for fuel in fuels)

    breakup = {}
    total_3yr = 0

    for year in range(1, 4):
        yearly_service_cost = service_cost * services_per_year
        yearly_misc_cost = misc_cost
        yearly_total = yearly_service_cost + yearly_misc_cost

        breakup[f"year{year}"] = {
            "services": services_per_year,
            "service_cost": yearly_service_cost,
            "misc_cost": yearly_misc_cost,
            "total": yearly_total
        }

        total_3yr += yearly_total

    breakup["total_3yr"] = round(total_3yr, -2)

    return breakup


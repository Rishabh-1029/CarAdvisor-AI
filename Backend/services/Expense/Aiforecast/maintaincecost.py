from services.FindCar.formatters import get_fuel_type

MAINTENANCE_TABLE = {
    "Petrol": {
        "Hatchback": {
            1: {"service": 3450.00, "misc": 950.00},  
            2: {"service": 5850.00, "misc": 1850.00}, 
            3: {"service": 6250.00, "misc": 3200.00}, 
        },
        "SUV": {
            1: {"service": 4450.00, "misc": 1450.00},
            2: {"service": 7450.00, "misc": 2450.00}, 
            3: {"service": 8450.00, "misc": 3850.00},
        },
        "Sedan": {
            1: {"service": 4150.00, "misc": 1150.00},
            2: {"service": 7150.00, "misc": 2150.00},
            3: {"service": 8150.00, "misc": 3750.00},
        }
    },
    "Diesel": {
        "Hatchback": {
            1: {"service": 4750.00, "misc": 1150.00}, 
            2: {"service": 8150.00, "misc": 2450.00},
            3: {"service": 8750.00, "misc": 4450.00}, 
        },
        "SUV": {
            1: {"service": 5750.00, "misc": 1750.00},
            2: {"service": 9450.00, "misc": 3450.00},
            3: {"service": 10450.00, "misc": 5450.00},
        },
        "Sedan": {
            1: {"service": 5350.00, "misc": 1450.00},
            2: {"service": 8850.00, "misc": 2950.00},
            3: {"service": 9750.00, "misc": 4950.00},
        }
    },
    "Ev": {
        "Hatchback": {
            1: {"service": 1150.00, "misc": 950.00},  
            2: {"service": 2950.00, "misc": 1450.00}, 
            3: {"service": 3150.00, "misc": 2450.00},
        },
        "SUV": {
            1: {"service": 1750.00, "misc": 1450.00},
            2: {"service": 3750.00, "misc": 1950.00},
            3: {"service": 3950.00, "misc": 2950.00},
        },
        "Sedan": {
            1: {"service": 1450.00, "misc": 1150.00},
            2: {"service": 3450.00, "misc": 1750.00},
            3: {"service": 3750.00, "misc": 2750.00},
        }
    },
    "cng": {
        "Hatchback": {
            1: {"service": 3750.00, "misc": 1450.00},
            2: {"service": 6450.00, "misc": 2450.00},
            3: {"service": 6950.00, "misc": 3950.00},
        },
        "SUV": {
            1: {"service": 4750.00, "misc": 1950.00},
            2: {"service": 7950.00, "misc": 2950.00},
            3: {"service": 8950.00, "misc": 4450.00},
        },
        "Sedan": {
            1: {"service": 4450.00, "misc": 1750.00},
            2: {"service": 7450.00, "misc": 2750.00},
            3: {"service": 8450.00, "misc": 4150.00},
        }
    }
}

services = {"Low": 1, "Mid": 1, "High":2}

def calculate_maintaince_cost_forecast(row, usage, body_type, years=3):

    fuels = get_fuel_type(row)

    breakup = {}
    total_cost = 0

    # pick the most expensive fuel conservatively
    fuel = max(
        fuels,
        key=lambda f: max(
            MAINTENANCE_TABLE.get(f, {}).get(body_type, {}).keys(),
            default=0
        )
    )

    fuel_data = MAINTENANCE_TABLE.get(fuel, {})
    body_data = fuel_data.get(body_type)

    if not body_data:
        return {"error": "Maintenance data not available"}

    max_year = max(body_data.keys())

    for year in range(1, years + 1):
        lookup_year = year if year <= max_year else max_year

        year_data = body_data[lookup_year]

        service_cost = year_data["service"] * services[usage]
        misc_cost = year_data["misc"]
        yearly_total = service_cost + misc_cost
        
        breakup[f"year{year}"] = {
            "service_cost": service_cost,
            "misc_cost": misc_cost,
            "total": yearly_total,
            "services": services[usage]
        }

        total_cost += yearly_total

    breakup[f"total_{years}yr"] = round(total_cost, -2)

    return breakup

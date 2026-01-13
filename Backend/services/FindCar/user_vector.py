def build_user_vector(user):
    fuel_map = {
        "petrol": [1, 0, 0, 0, 0],
        "diesel": [0, 1, 0, 0, 0],
        "cng": [0, 0, 1, 0, 0],
        "ev": [0, 0, 0, 1, 0],
        "hybrid": [0, 0, 0, 0, 1],
    }

    transmission_map = {
        "manual": [1, 0],
        "automatic": [0, 1],
    }

    usage_map = {
        "Low": [1, 0, 0],
        "Mid": [0, 1, 0],
        "High": [0, 0, 1],
    }

    seat_map = {
        "4": [1, 0, 0],
        "5": [0, 1, 0],
        "7": [0, 0, 1],
    }

    city_vector = [1, 0]

    return [
        *fuel_map[user["fuelType"]],
        *transmission_map[user["transmission"]],
        *usage_map[user["usage"]],
        *city_vector,
        *seat_map[user["seats"]],
    ]

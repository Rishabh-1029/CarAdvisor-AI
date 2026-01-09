def get_fuel_type(row):
    if row["fuel_petrol"] == 1:
        return "Petrol"
    if row["fuel_diesel"] == 1:
        return "Diesel"
    if row["fuel_cng"] == 1:
        return "CNG"
    if row["fuel_ev"] == 1:
        return "Electric"
    if row["fuel_hybrid"] == 1:
        return "Hybrid"
    return "Unknown"


def get_transmission(row):
    if row["transmission_automatic"] == 1 and row["transmission_manual"] == 1:
        return "Manual / Automatic"
    if row["transmission_automatic"] == 1:
        return "Automatic"
    if row["transmission_manual"] == 1:
        return "Manual"
    return "Unknown"


def format_price(min_price, max_price):
    if min_price == max_price:
        return f"₹{int(min_price):,}"
    return f"₹{int(min_price):,} - ₹{int(max_price):,}"

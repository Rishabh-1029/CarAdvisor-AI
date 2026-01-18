def get_fuel_type(row):
    fuels = []

    if row["fuel_petrol"]:
        fuels.append("Petrol")
    if row["fuel_diesel"]:
        fuels.append("Diesel")
    if row["fuel_cng"]:
        fuels.append("CNG")
    if row["fuel_ev"]:
        fuels.append("Electric")
    if row["fuel_hybrid"]:
        fuels.append("Hybrid")

    return fuels



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

def get_usage_match(row, user_usage):
    if user_usage == "Low":
        return bool(row["usage_low"])
    if user_usage == "Mid":
        return bool(row["usage_medium"])
    if user_usage == "High":
        return bool(row["usage_high"])
    return False

def get_accuracy_label(similarity):
    if similarity >= 75:
        return "Strong Match"
    elif similarity >= 60:
        return "Good Match"
    return "Partial Match"


from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
import random

router = APIRouter()


class FuelRequest(BaseModel):
    city: str
    fuelType: str


BASE_FUEL_PRICE = {
    "Delhi": {"petrol": 96.72, "diesel": 89.62, "ev": 6.5},
    "Mumbai": {"petrol": 106.31, "diesel": 94.27, "ev": 7.2},
    "Bangalore": {"petrol": 101.94, "diesel": 87.89, "ev": 6.8},
    "Chennai": {"petrol": 102.63, "diesel": 94.24, "ev": 6.9},
}


def forecast_next_12_months(current_price: float):
    forecast = []
    today = datetime.now().replace(day=1)

    monthly_growth_rate = random.uniform(0.4, 1.2) / 100

    forecast.append({
        "month": today.strftime("%b %Y"),
        "price": round(current_price, 2),
        "delta": 0,
        "delta_pct": 0,
        "low": round(current_price * 0.995, 2),
        "high": round(current_price * 1.005, 2),
        "type": "current"
    })

    prev_price = current_price
    price = current_price

    for _ in range(11):
        price = round(price * (1 + monthly_growth_rate), 2)

        today = today.replace(
            year=today.year + (today.month // 12),
            month=(today.month % 12) + 1
        )

        delta = round(price - prev_price, 2)
        delta_pct = round((delta / prev_price) * 100, 2)

        forecast.append({
            "month": today.strftime("%b %Y"),
            "price": price,
            "delta": delta,
            "delta_pct": delta_pct,
            "low": round(price * 0.995, 2),
            "high": round(price * 1.005, 2),
            "type": "forecast"
        })

        prev_price = price

    start_price = forecast[0]["price"]
    end_price = forecast[-1]["price"]

    percentage_change = round(((end_price - start_price) / start_price) * 100, 2)

    if percentage_change > 0:
        if percentage_change < 3:
            trend = f"Gradual increase expected (~{percentage_change}%)"
        else:
            trend = f"Noticeable increase expected (~{percentage_change}%)"
    elif percentage_change < 0:
        trend = f"Slight decline expected (~{abs(percentage_change)}%)"
    else:
        trend = "Prices expected to remain stable"


    summary = {
        "absolute_increase": round(end_price - start_price, 2),
        "percentage_increase": round(
            ((end_price - start_price) / start_price) * 100, 2
        ),
        "trend": trend
    }

    return {
        "forecast": forecast,
        "summary": summary,
    }

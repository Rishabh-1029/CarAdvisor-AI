from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.FindCar.findcar import findcar
from services.CarList.carlisting import carlisting
from services.Expense.expenseuser import forecast_next_12_months
from services.Expense.Aiforecast.fuelcost import get_fuel_prices

from services.Emi.emi import generate_emi_report


from typing import List

app = FastAPI()

origins = [
    "http://localhost:5173",  "https://truedrive.netlify.app"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Car(BaseModel):
    id: int
    car_name: str
    city: str
    fuel: str
    price: str
    link: str
class CarRequest(BaseModel):
    city: str
    budget: str
    fuelType: str
    fuelFlexibility: bool
    seats: str
    usage: str
    transmission: str
    transmissionFlexibility: bool


class CarResponse(BaseModel):
    status: str
    count: int
    cars: List[Car]

class fuel_cost(BaseModel):
    year: str
    cost: str

class FuelRequest(BaseModel):
    city: str
    fuelType: str

class EmiRequest(BaseModel):
    loan_amount: float
    rate: float                 
    duration: int
    downPay: float          
    include_yearly: bool = True


class ExpenseUserResponse(BaseModel):
    status: str
    count: int
    fuel_cost: List[fuel_cost]

# Car Recommendation
@app.post("/process-car-data")
async def process_car_data(data: CarRequest):
    # Convert to dict
    car_data = data.dict()
    cars = findcar(car_data)

    return {"status": "success", "count": len(cars), "cars": cars}

# Car listing
@app.get("/car-listing")
async def car_listing():
    cars = carlisting()
    return {
        "status": "success",
        "count": len(cars),
        "cars": cars
    }

@app.post("/emi")
async def emi(data: EmiRequest):

    principal_amount = data.loan_amount - (data.loan_amount * (data.downPay/100))

    if principal_amount <= 0:
        return {
            "status": "error",
            "message": "Down payment must be less than loan amount"
        }

    report = generate_emi_report(
        loan_amount=principal_amount,
        annual_interest_rate=data.rate,
        tenure_years=data.duration,
        include_yearly=data.include_yearly
    )

    # Add metadata for frontend
    report["original_price"] = data.loan_amount
    report["down_payment"] = data.loan_amount * (data.downPay/100)
    report["principal"] = principal_amount
    report["down_payment_percent"] = data.downPay

    return {
        "status": "success",
        "emi_report": report
    }


# Fuel Expense user by City
@app.post("/fuel-cost")
async def get_fuel_cost(data: FuelRequest):
    city = data.city
    fuel_type = data.fuelType.lower()

    # Map fuel_type from frontend to scraper keys
    fuel_mapping = {"petrol": "Petrol", "diesel": "Diesel", "ev": "Electric", "cng": "CNG"}
    target_fuel = fuel_mapping.get(fuel_type)

    live_prices = get_fuel_prices(city)
    
    if not live_prices or target_fuel not in live_prices:
        return {"error": "City or fuel type not supported"}

    current_cost = live_prices[target_fuel]

    forecast_data = forecast_next_12_months(current_cost)

    return {
        "city": city,
        "fuel_type": fuel_type,
        "fuel_cost": {
            "current_price": current_cost,
            "currency": "INR",
            "unit": "₹/L" if fuel_type != "ev" else "₹/kWh",
            "forecast": forecast_data["forecast"],
            "summary": forecast_data["summary"],
        }
    }

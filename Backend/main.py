from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.FindCar.findcar import findcar
from services.CarList.carlisting import carlisting
from services.Expense.expenseuser import expenseuser

from typing import List

app = FastAPI()

origins = [
    "http://localhost:5173",  
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

class ExpenseUser(BaseModel):
    city: str
    fuelType: str
    years: str

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

# Fuel Expense user by City
@app.post("/expense-user")
async def process_expense_user_data(data: ExpenseUser):
    # Convert to dict
    expense_user_data = data.dict()
    fuel_cost = expenseuser(expense_user_data)

    return {"status": "success", "count": len(fuel_cost), "fuel_cost": fuel_cost}

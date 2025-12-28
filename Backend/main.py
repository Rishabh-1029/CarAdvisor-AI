from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.findcar import findcar
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

class CarResponse(BaseModel):
    status: str
    count: int
    cars: List[Car]

@app.post("/process-car-data")
async def process_car_data(data: CarRequest):
    # Convert to dict
    car_data = data.dict()
    cars = findcar(car_data)

    

    return {"status": "success", "count": len(cars), "cars": cars}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

class CarRequest(BaseModel):
    city: str
    budget: str
    fuelType: str
    fuelFlexibility: bool
    seats: str
    usage: str

# Endpoint to process the data
@app.post("/process-car-data")
async def process_car_data(data: CarRequest):
    # Convert to dict
    car_data = data.dict()

    processed_data = {
        "city": car_data["city"],
        "budget": car_data["budget"],
        "fuelType": car_data["fuelType"],
        "fuelFlexibility": car_data["fuelFlexibility"],
        "seats": car_data["seats"],
        "usage": car_data["usage"],
    }

    return {"status": "success", "data": processed_data}

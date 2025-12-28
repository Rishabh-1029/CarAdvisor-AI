def findcar(car_data: dict):
    city = car_data["city"]
    fuel_pref = car_data["fuelType"]

    cars = [
        {
            "id": 1,
            "car_name": "Volvo XC90",
            "city": city,
            "fuel": "Petrol",
            "price": "₹96,97,240",
            "mileage": "13 - 17 km/l",
            "seating": "7",
            "body_type": "SUV",
            "transmission": "Automatic",
            "accuracy": "86.02%",
            "link": "https://www.volvocars.com/in/cars/xc90/",
            "img": "https://wizz.volvocars.com/images/2026/256/exterior/studio/front/exterior-studio-front_A72886FCC0B78E67CFFE35B3034035DF3A3A6666.png?client=carousel&w=1080"
        },
        {
            "id": 2,
            "car_name": "BMW X5",
            "city": city,
            "fuel": "Petrol",
            "price": "₹93,60,000",
            "mileage": "12 km/l",
            "seating": "5",
            "body_type": "SUV",
            "transmission": "Automatic",
            "accuracy": "82.48%",
            "link":"https://www.bmw.in/en/all-models/x-series/x5/bmw-x5.html",
            "img": "https://bmw.scene7.com/is/image/BMW/g05_Layout_Carousel_exterior_highlights_headlights:3to2?fmt=webp&wid=2560&hei=1707"
        }
    ]

    return cars

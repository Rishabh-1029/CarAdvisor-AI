# Car Recommendation System

Car Recommendation System is a machine learning-based web system that helps users choose the right car based on their preferences and predicts future expenses using regression models.

---

## Features

- Car Recommendation System

  - Takes user preferences like City, budget, fuel type, seating capacity, and Average use.
  - Filters and recommends suitable cars from a structured dataset

- Fuel Price Prediction Model

  - Predicts fuel prices for the next 10 years using regression techniques
  - Uses historical fuel price data and time series trends

- Descriptive Car Output

  - Returns a report for user recommending best cars with key details such as Model, Price Range, Mileage, Launch Year, and more
  - Image and link of the car included for better experience

- User Input from Frontend
  - Designed to take input from a ReactJS-based frontend
  - Input values are passed to Python backend via FastAPI for processing.

---

## Dataset Description

- Car dataset includes columns like:
  - `Brand`, `Model`, `Start_Price`, `Max_Price`, `Fuel_Type`, `Body_Type`, `Transmission`, `Seating_Capacity`, `Engine`, `Mileage`, `Fuel_Tank`, `Launch`, `Image_URL`, `Car_Link`, `Description`

---

## Tech Stack

- Frontend
  - HTML
  - CSS
  - JavaScript
  - ReactJS
- Backend
  - Python
  - FastAPI
  - Data handling – Pandas, NumPy
  - ML models for filtering and prediction - Content based filtering using KNN.

---

## Input

The system accepts the following inputs from the user:

- City: Location of the user
- Budget: Price range user wants to consider
- Fuel Type: Petrol, Diesel, Electric, CNG.
- Seating Capacity: Number of seats required (e.g., 4, 5, 7)
- Average Use: Expected average usage (e.g., kilometers driven per month)

## Output

Based on the inputs processed by the model, the system displays:

- Recommended car(s) that best match user preferences
- Estimated future expenses related to the recommended car(s)

---

> Under Development - UI and Backend Revamping.

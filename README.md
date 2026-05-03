# TrueDrive - Car Recommendation System

The **Car Recommendation & Expense Intelligence System** is a data-driven web application designed to assist users in making informed car-buying decisions. It combines preference-based car recommendations with predictive expense analysis, delivering structured and explainable insights through a modern web interface.

The system is built with scalability and performance in mind, using a React-based frontend and a FastAPI-powered backend.

---

## Features

### Intelligent Car Recommendation

- Accepts user preferences such as **city, budget, fuel type, seating capacity, and usage pattern**
- Applies structured filtering and similarity-based ranking on a curated car dataset
- Returns a list of cars that best match user constraints and priorities

### Fuel Cost & Expense Forecasting

- Predicts long-term fuel price trends using ml models based on historic data
- Integrates a live web scraper to fetch real-time daily fuel prices (Petrol, Diesel, CNG) by city, utilizing a 24-hour intelligent cache to optimize performance
- Estimates future running costs based on location, fuel type, and expected usage, including a 6% Year-over-Year (YoY) inflation projection
- Designed to minimize recomputation using pre-processed data and graceful static fallbacks

### Detailed Recommendation Report

- Generates a comprehensive and structured report for each recommended car
- Includes:
  - Model- and variant-level details
  - Price range with realistic on-road cost estimation
  - Detailed expense forecasting, including:
    - Fuel cost projections based on usage patterns
    - Maintenance and service expenses
    - Insurance cost estimates
    - Total cost of ownership projection for up to 3 years
  - Mileage, engine, and performance specifications
  - Launch year and segment classification
  - Car images and official manufacturer reference links
- Supports high-resolution **PDF exports** of the entire report for offline viewing and sharing

### EMI Calculation & Loan Analysis

- Provides EMI estimation with two access modes:
  - EMI calculation of selected car from the recommendation report
  - Standalone calculator for manual input
- Computes monthly EMI along with:
  - Principal–Interest breakup
  - Remaining loan balance across the loan tenure
- Visualizes loan balance reduction over time to help users understand loan repayment structure.

### Car Listing & Exploration

- Displays a comprehensive list of available cars with essential specifications and pricing details.
- Allows users to explore and narrow down options using filter-based selection
- Enables quick discovery of cars outside the AI recommendation flow

---

## Dataset Overview

The system uses a structured dataset containing attributes such as:

- `Brand`, `Model`
- `Start_Price`, `Max_Price`
- `Fuel_Type`, `Engine`, `Mileage`
- `Seating_Capacity`, `Body_Type`, `Transmission`
- `Launch_Year`, `Image_URL`, `Car_Link`
- `Description`, `Usage`

> Database: PostgreSQL with file-based data support

---

## Technology Stack

### Frontend

- React
- JavaScript
- HTML
- CSS
- Recharts
- html2pdf.js

### Backend

- Python
- FastAPI
- Uvicorn
- Pandas
- NumPy
- Scikit-learn
- BeautifulSoup4
- Requests
- PostgreSQL

---

## User Inputs for AI Recommendations

The application accepts the following inputs:

- **City** – User location for regional cost estimation
- **Budget (₹)** – Preferred price range
- **Fuel Type** – Petrol, Diesel, Electric, CNG
- **Seating Capacity** – Required number of seats
- **Average Usage** – Estimated monthly driving distance
- **Transmission Type** – Preferred transmission type

---

## System Output

Based on the provided inputs, the system generates:

- A list of recommended cars
- A structured report for each car
- Estimated long-term fuel and ownership expenses

---

## Project Status

> **Active Development**  
> UI refinement, backend optimization, database integration, and performance improvements are ongoing.

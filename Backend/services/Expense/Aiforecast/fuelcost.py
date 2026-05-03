import time
import requests
from bs4 import BeautifulSoup

from services.FindCar.formatters import get_fuel_type

ANNUAL_KM = {"Low":8000, "Mid":12000, "High": 18000}

_fuel_price_cache = {}
_last_update_time = 0
CACHE_TTL = 86400 

def get_static_prices(city):
    city=city.lower()
    if city == "delhi":
        return {
            "Petrol": 94.72,     
            "Diesel": 87.62,     
            "CNG": 77.09,        
            "Electric": 4.50      
        }
    if city == "mumbai":
        return {
            "Petrol": 104.21,    
            "Diesel": 92.15,     
            "CNG": 77.00,        
            "Electric": 5.89      
        }
    if city == "chennai":
        return {
            "Petrol": 100.85,    
            "Diesel": 92.38,     
            "CNG": 91.50,        
            "Electric": 4.50     
        }
    if city == "bangalore":
        return {
            "Petrol": 99.84,     
            "Diesel": 90.98,     
            "CNG": 89.50,        
            "Electric": 4.75      
        }
    return {}

def scrape_fuel_type(fuel_url, target_city):
    try:
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
        response = requests.get(fuel_url, headers=headers, timeout=5)
        if response.status_code != 200:
            return None
            
        soup = BeautifulSoup(response.text, 'html.parser')
        table = soup.find('table')
        if not table:
            return None
            
        rows = table.find_all('tr')
        target_city_lower = target_city.lower()
        
        # Mapping to match GoodReturns table name
        if target_city_lower == "delhi":
            target_city_lower = "new delhi"
            
        for row in rows:
            cols = row.find_all('td')
            if len(cols) >= 2:
                city_name = cols[0].get_text(strip=True).lower()
                if city_name == target_city_lower:
                    price_text = cols[1].get_text(strip=True)
                    price_text = price_text.replace("₹", "").replace(",", "").strip()
                    return float(price_text)
    except Exception as e:
        print(f"Error scraping {fuel_url}: {e}")
    return None

def fetch_live_prices(city):
    urls = {
        "Petrol": "https://www.goodreturns.in/petrol-price.html",
        "Diesel": "https://www.goodreturns.in/diesel-price.html",
        "CNG": "https://www.goodreturns.in/cng-price.html"
    }
    
    live_prices = {}
    for fuel, url in urls.items():
        price = scrape_fuel_type(url, city)
        if price:
            live_prices[fuel] = price
            
    # Fallback to static for Electric and any failed scrapes
    static_prices = get_static_prices(city)
    live_prices["Electric"] = static_prices.get("Electric", 4.50)
    
    for fuel in ["Petrol", "Diesel", "CNG"]:
        if fuel not in live_prices:
            live_prices[fuel] = static_prices.get(fuel)
            
    return live_prices

def get_fuel_prices(city):
    global _fuel_price_cache, _last_update_time
    
    city = city.lower()
    current_time = time.time()
    
    if (current_time - _last_update_time) > CACHE_TTL or city not in _fuel_price_cache:
        try:
            live_data = fetch_live_prices(city)
            if live_data:
                _fuel_price_cache[city] = live_data
                _last_update_time = current_time
        except Exception as e:
            print(f"Failed to fetch live prices, falling back: {e}")
            
    if city in _fuel_price_cache:
        return _fuel_price_cache[city]
    return get_static_prices(city)

def calculate_fuel_cost_by_year(row, user_usage, city):
    annual_km = ANNUAL_KM.get(user_usage, 12000)
    fuel_prices = get_fuel_prices(city)
    fuels = get_fuel_type(row)

    fuel_costs = {}

    for fuel in fuels:
        price = fuel_prices.get(fuel)

        if fuel == "Electric":
            cost_per_km = price / 7.42 
        else:
            mileage = row.get("mileage")

            if not price or not mileage:
                continue

            cost_per_km = price / mileage

        yearly_cost_year1 = annual_km * cost_per_km
        yearly_cost_year2 = yearly_cost_year1 + (0.06 * yearly_cost_year1)
        yearly_cost_year3 = yearly_cost_year2 + (0.06 * yearly_cost_year2)
        total_3_year = yearly_cost_year3 + yearly_cost_year2 + yearly_cost_year1

        fuel_costs[fuel] = {
            "year1": round(yearly_cost_year1, -2),
            "year2": round(yearly_cost_year2, -2),
            "year3": round(yearly_cost_year3, -2),
            "total_3yr": round(total_3_year, -2),
            "today_cost": price,
        }

    return fuel_costs


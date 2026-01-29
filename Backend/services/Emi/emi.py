from typing import Dict, List


def calculate_monthly_emi(
    loan_amount: float,
    annual_interest_rate: float,
    tenure_years: int
) -> float:
    
    total_months = tenure_years * 12
    monthly_rate = annual_interest_rate / (12 * 100)

    if monthly_rate == 0:
        return round(loan_amount / total_months, 2)

    emi = (
        loan_amount
        * monthly_rate
        * (1 + monthly_rate) ** total_months
        / ((1 + monthly_rate) ** total_months - 1)
    )

    return round(emi, 2)


def generate_monthly_emi_breakdown(
    loan_amount: float,
    annual_interest_rate: float,
    tenure_years: int
) -> List[Dict]:

    emi = calculate_monthly_emi(
        loan_amount,
        annual_interest_rate,
        tenure_years
    )

    total_months = tenure_years * 12
    monthly_rate = annual_interest_rate / (12 * 100)

    balance = loan_amount
    breakdown = []

    for month in range(1, total_months + 1):
        interest = round(balance * monthly_rate, 2)
        principal = round(emi - interest, 2)

        
        if month == total_months:
            principal = round(balance, 2)
            emi = round(principal + interest, 2)

        balance = round(balance - principal, 2)

        breakdown.append({
            "month": month,
            "emi": emi,
            "interest": interest,
            "principal": principal,
            "remaining_balance": max(balance, 0)
        })

    return breakdown


def generate_yearly_summary(monthly_breakdown: List[Dict]) -> List[Dict]:

    yearly = []
    year_interest = year_principal = year_emi = 0.0

    for idx, data in enumerate(monthly_breakdown, start=1):
        year_interest += data["interest"]
        year_principal += data["principal"]
        year_emi += data["emi"]

        if idx % 12 == 0 or idx == len(monthly_breakdown):
            year = (idx - 1) // 12 + 1
            yearly.append({
                "year": year,
                "total_emi_paid": round(year_emi, 2),
                "interest_paid": round(year_interest, 2),
                "principal_paid": round(year_principal, 2),
                "remaining_balance": data["remaining_balance"]
            })

            year_interest = year_principal = year_emi = 0.0

    return yearly


def generate_emi_report(
    loan_amount: float,
    annual_interest_rate: float,
    tenure_years: int,
    include_yearly: bool = True,
) -> Dict:

    monthly_breakdown = generate_monthly_emi_breakdown(
        loan_amount,
        annual_interest_rate,
        tenure_years
    )

    report = {
        "loan_amount": loan_amount,
        "interest_rate": annual_interest_rate,
        "tenure_years": tenure_years,
        "monthly_emi": monthly_breakdown[0]["emi"],
        "monthly_breakdown": monthly_breakdown
    }

    if include_yearly:
        report["yearly_summary"] = generate_yearly_summary(
            monthly_breakdown
        )

    return report

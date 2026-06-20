from fastapi import APIRouter

from app.impact.trend_service import (
    get_hourly_trend,
    get_monthly_trend,
    get_weekday_trend
)

router = APIRouter(
    prefix="/trend",
    tags=["Trends"]
)


@router.get("/hourly")
async def hourly():

    return get_hourly_trend()


@router.get("/monthly")
async def monthly():

    return get_monthly_trend()


@router.get("/weekday")
async def weekday():

    return get_weekday_trend()
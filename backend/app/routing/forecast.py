from fastapi import APIRouter

from app.impact.forecast_service import (
    get_forecast
)

router = APIRouter(
    prefix="/forecast",
    tags=["Forecast"]
)


@router.get("/")
async def forecast():

    return get_forecast()
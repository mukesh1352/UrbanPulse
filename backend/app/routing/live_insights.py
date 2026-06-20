from fastapi import APIRouter

from app.simulation.live_analytics import (
    get_ai_insights,
    get_live_stats,
    get_hotspots
)

router = APIRouter(
    prefix="/live-insights",
    tags=["Live Insights"]
)


@router.get("/stats")
async def stats():

    return get_live_stats()


@router.get("/hotspots")
async def hotspots():

    return get_hotspots()


@router.get("/")
async def insights():

    return get_ai_insights()
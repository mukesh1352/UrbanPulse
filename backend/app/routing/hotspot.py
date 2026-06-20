from fastapi import APIRouter

from app.impact.hotspot_service import (
    get_top_hotspots
)

router = APIRouter(
    prefix="/hotspots",
    tags=["Hotspots"]
)


@router.get("/")
async def hotspots():

    return get_top_hotspots()
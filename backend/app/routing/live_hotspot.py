from fastapi import APIRouter
from app.live.hotspot_engine import get_hotspots

router = APIRouter()


@router.get("/live-hotspots")
def hotspots():

    return get_hotspots()
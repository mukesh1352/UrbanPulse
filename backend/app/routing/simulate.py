from fastapi import APIRouter

from app.simulation.tomtom_event import (
    fetch_real_events
)

router = APIRouter(
    prefix="/simulate",
    tags=["Simulation"]
)


@router.get("/")
async def simulate():

    event = fetch_real_events()

    return event
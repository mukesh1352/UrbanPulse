from fastapi import APIRouter

from app.resources.resource_optimizer import (
    recommend_units
)

router = APIRouter(
    prefix="/resources",
    tags=["Resource Optimizer"]
)


@router.get("/")
def optimize_resources(

    latitude: float,

    longitude: float,

    police_needed: int

):

    return recommend_units(

        latitude,

        longitude,

        police_needed

    )
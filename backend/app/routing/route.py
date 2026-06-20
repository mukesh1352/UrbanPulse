from fastapi import APIRouter
from pydantic import BaseModel

from app.graph.route_service import find_routes
from app.simulation.live_analytics import get_recent_events

router = APIRouter(
    prefix="/route",
    tags=["Routing"]
)


class RouteRequest(BaseModel):

    start: tuple[float, float]

    goal: tuple[float, float]


@router.post("/")
def get_route(req: RouteRequest):

    events = get_recent_events()

    routes = find_routes(
        req.start,
        req.goal,
        events
    )

    return routes
"""
This returns the summary for the dashboard


GET /dashboard/summary
{
    "total_incidents":8173,
    "high_priority":5032,
    "planned_events":467,
    "unplanned_events":7706,
    "clusters":40
}

GET /dashboard/event-causes

[
 {
   "cause":"vehicle_breakdown",
   "count":4896
 },
 {
   "cause":"pot_holes",
   "count":537
 }
]

GET /dashboard/hourly
[
 {
  "hour":0,
  "count":130
 }
]

GET /clusters
[
{
 "cluster":1,
 "incidents":2619,
 "avg_severity":3.8,
 "high_priority_ratio":0.72
}
]
GET /cluster-centers
[
{
 "cluster":1,
 "latitude":12.93,
 "longitude":77.61
}
]


"""




from fastapi import APIRouter

from app.impact.dashboard_service import (
    get_summary,
    get_event_causes,
    get_hourly,
    get_priority,
    get_clusters,
    get_cluster_centers
)



from app.impact.heat_map import (
    get_heatmap_points,
    get_risk_map
)

from app.impact.marker_service import(
    get_planned_events,
    get_unplanned_events
)

router = APIRouter()

@router.get("/summary")
async def summary():
    return get_summary()

@router.get("/event-causes")
async def event_causes():
    return get_event_causes()

@router.get("/hourly")
async def hourly():
    return get_hourly()

@router.get("/priority")
async def priority():
    return get_priority()

@router.get("/clusters")
async def clusters():
    return get_clusters()

@router.get("/cluster_centers")
async def cluster_centers():
    return get_cluster_centers()


@router.get("/heatmap")
async def heatmap():
    return get_heatmap_points()

@router.get("/risk-map")
async def risk_map():
    return get_risk_map()

@router.get("/planned-events")
async def planned_events():
    return get_planned_events()

@router.get("/unplanned-events")
async def unplanned_events():
    return get_unplanned_events()

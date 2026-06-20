from app.graph.route_service import find_routes
events = [
{
    "latitude":12.95,
    "longitude":77.61,
    "event_cause":"accident"
}
]

routes = find_routes(
    (12.9716,77.5946),
    (12.9352,77.6245),
    events
)

print(routes["primary_distance"])
print(routes["diversion_distance"])
print(routes["emergency_distance"])
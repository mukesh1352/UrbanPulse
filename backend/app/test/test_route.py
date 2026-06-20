from app.graph.graph_store import graph
from app.graph.route_service import find_routes

nodes = list(graph.keys())

start = nodes[0]
goal = nodes[100]

events = [
    {
        "event_cause": "accident",
        "latitude": nodes[30][0],
        "longitude": nodes[30][1]
    }
]

routes = find_routes(
    start,
    goal,
    events
)

print()

print("PRIMARY")

print(
    routes["primary_route"]
)

print()

print("DIVERSION")

print(
    routes["diversion_route"]
)

print()

print("EMERGENCY")

print(
    routes["emergency_route"]
)
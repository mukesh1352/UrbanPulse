from app.graph.route_service import find_routes

routes = find_routes(
    start=(12.9716, 77.5946),      # MG Road
    goal=(12.9352, 77.6245),       # Koramangala
    events=[]
)

print()

print("Primary distance:")
print(routes["primary_distance"], "km")

print()

print("Diversion distance:")
print(routes["diversion_distance"], "km")

print()

print("Primary ETA:")
print(routes["primary_eta"], "mins")

print()

print("Diversion ETA:")
print(routes["diversion_eta"], "mins")
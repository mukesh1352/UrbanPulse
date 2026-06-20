from app.simulation.tomtomservice import (
    get_live_incidents
)

incidents = get_live_incidents()

print(
    len(incidents)
)

print(
    incidents[0]
)
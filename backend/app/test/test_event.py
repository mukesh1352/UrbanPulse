from app.simulation.tomtom_event import (
    fetch_real_events
)

events = fetch_real_events()

print(
    len(events)
)

print(
    events[0]
)
from app.simulation.tomtom_event import (
    fetch_real_events
)

from app.simulation.live_analytics import (
    add_events,
    get_live_stats,
    get_hotspots,
    get_ai_insights
)

events = fetch_real_events()

add_events(
    events
)

print()

print(
    get_live_stats()
)

print()

print(
    get_hotspots()[:5]
)

print()

print(
    get_ai_insights()
)
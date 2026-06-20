import asyncio
import random

from app.simulation.tomtom_event import (
    fetch_real_events
)

from app.simulation.live_analytics import (
    add_events
)

from app.websocket.manager import (
    manager
)


# prevents rebroadcasting same incident forever
seen_events: set[str] = set()

# keeps memory bounded
MAX_SEEN_EVENTS = 5000


async def run_simulator():

    while True:

        try:

            events = fetch_real_events()

            if len(events) == 0:

                await asyncio.sleep(1)

                continue

            # randomly pick up to 10 incidents
            events = random.sample(
                events,
                min(
                    10,
                    len(events)
                )
            )

            add_events(events)

            for event in events:

                event_id = event["id"]

                # skip duplicate incidents
                if event_id in seen_events:
                    continue

                seen_events.add(event_id)

                # avoid infinite memory growth
                if len(seen_events) > MAX_SEEN_EVENTS:
                    seen_events.clear()

                await manager.broadcast(
                    event
                )

                print(
                    "Broadcasted:",
                    event["event_cause"],
                    event["cluster"],
                    event_id
                )

                # stream one event every 0.5 sec
                await asyncio.sleep(
                    0.5
                )

        except Exception as e:

            print(
                "Simulator Error:",
                e
            )

            await asyncio.sleep(
                10
            )

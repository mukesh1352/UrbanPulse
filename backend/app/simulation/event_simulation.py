import random

EVENT_CAUSES = [
    "vehicle_breakdown",
    "accident",
    "construction",
    "water_logging",
    "tree_fall"
]

EVENT_TYPES = [
    "planned",
    "unplanned"
]


def simulate_event():

    return {

        "event_type":
            random.choice(EVENT_TYPES),

        "event_cause":
            random.choice(EVENT_CAUSES),

        "latitude":
            random.uniform(
                12.85,
                13.10
            ),

        "longitude":
            random.uniform(
                77.50,
                77.75
            )

    }
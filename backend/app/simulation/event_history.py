from collections import deque
from datetime import datetime

event_history = deque(maxlen=10000)


def add_completed_event(
    event,
    police,
    barricades,
    ambulances,
    route_distance,
    eta
):

    event_history.append({

        "timestamp":
            datetime.now().isoformat(),

        "event_type":
            event["event_cause"],

        "cluster":
            event["cluster"],

        "severity":
            event["severity_score"],

        "priority":
            event["priority"],

        "police":
            police,

        "barricades":
            barricades,

        "ambulances":
            ambulances,

        "route_distance":
            route_distance,

        "eta":
            eta

    })


def get_event_history():

    return list(event_history)
from datetime import datetime


event_weights = {

    "vehicle_breakdown":1,
    "construction":3,
    "water_logging":3,
    "accident":4,
    "tree_fall":4

}


def extract_features(
    event,
    cluster
):

    now = datetime.now()

    severity = (
        event_weights.get(
            event["event_cause"],
            1
        )
        + 2
    )

    return {

        "hour":
            now.hour,

        "day_of_week":
            now.weekday(),

        "month":
            now.month,

        "weekend":
            int(
                now.weekday() >= 5
            ),

        "duration_minutes":
            60,

        "event_type":
            event["event_type"],

        "event_cause":
            event["event_cause"],

        "cluster":
            cluster,

        "severity_score":
            severity,

        "requires_road_closure":
            0,

        "is_closed":
            0,

        "is_resolved":
            0
    }
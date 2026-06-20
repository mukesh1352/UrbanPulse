import hashlib
from datetime import datetime

from app.simulation.tomtomservice import (
    get_live_incidents
)

from app.simulation.cluster_assign import (
    assign_cluster
)


AREA_MAPPING = {
    0: "Majestic",
    1: "Koramangala",
    2: "Whitefield",
    3: "Electronic City",
    4: "Hebbal",
    5: "Indiranagar",
    6: "Marathahalli",
    7: "Yelahanka",
    8: "BTM Layout"
}


ICON_CATEGORY_MAPPING = {
    1: "accident",
    2: "fog",
    3: "danger",
    4: "rain",
    5: "ice",
    6: "lane_closed",
    7: "road_closed",
    8: "traffic_jam",
    9: "roadworks",
    10: "wind",
}


def get_priority(delay):

    if delay >= 4:
        return "High"

    if delay >= 2:
        return "Medium"

    return "Low"


def get_severity(delay):

    return min(
        max(delay, 1),
        5
    )


def fetch_real_events():

    incidents = get_live_incidents()

    events = []

    for incident in incidents:

        try:

            props = incident["properties"]

            geometry = incident["geometry"]

            coordinates = geometry["coordinates"]

            lon = coordinates[0][0]
            lat = coordinates[0][1]

            delay = props.get(
                "magnitudeOfDelay",
                1
            )

            icon = props.get(
                "iconCategory",
                8
            )

            cluster = assign_cluster(
                lat,
                lon
            )

            area = AREA_MAPPING.get(
                cluster,
                f"Cluster {cluster}"
            )

            event_cause = ICON_CATEGORY_MAPPING.get(
                icon,
                "traffic"
            )

            event_id = hashlib.md5(
                f"{event_cause}-{round(lat,5)}-{round(lon,5)}".encode()
            ).hexdigest()

            event = {

                "id":
                    event_id,

                "area":
                    area,

                "event_type":
                    "unplanned",

                "event_cause":
                    event_cause,

                "cluster":
                    cluster,

                "severity_score":
                    get_severity(
                        delay
                    ),

                "priority":
                    get_priority(
                        delay
                    ),

                "latitude":
                    lat,

                "longitude":
                    lon,

                "timestamp":
                    datetime.now().isoformat()

            }

            events.append(
                event
            )

        except Exception as e:

            print(
                "Event Parse Error:",
                e
            )

            continue

    return events
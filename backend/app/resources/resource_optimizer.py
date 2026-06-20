from geopy.distance import geodesic

from app.resources.police_stations import (
    POLICE_STATIONS
)


def recommend_units(
    latitude,
    longitude,
    required_police
):

    stations = []

    for station in POLICE_STATIONS:

        distance = geodesic(

            (
                latitude,
                longitude
            ),

            (
                station["lat"],
                station["lon"]
            )

        ).km

        stations.append({

            **station,

            "distance":
                round(distance, 2)

        })

    stations.sort(
        key=lambda x: x["distance"]
    )

    remaining = required_police

    deployment = []

    for station in stations:

        if remaining <= 0:
            break

        send = min(
            remaining,
            station["available"]
        )

        deployment.append({

            "station":
                station["name"],

            "send":
                send,

            "distance":
                station["distance"]

        })

        remaining -= send

    return deployment
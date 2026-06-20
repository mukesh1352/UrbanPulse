import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv(
    "TOMTOM_API_KEY"
)

URL = (
    "https://api.tomtom.com/"
    "traffic/services/5/"
    "incidentDetails"
)

BBOX = "77.45,12.85,77.75,13.10"


FIELDS = (
    "{incidents{"
    "type,"
    "geometry{type,coordinates},"
    "properties{"
    "id,"
    "iconCategory,"
    "magnitudeOfDelay,"
    "events{description},"
    "startTime,"
    "endTime"
    "}"
    "}}"
)


def get_live_incidents():

    params = {
        "bbox": BBOX,
        "fields": FIELDS,
        "key": API_KEY
    }

    try:

        response = requests.get(
            URL,
            params=params,
            timeout=20
        )

        response.raise_for_status()

        data = response.json()

        return data.get(
            "incidents",
            []
        )

    except Exception as e:

        print(
            "TomTom Error:",
            e
        )

        return []
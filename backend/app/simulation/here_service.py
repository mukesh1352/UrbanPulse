import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv(
    "HERE_API_KEY"
)


def get_here_incidents():

    url = (
        "https://data.traffic.hereapi.com"
        "/v7/incidents"
    )

    params = {

        "in":
        "bbox:12.85,77.45,13.10,77.75",

        "apiKey":
        API_KEY

    }

    response = requests.get(
        url,
        params=params
    )

    return response.json()
from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[2]

df = pd.read_csv(
    BASE_DIR
    / "data"
    / "traffic_events_clustered.csv"
)


def get_planned_events():

    planned = df[
        df["event_type"] == "planned"
    ]

    return planned[
        [
            "latitude",
            "longitude",
            "event_cause"
        ]
    ].to_dict(
        orient="records"
    )


def get_unplanned_events():

    unplanned = df[
        df["event_type"] == "unplanned"
    ]

    return unplanned[
        [
            "latitude",
            "longitude",
            "event_cause"
        ]
    ].to_dict(
        orient="records"
    )
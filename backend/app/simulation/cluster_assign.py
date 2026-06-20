from pathlib import Path
import pandas as pd
from math import sqrt

BASE_DIR = Path(__file__).resolve().parents[2]

cluster_centers = pd.read_csv(
    BASE_DIR / "data" / "cluster_centers.csv"
)


def assign_cluster(
    latitude: float,
    longitude: float
):

    distances = (
        (
            cluster_centers["latitude"] - latitude
        )**2
        +
        (
            cluster_centers["longitude"] - longitude
        )**2
    )**0.5

    nearest = distances.idxmin()

    return int(
        cluster_centers.loc[
            nearest,
            "cluster"
        ]
    )
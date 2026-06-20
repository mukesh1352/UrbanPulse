from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[2]

df = pd.read_csv(
    BASE_DIR/"data"/"traffic_events_clustered.csv"
)


def get_top_hotspots():

    hotspot = (
        df.groupby("cluster")
        .agg(
            incidents=("id", "count"),
            avg_severity=("severity_score", "mean"),
            latitude=("latitude", "mean"),
            longitude=("longitude", "mean"),
        )
        .reset_index()
    )

    hotspot["risk_score"] = (
        hotspot["incidents"]
        *
        hotspot["avg_severity"]
    )

    hotspot = hotspot.sort_values(
        "risk_score",
        ascending=False
    )

    return hotspot.head(10).to_dict(
        orient="records"
    )
from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"

df = pd.read_csv(
    DATA_DIR / "traffic_events_clustered.csv"
)

def get_heatmap_points():

    temp = df.copy()

    priority_weight = {
        "Low":1,
        "High":2
    }

    temp["priority_weight"] = (
        temp["priority"]
        .map(priority_weight)
    )

    temp["weight"] = (
        temp["severity_score"]
        *
        temp["priority_weight"]
    )

    temp["weight"] = (
        temp["weight"]
        /
        temp["weight"].max()
    )

    return [
        {
            "lat":row.latitude,
            "lon":row.longitude,
            "weight":float(row.weight)
        }
        for _,row in temp.iterrows()
    ]

def get_top_hotspots(top_n=10):

    hotspot_df = (
        df.groupby("cluster")
        .agg(
            incidents=("id", "count"),
            avg_severity=("severity_score", "mean"),
            latitude=("latitude", "mean"),
            longitude=("longitude", "mean"),
        )
        .reset_index()
    )

    hotspot_df["risk_score"] = (
        hotspot_df["incidents"]
        * hotspot_df["avg_severity"]
    )

    hotspot_df = hotspot_df.sort_values(
        "risk_score",
        ascending=False,
    )

    return hotspot_df.head(top_n).to_dict(
        orient="records"
    )


def get_risk_map():

    risk_df = (
        df.groupby("cluster")
        .agg(
            incidents=("id","count"),

            avg_severity=(
                "severity_score",
                "mean"
            ),

            high_priority=(
                "priority",
                lambda x: (x=="High").sum()
            ),

            latitude=(
                "latitude",
                "mean"
            ),

            longitude=(
                "longitude",
                "mean"
            )
        )
        .reset_index()
    )

    risk_df["high_priority_ratio"] = (
        risk_df["high_priority"]
        /
        risk_df["incidents"]
    )

    risk_df["risk_score"] = (
        risk_df["incidents"]
        *
        risk_df["avg_severity"]
        *
        risk_df["high_priority_ratio"]
    )

    return risk_df.to_dict(
        orient="records"
    )


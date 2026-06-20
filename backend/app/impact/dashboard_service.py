from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"

df = pd.read_csv(DATA_DIR / "traffic_events_clustered.csv")
cluster_centers = pd.read_csv(DATA_DIR / "cluster_centers.csv")


def get_summary():
    return {
        "total_incidents": len(df),
        "high_priority": int((df["priority"] == "High").sum()),
        "planned_events": int((df["event_type"] == "planned").sum()),
        "unplanned_events": int((df["event_type"] == "unplanned").sum()),
        "clusters": int(df[df["cluster"] != -1]["cluster"].nunique())
    }


def get_event_causes():
    causes = (
        df["event_cause"]
        .value_counts()
        .reset_index()
    )

    causes.columns = ["cause", "count"]

    return causes.to_dict(orient="records")


def get_hourly():
    hourly = (
        df.groupby("hour")
        .size()
        .reset_index(name="count")
    )

    return hourly.to_dict(orient="records")


def get_priority():
    priority = (
        df["priority"]
        .value_counts()
        .reset_index()
    )

    priority.columns = ["priority", "count"]

    return priority.to_dict(orient="records")


def get_clusters():

    zone_stats = (
        df.groupby("cluster")
        .agg(
            incidents=("id", "count"),
            high_priority=(
                "priority",
                lambda x: (x == "High").sum()
            ),
            avg_severity=(
                "severity_score",
                "mean"
            )
        )
        .reset_index()
    )

    zone_stats["high_priority_ratio"] = (
        zone_stats["high_priority"]
        / zone_stats["incidents"]
    )

    return zone_stats.to_dict(orient="records")


def get_cluster_centers():
    return cluster_centers.to_dict(orient="records")
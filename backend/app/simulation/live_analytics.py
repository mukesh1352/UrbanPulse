from collections import deque
import pandas as pd

# Keep last 100 events
recent_events = deque(maxlen=100)


def add_events(events):

    for event in events:
        recent_events.append(
            event
        )
def get_recent_events():
    return list(recent_events)

def get_live_stats():

    if len(recent_events) == 0:

        return {
            "total_events": 0,
            "high_priority": 0,
            "hotspots": 0,
            "anomalies": 0
        }

    df = pd.DataFrame(
        recent_events
    )

    return {

        "total_events":
            len(df),

        "high_priority":
            int(
                (
                    df["priority"] == "High"
                ).sum()
            ),

        "hotspots":
            int(
                df["cluster"]
                .nunique()
            ),

        "anomalies":
            int(
                (
                    df["severity_score"] >= 4
                ).sum()
            )

    }


def get_hotspots():

    if len(recent_events) == 0:
        return []

    df = pd.DataFrame(
        recent_events
    )

    stats = (
        df.groupby("cluster")
        .agg(
            incidents=(
                "cluster",
                "count"
            ),

            avg_severity=(
                "severity_score",
                "mean"
            ),

            high_priority=(
                "priority",
                lambda x:
                (x == "High").sum()
            )
        )
        .reset_index()
    )

    stats["high_priority_ratio"] = (

        stats["high_priority"]

        /

        stats["incidents"]

    )

    stats["risk_score"] = (

        stats["incidents"]

        *

        stats["avg_severity"]

        *

        stats["high_priority_ratio"]

    )

    stats = stats.sort_values(
        "risk_score",
        ascending=False
    )

    return stats.to_dict(
        orient="records"
    )


def get_ai_insights():

    hotspots = get_hotspots()

    if len(hotspots) == 0:

        return {

            "hot_cluster": None,

            "risk_score": 0,

            "message":
                "No live incidents"

        }

    top = hotspots[0]

    cluster = int(
        top["cluster"]
    )

    risk = round(
        float(
            top["risk_score"]
        ),
        2
    )

    if risk >= 25:

        recommendation = (
            f"🔥 Cluster {cluster} "
            "is highly dangerous. "
            "Traffic diversion recommended."
        )

    elif risk >= 10:

        recommendation = (
            f"⚠ Cluster {cluster} "
            "has increasing congestion."
        )

    else:

        recommendation = (
            f"Cluster {cluster} "
            "is stable."
        )

    return {

        "hot_cluster":
            cluster,

        "risk_score":
            risk,

        "message":
            recommendation

    }
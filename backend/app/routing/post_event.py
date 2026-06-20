from fastapi import APIRouter
import pandas as pd

from app.simulation.event_history import (
    get_event_history
)

router = APIRouter(
    prefix="/post-event",
    tags=["Post Event Analytics"]
)


@router.get("/")
def post_event_summary():

    events = get_event_history()

    if len(events) == 0:

        return {
            "message":
                "No historical events"
        }

    df = pd.DataFrame(events)

    stats = (

        df.groupby("event_type")
        .agg(

            total_events=("event_type", "count"),

            avg_severity=("severity", "mean"),

            avg_police=("police", "mean"),

            avg_barricades=("barricades", "mean"),

            avg_eta=("eta", "mean")

        )

        .reset_index()

    )

    return stats.to_dict(
        orient="records"
    )

@router.get("/clusters")
def cluster_summary():

    events = get_event_history()

    if len(events) == 0:
        return []

    df = pd.DataFrame(events)

    stats = (

        df.groupby("cluster")
        .agg(

            incidents=("cluster","count"),

            avg_severity=("severity","mean"),

            avg_eta=("eta","mean")

        )

        .reset_index()

        .sort_values(
            "avg_severity",
            ascending=False
        )

    )

    return stats.to_dict(
        orient="records"
    )

@router.get("/recommendation")
def recommendations():

    events = get_event_history()

    if len(events) == 0:
        return []

    df = pd.DataFrame(events)

    top = (

        df.groupby("event_type")

        .agg(

            police=("police","mean"),

            barricades=("barricades","mean"),

            eta=("eta","mean")

        )

        .reset_index()

    )

    return top.to_dict(
        orient="records"
    )

@router.get("/insights")
def insights():

    events = get_event_history()

    if len(events) == 0:
        return {
            "message": "No events"
        }

    df = pd.DataFrame(events)

    most_common = (
        df["event_type"]
        .value_counts()
        .idxmax()
    )

    highest_cluster = (
        df.groupby("cluster")
        .size()
        .idxmax()
    )

    avg_eta = round(
        df["eta"].mean(),
        2
    )

    return {

        "most_common_event":
            most_common,

        "highest_risk_cluster":
            int(highest_cluster),

        "average_eta":
            avg_eta,

        "total_events":
            len(df)

    }
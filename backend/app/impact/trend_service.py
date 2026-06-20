from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[2]

df = pd.read_csv(
    BASE_DIR/"data"/"traffic_events_clustered.csv"
)


def get_hourly_trend():

    hourly = (
        df.groupby("hour")
        .size()
        .reset_index(name="count")
    )

    return hourly.to_dict(
        orient="records"
    )


def get_monthly_trend():

    monthly = (
        df.groupby("month")
        .size()
        .reset_index(name="count")
    )

    return monthly.to_dict(
        orient="records"
    )


def get_weekday_trend():

    weekly = (
        df.groupby("day_of_week")
        .size()
        .reset_index(name="count")
    )

    return weekly.to_dict(
        orient="records"
    )
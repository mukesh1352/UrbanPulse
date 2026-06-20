from pathlib import Path
import pandas as pd
import joblib

BASE_DIR = Path(__file__).resolve().parents[2]

model = joblib.load(
    BASE_DIR / "models" / "anomaly_model.pkl"
)

df = pd.read_csv(
    BASE_DIR / "data" / "traffic_events_clustered.csv"
)


def get_anomalies():

    X = df[
        [
            "hour",
            "cluster",
            "severity_score"
        ]
    ]

    df["anomaly"] = model.predict(X)

    anomalies = df[
        df["anomaly"] == -1
    ]

    return (
        anomalies[
            [
                "hour",
                "cluster",
                "severity_score"
            ]
        ]
        .fillna(0)
        .to_dict(orient="records")
    )


def detect_anomaly(
    hour: int,
    cluster: int,
    severity: int
):

    x = pd.DataFrame([{
        "hour": hour,
        "cluster": cluster,
        "severity_score": severity
    }])

    pred = model.predict(x)[0]

    return pred == -1
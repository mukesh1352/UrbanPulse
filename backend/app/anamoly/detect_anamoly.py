from pathlib import Path
import pandas as pd
import joblib

BASE_DIR = Path(__file__).resolve().parents[2]

model = joblib.load(
    BASE_DIR / "models" / "anomaly_model.pkl"
)


def detect_anomaly(
    hour: int,
    cluster: int,
    severity: int
):

    x = pd.DataFrame([{
        "hour": hour,
        "cluster": cluster,
        "severity_score": severity,
        "duration_minutes": 0
    }])

    pred = model.predict(x)[0]

    return pred == -1
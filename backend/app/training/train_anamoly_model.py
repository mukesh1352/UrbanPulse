from pathlib import Path
import pandas as pd
import joblib

from sklearn.ensemble import IsolationForest

BASE_DIR = Path(__file__).resolve().parents[2]

df = pd.read_csv(
    BASE_DIR/"data"/"traffic_events_clustered.csv"
)

X = df[
    [
        "hour",
        "cluster",
        "severity_score",
        "duration_minutes"
    ]
]

model = IsolationForest(
    contamination=0.03,
    random_state=42
)

model.fit(X)

joblib.dump(
    model,
    BASE_DIR/"models"/"anomaly_model.pkl"
)

print("Saved anomaly model")
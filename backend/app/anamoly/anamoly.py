from sklearn.ensemble import IsolationForest
import pandas as pd
import joblib

df = pd.read_csv(
    "cleaned_event_dataset.csv"
)

X = df[
    [
        "hour",
        "cluster",
        "severity_score"
    ]
]

model = IsolationForest(
    contamination=0.05,
    random_state=42
)

model.fit(X)

joblib.dump(
    model,
    "models/anomaly_model.pkl"
)
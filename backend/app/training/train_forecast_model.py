from pathlib import Path
import pandas as pd
import joblib

from xgboost import XGBRegressor

BASE_DIR = Path(__file__).resolve().parents[2]

df = pd.read_csv(
    BASE_DIR/"data"/"traffic_events_clustered.csv"
)

hourly = (
    df.groupby("hour")
    .size()
    .reset_index(name="count")
)

X = hourly[["hour"]]

y = hourly["count"]

model = XGBRegressor()

model.fit(X, y)

joblib.dump(
    model,
    BASE_DIR/"models"/"forecast_model.pkl"
)

print("Saved forecast model")
from pathlib import Path
import pandas as pd
import joblib

BASE_DIR = Path(__file__).resolve().parents[2]

model = joblib.load(
    BASE_DIR/"models"/"forecast_model.pkl"
)


def get_forecast():

    hours = pd.DataFrame(
        {
            "hour":list(range(24))
        }
    )

    pred = model.predict(
        hours
    )

    hours["forecast"] = pred

    return hours.to_dict(
        orient="records"
    )